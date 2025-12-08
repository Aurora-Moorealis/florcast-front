
import { FC } from 'react';
import { Rose, Plus } from 'lucide-react'

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

interface ErrorDisplayProps {
    error: string;
    title?: string;
}
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
                        ☀JJJJJJJJ
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
}) => {
    const isWebAssemblyError = error.toLowerCase().includes('webassembly');
    const isNetworkError = error.toLowerCase().includes('network') || error.toLowerCase().includes('fetch');
    const isMemoryError = error.toLowerCase().includes('memory');

    const handleReload = () => {
        window.location.reload();
    };

    const handleCheckBrowser = () => {
        const info = {
            userAgent: navigator.userAgent,
            webAssembly: typeof WebAssembly !== 'undefined',
            webGL: !!document.createElement('canvas').getContext('webgl'),
            memoryInfo: (performance as any).memory ? {
                usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
                totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
                jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
            } : 'No disponible'
        };
        console.log('🔍 Diagnóstico del navegador:', info);
        alert(`WebAssembly: ${info.webAssembly ? '✅' : '❌'}\nWebGL: ${info.webGL ? '✅' : '❌'}\nMemoria: ${JSON.stringify(info.memoryInfo, null, 2)}`);
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center p-4">
            <div className="text-white text-center p-8 bg-black/40 backdrop-blur-md rounded-2xl max-w-2xl border border-red-500/30">
                <div className="text-6xl mb-4">🚨</div>
                <h2 className="text-3xl font-bold mb-4 text-red-300">{title}</h2>
                
                <div className="bg-red-900/50 rounded-lg p-4 mb-6 border border-red-500/30">
                    <p className="text-red-200 font-mono text-sm break-words">{error}</p>
                </div>

                {isWebAssemblyError && (
                    <div className="bg-yellow-900/50 rounded-lg p-4 mb-4 border border-yellow-500/30">
                        <h3 className="text-yellow-300 font-semibold mb-2">🔧 Error de WebAssembly</h3>
                        <div className="text-yellow-200 text-sm text-left space-y-1">
                            <p>• Tu navegador puede no soportar WebAssembly</p>
                            <p>• Intenta con Chrome, Firefox, Safari o Edge actualizados</p>
                            <p>• Verifica que tengas memoria suficiente disponible</p>
                        </div>
                    </div>
                )}

                {isNetworkError && (
                    <div className="bg-blue-900/50 rounded-lg p-4 mb-4 border border-blue-500/30">
                        <h3 className="text-blue-300 font-semibold mb-2">🌐 Error de Red</h3>
                        <div className="text-blue-200 text-sm text-left space-y-1">
                            <p>• Verifica tu conexión a internet</p>
                            <p>• El CDN de Cesium puede estar temporalmente no disponible</p>
                            <p>• Intenta desactivar bloquedores de anuncios</p>
                        </div>
                    </div>
                )}

                {isMemoryError && (
                    <div className="bg-purple-900/50 rounded-lg p-4 mb-4 border border-purple-500/30">
                        <h3 className="text-purple-300 font-semibold mb-2">💾 Error de Memoria</h3>
                        <div className="text-purple-200 text-sm text-left space-y-1">
                            <p>• Cierra otras pestañas del navegador</p>
                            <p>• Reinicia el navegador</p>
                            <p>• Intenta con un dispositivo con más memoria</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                        onClick={handleReload}
                        className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        🔄 Recargar Página
                    </button>
                    <button
                        onClick={handleCheckBrowser}
                        className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        🔍 Diagnóstico
                    </button>
                </div>

                <div className="text-xs text-gray-400 mt-4 text-left bg-gray-900/50 rounded p-3">
                    <p><strong>Navegadores Recomendados:</strong> Chrome 89+, Firefox 88+, Safari 14+, Edge 89+</p>
                    <p><strong>Requisitos:</strong> WebAssembly, WebGL, 2GB RAM disponibles</p>
                </div>
            </div>
        </div>
    );
};

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
    icon = '🌹',
    children
}) => {
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

// Componente de panel de información para flores enfocadas
import { Flower } from '../types/flowers';

interface FlowerInfoPanelProps {
    flower?: Flower | null;
    isVisible?: boolean;
    className?: string;
}

export const FlowerInfoPanel: FC<FlowerInfoPanelProps> = ({ 
    flower, 
    isVisible = false, 
    className = "" 
}) => {
    if (!isVisible || !flower) {
        return null;
    }

    // No need for rarity/category color functions with new data structure

    return (
        <div className={`
            fixed top-32 right-4 z-30
            bg-black/90 backdrop-blur-md rounded-2xl border border-white/20
            p-6 max-w-md w-80 shadow-2xl
            animate-in fade-in slide-in-from-right-4 duration-300
            ${className}
        `}>
            {/* Header con nombre */}
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-1">
                    {flower.common_name}
                </h2>
                <p className="text-sm italic text-gray-300">
                    {flower.scientific_name}
                </p>
            </div>

            {/* Badges de información */}
            <div className="flex justify-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 border-green-500/30 text-green-300">
                    BLOOM: {flower.bloom_season}
                </span>
            </div>

            {/* Información detallada */}
            <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-gray-400">Max Height:</span>
                        <p className="text-white font-medium">{flower.max_height.toFixed(1)} cm</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Growth:</span>
                        <p className="text-white font-medium">{flower.growth_rate.toFixed(2)} cm/día</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-gray-400">Initial Height:</span>
                        <p className="text-white font-medium">{flower.initial_height.toFixed(1)} cm</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Grow Day Degree:</span>
                        <p className="text-white font-medium">{flower.temperature_to_grow.toFixed(1)}°C</p>
                    </div>
                </div>

                <div>
                    <span className="text-gray-400">Season:</span>
                    <p className="text-white font-medium">
                        {Array.isArray(flower.bloom_season) 
                            ? flower.bloom_season.join(', ') 
                            : flower.bloom_season}
                    </p>
                </div>

                <div>
                    <span className="text-gray-400">Location:</span>
                    <p className="text-white font-medium flex items-center gap-1">
                        <span>📍</span>
                        {flower.location.location_name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {flower.location.country_code} • {flower.location.coords.latitude.toFixed(4)}, {flower.location.coords.longitude.toFixed(4)}
                    </p>
                </div>
                
                <div>
                    <span className="text-gray-400">Planted:</span>
                    <p className="text-white font-medium">
                        {new Date(flower.planting_date).toLocaleDateString('es-ES')}
                    </p>
                </div>

                <div className="pt-2 border-t border-white/20">
                    <p className="text-gray-300 leading-relaxed">
                        {flower.description}
                    </p>
                </div>
            </div>

            {/* Indicador de cierre */}
            <div className="text-center mt-4 pt-3 border-t border-white/20">
                <p className="text-xs text-gray-400">
                    Click on another area to close
                </p>
            </div>
        </div>
    );
};

interface NavigationControlsProps {
    onCenterView?: () => void;
    onGoHome?: () => void;
    className?: string;
}

export const NavigationControls: FC<NavigationControlsProps> = ({ 
    onCenterView,
    className = "" 
}) => {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className={`fixed top-4 right-4 z-30 flex flex-col gap-2 ${className}`}>
            <button
                onClick={onCenterView}
                className="
                    bg-black/90 backdrop-blur-md hover:bg-black/80
                    text-white p-3 rounded-xl border border-white/20
                    shadow-lg transition-all duration-200 hover:scale-105
                    group
                "
                title="Centrar vista"

            ><Plus className="size-6" /></button>

            <button
                onClick={handleGoHome}
                className="
                    bg-black/90 backdrop-blur-md hover:bg-black/80
                    text-white p-3 rounded-xl border border-white/20
                    shadow-lg transition-all duration-200 hover:scale-105
                    group
                "
                title="Ir al inicio"
            >
                <svg 
                    className="w-6 h-6 group-hover:text-green-400 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                </svg>
            </button>
        </div>
    );
};
