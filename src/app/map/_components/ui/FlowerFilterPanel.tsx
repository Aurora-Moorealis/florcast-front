'use client';

import React, { useState } from 'react';
import type { FC } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Flower } from 'lucide-react';

// Tipos de datos
interface FlowerType {
    id: string;
    name: string;
    color: string;
    category: string;
    region: string;
    season: string;
    rarity: string;
}

interface FlowerFilterPanelProps {
    className?: string;
}

export const FlowerFilterPanel: FC<FlowerFilterPanelProps> = ({ className }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [selectedRarity, setSelectedRarity] = useState('todos');
    const [isExpanded, setIsExpanded] = useState(true);

    // Base de datos extensa de rosas
    const flowerDatabase: FlowerType[] = [
        // Rosas Clásicas
        { id: '1', name: 'Rosa Roja Clásica', color: '#DC2626', category: 'clásica', region: 'Europa', season: 'primavera', rarity: 'común' },
        { id: '2', name: 'Rosa Blanca Pureza', color: '#FFFFFF', category: 'clásica', region: 'Asia', season: 'verano', rarity: 'común' },
        { id: '3', name: 'Rosa Rosa Pasión', color: '#EC4899', category: 'clásica', region: 'América', season: 'primavera', rarity: 'común' },
        { id: '4', name: 'Rosa Amarilla Sol', color: '#EAB308', category: 'clásica', region: 'África', season: 'verano', rarity: 'común' },
        
        // Rosas Exóticas
        { id: '5', name: 'Rosa Azul Celestial', color: '#3B82F6', category: 'exótica', region: 'Asia', season: 'invierno', rarity: 'rara' },
        { id: '6', name: 'Rosa Violeta Místico', color: '#8B5CF6', category: 'exótica', region: 'Europa', season: 'otoño', rarity: 'exótica' },
        { id: '7', name: 'Rosa Verde Esmeralda', color: '#10B981', category: 'exótica', region: 'América', season: 'primavera', rarity: 'exótica' },
        { id: '8', name: 'Rosa Negra Elegante', color: '#1F2937', category: 'exótica', region: 'África', season: 'invierno', rarity: 'legendaria' },
        
        // Rosas Silvestres
        { id: '9', name: 'Rosa Salvaje Coral', color: '#F97316', category: 'silvestre', region: 'América', season: 'primavera', rarity: 'común' },
        { id: '10', name: 'Rosa Montaña Lavanda', color: '#A855F7', category: 'silvestre', region: 'Europa', season: 'verano', rarity: 'rara' },
        { id: '11', name: 'Rosa Pradera Dorada', color: '#D97706', category: 'silvestre', region: 'Asia', season: 'otoño', rarity: 'común' },
        { id: '12', name: 'Rosa Desierto Carmesí', color: '#B91C1C', category: 'silvestre', region: 'África', season: 'invierno', rarity: 'rara' },
        
        // Rosas Híbridas
        { id: '13', name: 'Rosa Arcoíris Multicolor', color: '#6366F1', category: 'híbrida', region: 'Laboratorio', season: 'todo el año', rarity: 'legendaria' },
        { id: '14', name: 'Rosa Cristal Transparente', color: '#E5E7EB', category: 'híbrida', region: 'Laboratorio', season: 'todo el año', rarity: 'exótica' },
        { id: '15', name: 'Rosa Fuego Ardiente', color: '#EF4444', category: 'híbrida', region: 'Laboratorio', season: 'verano', rarity: 'exótica' },
        { id: '16', name: 'Rosa Hielo Gélida', color: '#06B6D4', category: 'híbrida', region: 'Laboratorio', season: 'invierno', rarity: 'rara' },
        
        // Rosas Antiguas
        { id: '17', name: 'Rosa Damascena Histórica', color: '#BE185D', category: 'antigua', region: 'Medio Oriente', season: 'primavera', rarity: 'rara' },
        { id: '18', name: 'Rosa Gallica Francesa', color: '#7C2D12', category: 'antigua', region: 'Europa', season: 'verano', rarity: 'exótica' },
        { id: '19', name: 'Rosa Alba Real', color: '#F3F4F6', category: 'antigua', region: 'Europa', season: 'primavera', rarity: 'legendaria' },
        { id: '20', name: 'Rosa Centifolia Reina', color: '#DB2777', category: 'antigua', region: 'Europa', season: 'verano', rarity: 'exótica' },
        
        // Rosas Nuevas - Expandiendo la colección
        { id: '21', name: 'Rosa Perla Nacarada', color: '#F8FAFC', category: 'híbrida', region: 'Laboratorio', season: 'todo el año', rarity: 'legendaria' },
        { id: '22', name: 'Rosa Cobre Brillante', color: '#CD7F32', category: 'antigua', region: 'Medio Oriente', season: 'otoño', rarity: 'exótica' },
        { id: '23', name: 'Rosa Jade Imperial', color: '#00A86B', category: 'exótica', region: 'Asia', season: 'primavera', rarity: 'legendaria' },
        { id: '24', name: 'Rosa Ámbar Dorado', color: '#FFBF00', category: 'silvestre', region: 'América', season: 'verano', rarity: 'rara' },
        
        // Rosas Tropicales
        { id: '25', name: 'Rosa Mango Tropical', color: '#FF8C00', category: 'tropical', region: 'Caribe', season: 'verano', rarity: 'común' },
        { id: '26', name: 'Rosa Coco Blanco', color: '#F5F5DC', category: 'tropical', region: 'Pacífico', season: 'todo el año', rarity: 'rara' },
        { id: '27', name: 'Rosa Hibisco Fucsia', color: '#FF1493', category: 'tropical', region: 'Hawái', season: 'primavera', rarity: 'común' },
        { id: '28', name: 'Rosa Plátano Amarillo', color: '#FFE135', category: 'tropical', region: 'América Central', season: 'verano', rarity: 'común' },
        
        // Rosas Mágicas
        { id: '29', name: 'Rosa Estrella Plateada', color: '#C0C0C0', category: 'mágica', region: 'Reino Místico', season: 'luna llena', rarity: 'legendaria' },
        { id: '30', name: 'Rosa Aurora Boreal', color: '#00FFFF', category: 'mágica', region: 'Ártico', season: 'invierno', rarity: 'legendaria' },
        { id: '31', name: 'Rosa Eclipse Solar', color: '#FFD700', category: 'mágica', region: 'Observatorio', season: 'eclipse', rarity: 'exótica' },
        { id: '32', name: 'Rosa Galaxia Violeta', color: '#9932CC', category: 'mágica', region: 'Espacio', season: 'eterna', rarity: 'legendaria' }
    ];

    // Filtrar flores según criterios
    const filteredFlowers = flowerDatabase.filter(flower => {
        const matchesSearch = flower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            flower.region.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'todos' || flower.category === selectedCategory;
        const matchesRarity = selectedRarity === 'todos' || flower.rarity === selectedRarity;
        
        return matchesSearch && matchesCategory && matchesRarity;
    });

    const categories = ['todos', 'clásica', 'exótica', 'silvestre', 'híbrida', 'antigua', 'tropical', 'mágica'];
    const rarities = ['todos', 'común', 'rara', 'exótica', 'legendaria'];

    return (
        <div className={`
            ${isExpanded ? 'w-80' : 'w-16'}
            h-screen bg-black/20 backdrop-blur-md border-r border-white/10
            transition-all duration-300 ease-in-out
            flex flex-col z-10
            ${className}
        `}>
            {/* Header con botón de expansión/colapso */}
            <div className="flex items-center justify-between p-3 border-b border-white/10">
                {isExpanded && (
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-pink-400" />
                        <h2 className="text-sm font-semibold text-white">Filtros de Flores</h2>
                    </div>
                )}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 rounded-md hover:bg-white/10 transition-colors text-pink-400"
                >
                    {isExpanded ? (
                        <ChevronLeft className="w-4 h-4" />
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Contenido del panel - Solo visible cuando está expandido */}
            {isExpanded && (
                <>
                    {/* Barra de búsqueda */}
                    <div className="p-3 border-b border-white/10">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar flores..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400/50 focus:bg-white/10 transition-all"
                            />
                        </div>
                    </div>

                    {/* Filtros de categoría */}
                    <div className="p-3 border-b border-white/10">
                        <h3 className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">Categorías</h3>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-pink-400/50 cursor-pointer"
                        >
                            {categories.map(category => (
                                <option key={category} value={category} className="bg-gray-800">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtros de rareza */}
                    <div className="p-3 border-b border-white/10">
                        <h3 className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">Rareza</h3>
                        <select
                            value={selectedRarity}
                            onChange={(e) => setSelectedRarity(e.target.value)}
                            className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-pink-400/50 cursor-pointer"
                        >
                            {rarities.map(rarity => (
                                <option key={rarity} value={rarity} className="bg-gray-800">
                                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Lista de flores filtradas */}
                    <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                                Resultados ({filteredFlowers.length})
                            </h3>
                        </div>
                        
                        <div className="space-y-2">
                            {filteredFlowers.map((flower, index) => (
                                <div
                                    key={flower.id}
                                    className="p-3 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 hover:border-pink-400/30 transition-all duration-200 cursor-pointer group animate-fade-in"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Flower 
                                                className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:animate-flower-glow"
                                                style={{ color: flower.color }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-white truncate">
                                                {flower.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`
                                                    px-2 py-0.5 rounded-full text-xs font-medium transition-all
                                                    ${flower.rarity === 'legendaria' ? 'bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/40' :
                                                      flower.rarity === 'exótica' ? 'bg-purple-500/20 text-purple-300 group-hover:bg-purple-500/40' :
                                                      flower.rarity === 'rara' ? 'bg-blue-500/20 text-blue-300 group-hover:bg-blue-500/40' :
                                                      'bg-green-500/20 text-green-300 group-hover:bg-green-500/40'
                                                    }
                                                `}>
                                                    {flower.rarity}
                                                </span>
                                                <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{flower.region}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                                        <span className={`
                                            capitalize px-2 py-0.5 rounded text-xs
                                            ${flower.category === 'mágica' ? 'bg-purple-500/10 text-purple-300' :
                                              flower.category === 'tropical' ? 'bg-orange-500/10 text-orange-300' :
                                              'bg-gray-500/10 text-gray-300'
                                            }
                                        `}>
                                            {flower.category}
                                        </span>
                                        <span>•</span>
                                        <span>{flower.season}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredFlowers.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <Flower className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No se encontraron flores</p>
                                <p className="text-xs mt-1">Ajusta tus filtros de búsqueda</p>
                            </div>
                        )}
                    </div>

                    {/* Footer con información adicional */}
                    <div className="p-3 border-t border-white/10 bg-black/30">
                        <div className="text-center">
                            <p className="text-xs text-gray-400">
                                {flowerDatabase.length} flores en la base de datos
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FlowerFilterPanel;