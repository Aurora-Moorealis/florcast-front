"use client";

import { useEffect, useRef, useState, FC } from "react";

// Interfaces TypeScript para el componente
interface City {
    name: string;
    longitude: number;
    latitude: number;
    description: string;
    color: any;
}

interface CesiumError {
    message: string;
    stack?: string;
}

// Extender Window para propiedades globales de Cesium
declare global {
    interface Window {
        CESIUM_BASE_URL?: string;
        Cesium?: any;
        cesiumViewer?: any;
    }
}

/**
 * Componente Avanzado del Globo Terrestre 3D
 */
const SimpleGlobe: FC = () => {
    const cesiumContainerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCesium = async (): Promise<(() => void) | undefined> => {
            try {
                setIsLoading(true);
                console.log("🚀 Iniciando carga de CesiumJS...");
                
                const Cesium: any = await import("cesium");
                console.log("✅ CesiumJS cargado exitosamente");
                
                // Hacer Cesium accesible globalmente
                window.Cesium = Cesium;
                window.cesiumViewer = null;
                
                if (!cesiumContainerRef.current) {
                    throw new Error("Contenedor DOM no encontrado");
                }

                window.CESIUM_BASE_URL = "/cesium/";
                
                const viewer: any = new Cesium.Viewer(cesiumContainerRef.current as HTMLElement, {
                    animation: false,
                    baseLayerPicker: true,
                    fullscreenButton: true,
                    geocoder: false,
                    homeButton: true,
                    infoBox: true,
                    sceneModePicker: false,
                    selectionIndicator: true,
                    timeline: false,
                    navigationHelpButton: true,
                    navigationInstructionsInitiallyVisible: false,
                    scene3DOnly: true,
                });

                window.cesiumViewer = viewer;
                console.log("🌍 Viewer de Cesium creado exitosamente");

                // Configuración de terreno
                const setupTerrain = async (): Promise<boolean> => {
                    try {
                        if (typeof Cesium.createWorldTerrainAsync === 'function') {
                            const worldTerrain = await Cesium.createWorldTerrainAsync({
                                requestWaterMask: true,
                                requestVertexNormals: true
                            });
                            viewer.terrainProvider = worldTerrain;
                            return true;
                        }
                        
                        if (typeof Cesium.createWorldTerrain === 'function') {
                            const worldTerrain = Cesium.createWorldTerrain({
                                requestWaterMask: true,
                                requestVertexNormals: true
                            });
                            viewer.terrainProvider = worldTerrain;
                            return true;
                        }
                        
                        return false;
                    } catch (terrainError: any) {
                        console.warn('Error cargando Cesium Ion Terrain:', terrainError.message);
                        return false;
                    }
                };
                
                const terrainLoaded: boolean = await setupTerrain();
                
                if (!terrainLoaded) {
                    console.log('Usando terreno ellipsoidal básico');
                    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
                }

                // Configuración de controles
                const camera: any = viewer.camera;
                const scene: any = viewer.scene;
                const controller: any = scene.screenSpaceCameraController;

                controller.minimumZoomDistance = 1000;
                controller.maximumZoomDistance = 50000000;
                controller.enableRotate = true;
                controller.enableTranslate = true;
                controller.enableZoom = true;
                controller.enableTilt = true;
                controller.enableLook = true;
                controller.inertiaSpin = 0.9;
                controller.inertiaTranslate = 0.9;
                controller.inertiaZoom = 0.8;

                // Vista inicial
                camera.setView({
                    destination: Cesium.Cartesian3.fromDegrees(0.0, 20.0, 12000000),
                    orientation: {
                        heading: Cesium.Math.toRadians(0.0),
                        pitch: Cesium.Math.toRadians(-45.0),
                        roll: 0.0
                    }
                });

                // Configuración visual
                scene.skyAtmosphere.show = true;
                scene.globe.showGroundAtmosphere = true;
                scene.globe.enableLighting = false;
                scene.globe.dynamicAtmosphereLighting = false;
                scene.globe.atmosphereLightIntensity = 10.0;
                scene.fog.enabled = false;

                // Optimizaciones
                scene.globe.tileCacheSize = 1000;
                scene.requestRenderMode = true;
                scene.maximumRenderTimeChange = Infinity;

                // Ciudades
                const cities: City[] = [
                    {
                        name: "Nueva York",
                        longitude: -74.006,
                        latitude: 40.7128,
                        description: "Nueva York, Estados Unidos<br/>Centro financiero mundial",
                        color: Cesium.Color.CYAN
                    },
                    {
                        name: "Londres",
                        longitude: -0.1278,
                        latitude: 51.5074,
                        description: "Londres, Reino Unido<br/>Capital histórica",
                        color: Cesium.Color.RED
                    },
                    {
                        name: "Tokio",
                        longitude: 139.6503,
                        latitude: 35.6762,
                        description: "Tokio, Japón<br/>Metrópolis tecnológica",
                        color: Cesium.Color.ORANGE
                    },
                    {
                        name: "Sídney",
                        longitude: 151.2093,
                        latitude: -33.8688,
                        description: "Sídney, Australia<br/>Puerto del Pacífico Sur",
                        color: Cesium.Color.GREEN
                    },
                    {
                        name: "París",
                        longitude: 2.3522,
                        latitude: 48.8566,
                        description: "París, Francia<br/>Ciudad de la luz",
                        color: Cesium.Color.PINK
                    },
                    {
                        name: "Dubai",
                        longitude: 55.2708,
                        latitude: 25.2048,
                        description: "Dubai, EAU<br/>Oasis moderno",
                        color: Cesium.Color.GOLD
                    }
                ];

                // Agregar marcadores
                cities.forEach((city: City) => {
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(city.longitude, city.latitude, 0),
                        name: city.name,
                        description: city.description,
                        point: {
                            pixelSize: 20,
                            color: city.color,
                            outlineColor: Cesium.Color.WHITE,
                            outlineWidth: 3,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5)
                        },
                        label: {
                            text: city.name,
                            font: '14pt sans-serif',
                            fillColor: Cesium.Color.WHITE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            pixelOffset: new Cesium.Cartesian2(0, -40),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.0)
                        }
                    });
                });

                // Eventos de interacción
                viewer.selectedEntityChanged.addEventListener(() => {
                    const selectedEntity: any = viewer.selectedEntity;
                    if (selectedEntity && selectedEntity.name) {
                        console.log(`Ciudad seleccionada: ${selectedEntity.name}`);
                        viewer.flyTo(selectedEntity, {
                            duration: 2.0,
                            offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 5000000)
                        });
                    }
                });

                console.log(`✅ CesiumJS inicializado con ${cities.length} ciudades`);
                setIsLoading(false);

                // Cleanup
                return (): void => {
                    if (viewer && !viewer.isDestroyed()) {
                        console.log("Limpiando recursos de CesiumJS...");
                        viewer.destroy();
                    }
                };
                
            } catch (err: unknown) {
                console.error("Error crítico cargando CesiumJS:", err);
                const cesiumError = err as CesiumError;
                const errorMessage: string = cesiumError.message || String(err);
                setError(errorMessage);
                setIsLoading(false);
            }
        };

        loadCesium();
        
    }, []);

    if (error) {
        return (
            <div className="w-full h-screen bg-red-900 flex items-center justify-center">
                <div className="text-white text-center max-w-2xl mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-6">❌ Error al Cargar CesiumJS</h1>
                    <div className="bg-red-800 p-4 rounded-lg mb-6">
                        <p className="text-red-200 font-mono text-sm">{error}</p>
                    </div>
                    <div className="text-left bg-red-800/50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4 text-red-200">🔧 Posibles Soluciones:</h2>
                        <ul className="space-y-2 text-sm text-red-300">
                            <li>• Verifica que los assets de Cesium estén en /public/cesium/</li>
                            <li>• Abre DevTools (F12) y revisa la consola</li>
                            <li>• Asegúrate de que el servidor esté corriendo</li>
                            <li>• Verifica tu conexión a internet</li>
                            <li>• Comprueba que tu navegador soporte WebGL 2.0</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-4 left-4 z-50 bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-90 text-white px-6 py-4 rounded-xl backdrop-blur-md border border-blue-500/30 shadow-2xl">
                <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                        <h1 className="text-2xl font-bold text-blue-300">🌍 Cesium Earth Pro</h1>
                        <p className="text-sm opacity-90 text-gray-200">
                            {isLoading ? "Cargando globo 3D..." : "Globo 3D interactivo - 6 ciudades"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Panel de controles */}
            {!isLoading && (
                <div className="absolute bottom-4 left-4 z-50 bg-gradient-to-t from-gray-900 to-gray-800 bg-opacity-95 text-white px-4 py-3 rounded-xl backdrop-blur-md border border-gray-600/30 shadow-xl max-w-sm">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-400 text-lg">🎮</span>
                            <h3 className="text-blue-300 font-semibold">Controles:</h3>
                        </div>
                        <div className="space-y-1 text-xs text-gray-300">
                            <p>• <span className="text-white">Click + arrastrar:</span> rotar</p>
                            <p>• <span className="text-white">Rueda del mouse:</span> zoom</p>
                            <p>• <span className="text-white">Click derecho:</span> inclinar</p>
                            <p>• <span className="text-white">Click marcador:</span> volar</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Pantalla de carga */}
            {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-black/80 flex items-center justify-center z-40 backdrop-blur-sm">
                    <div className="text-white text-center bg-black/50 rounded-2xl p-8 border border-blue-500/30">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-blue-300">Iniciando Cesium Earth</h2>
                        <p className="text-sm text-gray-300 mb-4">Configurando motor 3D...</p>
                        <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{width: "75%"}}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contenedor de Cesium */}
            <div 
                ref={cesiumContainerRef}
                className="w-full h-full"
                style={{ 
                    width: "100%", 
                    height: "100vh",
                    margin: 0,
                    padding: 0,
                    overflow: "hidden",
                    background: "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
                }}
            />
        </div>
    );
};

export default SimpleGlobe;