'use client';

import { useEffect, useRef, useState, FC } from "react";

import * as Cesium from "cesium";

// Tipos para el componente Globe
interface GlobeError {
    message: string;
}

// Extender Window para incluir propiedades de Cesium
declare global {
    interface Window {
        CESIUM_BASE_URL?: string;
    }
}

// Configurar Cesium - Simplificado para evitar errores
if (typeof window !== 'undefined') {
    window.CESIUM_BASE_URL = "/cesium/";
    // Token público de Cesium Ion
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5N2UyMjcwOS00MDY1LTQxYjEtYjZjMy00YTU0ZTg5YmRmOWIiLCJpZCI6OTc3MSwic2NvcGVzIjpbImFzbCIsImFzciIsImdjIl0sImlhdCI6MTU1NDI4NjczMX0.p_q5UsvTFVg3KNsT6MN_xuk15CO2vY2enMYPfV1kFnU";
}

const Globe: FC = () => {
    const viewerRef = useRef<Cesium.Viewer | null>(null);
    const cesiumContainerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!cesiumContainerRef.current) return;

        try {
            console.log("Creating Cesium viewer...");
            setIsLoading(true);
            setError(null);

            // Crear el visor de Cesium con configuración mínima
            const viewer: Cesium.Viewer = new Cesium.Viewer(cesiumContainerRef.current as HTMLElement);

            // Configurar la cámara para vista inicial
            viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(0.0, 0.0, 15000000)
            });

            viewerRef.current = viewer;
            setIsLoading(false);

            console.log("Cesium viewer created successfully");

            // Cleanup al desmontar el componente
            return () => {
                if (viewerRef.current && !viewerRef.current.isDestroyed()) {
                    viewerRef.current.destroy();
                }
            };
        } catch (err) {
            console.error("Error creating Cesium viewer:", err);
            const errorMessage: string = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
            setIsLoading(false);
        }
    }, []);

    // Agregar marcadores después de que el visor esté listo
    useEffect((): void => {
        if (!viewerRef.current) return;

        try {
            const viewer: Cesium.Viewer = viewerRef.current;

            // Agregar algunas ciudades básicas
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(-74.006, 40.7128),
                name: "Nueva York",
                description: "Nueva York, Estados Unidos",
                point: {
                    pixelSize: 20,
                    color: Cesium.Color.YELLOW,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2
                }
            });

            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(-0.1278, 51.5074),
                name: "Londres",
                description: "Londres, Reino Unido",
                point: {
                    pixelSize: 20,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2
                }
            });

            console.log("Cities added successfully");
        } catch (error: unknown) {
            console.error("Error adding cities:", error);
        }

    }, []);

    if (error) {
        return (
            <div className="w-full h-screen bg-red-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-2xl font-bold mb-4">❌ Error al cargar Cesium</h1>
                    <p className="text-red-200 mb-4">{error}</p>
                    <p className="text-sm text-red-300">Revisa la consola para más detalles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            {/* Título estilo Google Earth */}
            <div className="absolute top-4 left-4 z-50 bg-black bg-opacity-80 text-white px-4 py-3 rounded-lg backdrop-blur-sm border border-gray-700">
                <h1 className="text-2xl font-bold text-blue-400">🌍 Cesium Earth</h1>
                <p className="text-sm opacity-90 text-gray-300">
                    {isLoading ? "Cargando globo 3D..." : "Globo 3D interactivo"}
                </p>
            </div>
            
            {/* Estado de carga */}
            {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
                    <div className="text-white text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
                        <p className="text-xl font-semibold">Iniciando Cesium...</p>
                        <p className="text-sm text-gray-300 mt-2">Esto puede tomar unos segundos</p>
                    </div>
                </div>
            )}
            
            {/* Información adicional */}
            {!isLoading && (
                <div className="absolute bottom-4 left-4 z-50 bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg backdrop-blur-sm text-sm border border-gray-700">
                    <p className="text-blue-400 font-semibold">🎮 Controles:</p>
                    <p className="text-xs text-gray-300">• Click + arrastrar: rotar</p>
                    <p className="text-xs text-gray-300">• Rueda del mouse: zoom</p>
                    <p className="text-xs text-gray-300">• Click derecho + arrastrar: inclinar</p>
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
                    fontFamily: "sans-serif"
                }}
            />
        </div>
    );
};

export default Globe;
