'use client';

import React, { useState } from 'react';
import type { FC } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Flower as FlowerIcon } from 'lucide-react';
import { Flower } from '../types/flowers';
import { FlowerFilter } from '../types/interfaces';
import { mockFlowerData } from '../../../../data/flower';

interface FlowerUIData extends Flower {
    color: string;
    category: string;
}

interface FlowerFilterPanelProps {
    className?: string;
    flowers?: Flower[];
    onFlowerSelect?: (flower: FlowerUIData) => void; 
    onFiltersChange?: (filters: FlowerFilter) => void; 
    isLoading?: boolean; 
}

// familyToCategoryMap removed as it's not used with the new data structure


const flowerColorMap: Record<string, string> = {
    'rosa': '#EC4899',
    'rose': '#EC4899',
    'roja': '#DC2626',
    'red': '#DC2626',
    'blanca': '#FFFFFF',
    'white': '#FFFFFF',
    'amarilla': '#EAB308',
    'yellow': '#EAB308',
    'azul': '#3B82F6',
    'blue': '#3B82F6',
    'violeta': '#8B5CF6',
    'purple': '#8B5CF6',
    'verde': '#10B981',
    'green': '#10B981',
    'naranja': '#F97316',
    'orange': '#F97316',
    'fucsia': '#FF1493',
    'coral': '#F97316'
};

const determineRarity = (flower: Flower): string => {
    const isHighMountain = flower.description.toLowerCase().includes('mountain') || 
                          flower.description.toLowerCase().includes('alpine') ||
                          flower.location.location_name.toLowerCase().includes('everest') ||
                          flower.location.location_name.toLowerCase().includes('swiss');

    if (isHighMountain || 
        flower.description.toLowerCase().includes('rare') ||
        flower.description.toLowerCase().includes('toxic') ||
        flower.max_height >= 800) {
        return 'legendaria';
    }
    
    if (flower.description.toLowerCase().includes('tropical') ||
        flower.description.toLowerCase().includes('exotic') ||
        flower.max_height >= 500) {
        return 'exótica';
    }
    
    if (flower.max_height >= 100 || 
        flower.description.toLowerCase().includes('fragrance') ||
        flower.description.toLowerCase().includes('ornamental')) {
        return 'rara';
    }
    
    return 'común';
};

const convertFlowerData = (apiFlowers: Flower[]): FlowerUIData[] => {
    return apiFlowers.map(flower => {
        const category = 'silvestre'; // Simplified since family property doesn't exist in new structure
        const colorKey = Object.keys(flowerColorMap).find(key => 
            flower.common_name.toLowerCase().includes(key)
        );
        const color = colorKey ? flowerColorMap[colorKey] : '#10B981';
        const rarity = determineRarity(flower);

        return {
            ...flower,
            category,
            color,
            rarity
        };
    });
};

export const FlowerFilterPanel: FC<FlowerFilterPanelProps> = ({ 
    className, 
    flowers = [], 
    onFlowerSelect,
    onFiltersChange,
    isLoading = false 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedRarity] = useState('all');
    const [isExpanded, setIsExpanded] = useState(true);

    React.useEffect(() => {
        if (onFiltersChange) {
            const filters: FlowerFilter = {
                category: selectedCategory !== 'all' ? selectedCategory : undefined,
                rarity: selectedRarity !== 'all' ? selectedRarity : undefined,
            };
            onFiltersChange(filters);
        }
    }, [selectedCategory, selectedRarity, onFiltersChange]);

    const flowerDatabase: FlowerUIData[] = flowers.length > 0 
        ? convertFlowerData(flowers)
        : convertFlowerData(mockFlowerData);

    const filteredFlowers = flowerDatabase.filter(flower => {
        const matchesSearch = flower.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            flower.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            flower.location.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            flower.bloom_season.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || flower.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const categories = ['all', 'clásica', 'exótica', 'silvestre', 'híbrida', 'antigua', 'tropical', 'mágica'];

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
                        <h2 className="text-sm font-semibold text-white">Flower Filters</h2>
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
                                placeholder="Search flower..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400/50 focus:bg-white/10 transition-all"
                            />
                        </div>
                    </div>

                    {/* Filtros de categoría */}
                    <div className="p-3 border-b border-white/10">
                        <h3 className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">Categories</h3>
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

                    {/* Lista de flores filtradas */}
                    <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                                Results ({filteredFlowers.length})
                            </h3>
                        </div>
                        
                        <div className="space-y-2">
                            {isLoading ? (
                                // Skeleton loading
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={`skeleton-${index}`}
                                        className="p-3 bg-white/5 rounded-md border border-white/10 animate-pulse"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                                            <div className="flex-1">
                                                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                                                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                filteredFlowers.map((flower, index) => (
                                    <div
                                        key={flower.id}
                                        className="p-3 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 hover:border-pink-400/30 transition-all duration-200 cursor-pointer group animate-fade-in"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                        onClick={() => onFlowerSelect?.(flower)}
                                    >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <FlowerIcon 
                                                className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:animate-flower-glow"
                                                style={{ color: flower.color }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-white truncate">
                                                {flower.common_name}
                                            </h4>
                                            <p className="text-xs text-gray-400 italic truncate">
                                                {flower.scientific_name}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{flower.location.location_name}</span>
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
                                        <span>{Array.isArray(flower.bloom_season) ? flower.bloom_season.join(', ') : flower.bloom_season}</span>
                                    </div>
                                </div>
                            ))
                            )}
                        </div>

                        {!isLoading && filteredFlowers.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <FlowerIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No flowers found</p>
                                <p className="text-xs mt-1">Adjust your search filters</p>
                            </div>
                        )}
                    </div>

                    {/* Footer con información adicional */}
                    <div className="p-3 border-t border-white/10 bg-black/30">
                        <div className="text-center">
                            <p className="text-xs text-gray-400">
                                {flowerDatabase.length} flowers in database
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FlowerFilterPanel;