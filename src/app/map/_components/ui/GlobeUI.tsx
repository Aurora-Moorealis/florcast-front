/**
 * Componentes UI para los globos de Cesium
 * Interfaces de usuario reutilizables
 */

import { FC } from 'react';
import { Rose } from 'lucide-react'

// Componente de carga
interface LoadingOverlayProps {
    title: string;
    subtitle: string;
    color?:'green';
}

export const LoadingOverlay: FC<LoadingOverlayProps> = ({ 
    title, 
    subtitle, 
    color = 'green' 
}) => {
    const colorClasses = {
        green: 'from-green-900/30 to-black/60 border-green-500 bg-green-500 text-green-300',
    };

    const colors = colorClasses[color];

    return (
        <div className={`absolute inset-0 bg-gradient-to-b ${colors.split(' ')[0]} ${colors.split(' ')[1]} flex items-center justify-center z-20 backdrop-blur-sm`}>
            <div className={`text-white text-center bg-black/90 rounded-2xl p-8 border ${colors.split(' ')[2]}`}>
                <div className="relative">
                    <div className={`animate-spin rounded-full h-16 w-16 border-4 ${colors.split(' ')[3]} border-t-transparent mx-auto mb-4`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-6 h-6 ${colors.split(' ')[4]} rounded-full animate-pulse`}></div>
                    </div>
                </div>
                <h2 className={`text-xl font-bold mb-2 ${colors.split(' ')[5]}`}>{title}</h2>
                <p className="text-sm text-gray-300">{subtitle}</p>
            </div>
        </div>
    );
};

// Componente de error
interface ErrorDisplayProps {
    error: string;
    title?: string;
}

// Componente de controles de efectos especiales
interface SpecialEffectsControlsProps {
    className?: string;
}

export const SpecialEffectsControls: FC<SpecialEffectsControlsProps> = ({ className }) => {
    const effects = [
        { key: 'R', name: 'Lluvia', icon: '🌧️', description: 'Activar/desactivar lluvia' },
        { key: 'S', name: 'Nieve', icon: '❄️', description: 'Activar/desactivar nieve' },
        { key: 'A', name: 'Aurora', icon: '🌌', description: 'Activar/desactivar aurora boreal' },
        { key: 'M', name: 'Meteoros', icon: '☄️', description: 'Activar/desactivar lluvia de meteoros' }
    ];

    const timeStatus = { name: 'Tiempo: Fijo (Día)', icon: '☀️', description: 'Iluminación diurna permanente' };

    return (
        <div className={`absolute top-4 right-4 bg-black/90 backdrop-blur-md rounded-lg p-4 border border-gray-700 max-w-xs ${className || ''}`}>
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                � Experiencia Ultra
            </h3>
            
            {/* Estado cinematográfico */}
            <div className="mb-4 space-y-2">
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Sistema Cinematográfico</h4>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-green-300">
                        <span>✅</span>
                        <span>Entrada cinemática activa</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-300">
                        <span>🌍</span>
                        <span>Rotación automática del globo</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-300">
                        <span>✨</span>
                        <span>Partículas UI flotantes</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-amber-300">
                        <span>🏙️</span>
                        <span>Animaciones de ciudades</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-cyan-300">
                        <span>🎯</span>
                        <span>Auto-centrado al cargar</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-yellow-300 mb-2">Efectos Especiales (Teclado)</h4>
                {effects.map((effect) => (
                    <div key={effect.key} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
                        <span className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-yellow-400 border border-gray-600">
                            {effect.key}
                        </span>
                        <span className="text-lg">{effect.icon}</span>
                        <span className="flex-1">{effect.name}</span>
                    </div>
                ))}
                
                {/* Estado del tiempo fijo */}
                <div className="flex items-center gap-3 text-sm text-green-300 bg-green-900/20 rounded p-2 border border-green-700/50">
                    <span className="w-6 h-6 bg-green-800 rounded flex items-center justify-center text-xs font-bold text-yellow-300 border border-green-600">
                        ☀
                    </span>
                    <span className="text-lg">{timeStatus.icon}</span>
                    <span className="flex-1">{timeStatus.name}</span>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                    🎮 Presiona las teclas para efectos especiales
                </p>
                <p className="text-xs text-green-400 mt-1">
                    ☀️ Iluminación diurna permanente
                </p>
                <p className="text-xs text-blue-400 mt-1">
                    🎬 Calidad ultra + animaciones cinemáticas
                </p>
            </div>
        </div>
    );
};

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ 
    error, 
    title = "Error Cesium" 
}) => (
    <div className="w-full h-screen bg-red-900 flex items-center justify-center">
        <div className="text-white text-center p-8 bg-red-800/50 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">❌ {title}</h2>
            <p className="text-red-200 mb-4">{error}</p>
            <div className="text-sm text-red-300 text-left">
                <p>• Verifica la conexión a internet</p>
                <p>• Comprueba que Cesium esté instalado</p>
                <p>• Revisa la consola del navegador</p>
            </div>
        </div>
    </div>
);

// Header del globo
interface GlobeHeaderProps {
    title: string;
    subtitle: string;
    icon: string;
    isLoading: boolean;
    color?: 'blue' | 'green' | 'purple';
}

export const GlobeHeader: FC<GlobeHeaderProps> = ({ 
    title, 
    subtitle, 
    icon, 
    isLoading, 
    color = 'blue' 
}) => {
    const colorClasses = {
        blue: 'from-blue-900/90 to-blue-800/90 border-blue-500/30 text-blue-300',
        green: 'from-green-900/90 to-blue-900/90 border-green-500/30 text-green-300',
        purple: 'from-purple-900/90 to-blue-900/90 border-purple-500/30 text-purple-300'
    };

    const colors = colorClasses[color];

    return (
        <div className={`absolute top-4 left-4 z-10 bg-gradient-to-r ${colors} text-white px-5 py-3 rounded-xl backdrop-blur border`}>
            <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                    <h1 className={`text-lg font-bold ${colors.split(' ')[3]}`}>
                        {icon} {title}
                    </h1>
                    <p className="text-sm opacity-90 text-gray-200">
                        {isLoading ? "Cargando..." : subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Panel de información
interface InfoPanelProps {
    items: { label: string; value: string; color?: string }[];
}

export const InfoPanel: FC<InfoPanelProps> = ({ items }) => (
    <div className="absolute bottom-4 left-4 z-10 bg-black/80 text-white px-4 py-3 rounded-lg text-sm backdrop-blur space-y-1">
        {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
                <span className={`${item.color || 'text-green-400'}`}>●</span>
                <span className="text-gray-300">{item.label}:</span>
                <span className="text-white">{item.value}</span>
            </div>
        ))}
    </div>
);

// Botón de control del modo de vista
interface ViewControlButtonProps {
    viewInfo: {
        icon: string;
        label: string;
        description: string;
    };
    onCycleView: () => void;
}

export const ViewControlButton: FC<ViewControlButtonProps> = ({ 
    viewInfo, 
    onCycleView 
}) => (
    <div className="absolute top-4 right-4 z-50 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md text-white p-4 rounded-2xl border border-gray-600/50 shadow-2xl">
        <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-300">MODO ACTIVO</span>
        </div>
        
        <button
            onClick={onCycleView}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            type="button"
        >
            <span className="text-xl">{viewInfo.icon}</span>
            <div className="text-left">
                <div className="font-bold text-sm">{viewInfo.label}</div>
                <div className="text-xs opacity-80">{viewInfo.description}</div>
            </div>
        </button>
        
        <div className="mt-3 pt-3 border-t border-gray-600/30">
            <div className="flex items-center justify-between text-xs">
                <span className="text-blue-300">TypeScript</span>
                <span className="text-green-400">✅</span>
            </div>
        </div>
    </div>
);
interface PanelRightProps {
    title?: string;
    color?: 'blue' | 'green' | 'purple' | 'red';
    icon?: string;
    children?: React.ReactNode;
}

export const PanelRight: FC<PanelRightProps> = ({ 
    title = 'Flores',
    color = 'red',
    icon = '🌹',
    children
}) => {
    const colorClasses = {
        blue: 'from-blue-900/80 to-blue-800/80 border-blue-500/30 text-blue-300',
        green: 'from-green-900/80 to-green-800/80 border-green-500/30 text-green-300',
        purple: 'from-purple-900/80 to-purple-800/80 border-purple-500/30 text-purple-300',
        red: 'from-red-900/80 to-red-800/80 border-red-500/30 text-red-300'
    };

    const colors = colorClasses[color];

    // Array de ejemplo de flores con diferentes colores
    const flowerItems = [
        { color: '#ff6b6b', name: 'Rosa Roja' },
        { color: '#4ecdc4', name: 'Rosa Azul' },
        { color: '#45b7d1', name: 'Rosa Celeste' },
        { color: '#96ceb4', name: 'Rosa Verde' },
        { color: '#feca57', name: 'Rosa Amarilla' },
        { color: '#ff9ff3', name: 'Rosa Rosa' }
    ];

    return (
        <div className={`absolute z-10 top-1/2 right-0 transform -translate-y-1/2 m-10 bg-gradient-to-br backdrop-blur-md rounded-2xl border shadow-2xl`}>
            <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{icon}</span>
                    <h2 className={`text-xl font-bold text-white`}>{title}</h2>
                </div>

                {/* Fila de flores */}
                <div className="flex flex-col space-y-3">
                    {flowerItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-black/20 rounded-lg">
                            <Rose 
                                color={item.color} 
                                size={24} 
                                className="animate-pulse" 
                            />
                            <span className="text-white text-sm font-medium">{item.name}</span>
                        </div>
                    ))}
                </div>

                {children && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

// Fin de componentes UI para el globo