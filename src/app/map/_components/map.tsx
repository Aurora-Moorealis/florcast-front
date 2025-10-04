"use client";

import { useState, FC } from "react";
import Globe from "./globe";
import MapGlobe from "./map-globe";
import GlobeBasic from "./globe-basic";

// Tipos para el componente Map
interface MapProps {
    defaultView?: "basic" | "simple" | "advanced";
}

type ViewMode = "basic" | "simple" | "advanced";

/**
 * Componente Map - Selector de vistas de globo terrestre con TypeScript optimizado
 * 
 * Permite alternar entre tres implementaciones de globo 3D:
 * - Básico: Implementación ultrarrápida y minimalista
 * - Simple: Implementación básica con funcionalidades esenciales  
 * - Avanzado: Implementación completa con ciudades y terreno detallado
 */
const Map: FC<MapProps> = ({ defaultView = "basic" }) => {
    // Estado para controlar qué vista mostrar
    const [currentView, setCurrentView] = useState<ViewMode>(defaultView);

    /**
     * Cambiar al siguiente modo de vista en secuencia
     */
    const cycleView = (): void => {
        setCurrentView(prev => {
            switch (prev) {
                case "basic": return "simple";
                case "simple": return "advanced";
                case "advanced": return "basic";
                default: return "basic";
            }
        });
    };

    /**
     * Obtener información del modo actual
     */
    const getCurrentViewInfo = (): { icon: string; label: string; description: string } => {
        switch (currentView) {
            case "basic":
                return { 
                    icon: "🌐", 
                    label: "Básico", 
                    description: "Rendimiento óptimo" 
                };
            case "simple":
                return { 
                    icon: "🌍", 
                    label: "Simple", 
                    description: "Terreno básico" 
                };
            case "advanced":
                return { 
                    icon: "🌎", 
                    label: "Avanzado", 
                    description: "6 ciudades + terreno" 
                };
        }
    };

    const viewInfo = getCurrentViewInfo();

    return (
        <div className="relative w-full h-screen">
            {/* Panel de control mejorado */}
            <div className="absolute top-4 right-4 z-50 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md text-white p-4 rounded-2xl border border-gray-600/50 shadow-2xl">
                <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-gray-300">MODO ACTIVO</span>
                </div>
                
                <button
                    onClick={cycleView}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    type="button"
                >
                    <span className="text-xl">{viewInfo.icon}</span>
                    <div className="text-left">
                        <div className="font-bold text-sm">{viewInfo.label}</div>
                        <div className="text-xs opacity-80">{viewInfo.description}</div>
                    </div>
                </button>
                
                {/* Indicador TypeScript */}
                <div className="mt-3 pt-3 border-t border-gray-600/30">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-blue-300">TypeScript</span>
                        <span className="text-green-400">✅</span>
                    </div>
                </div>
            </div>

            {/* Renderizado condicional del componente de globo */}
            {currentView === "basic" ? (
                <GlobeBasic />
            ) : currentView === "simple" ? (
                <Globe />
            ) : (
                <MapGlobe />
            )}
        </div>
    );
};

export default Map;
