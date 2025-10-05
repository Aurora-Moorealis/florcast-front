"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink, Globe, Calendar, FileText, Award } from 'lucide-react';

const SourcesPage = () => {
  const sources = [
    {
      id: 1,
      title: "Satellite prediction of forest flowering phenology",
      url: "https://doi.org/10.1016/j.rse.2020.112197",
      description: "Remote sensing approach for predicting forest flowering patterns using satellite data",
      journal: "Remote Sensing of Environment",
      category: "Satellite Remote Sensing"
    },
    {
      id: 2,
      title: "Detecting flowering phenology in oil seed rape parcels with Sentinel-1 and -2 time series",
      url: "https://doi.org/10.1016/j.rse.2020.111660",
      description: "Multi-temporal analysis of flowering detection using Sentinel satellite imagery",
      journal: "Remote Sensing of Environment",
      category: "Satellite Remote Sensing"
    },
    {
      id: 3,
      title: "Rapid Shifts of Peak Flowering Phenology in 12 Species under the Effects of Extreme Climate Events in Macao",
      url: "https://www.nature.com/articles/s41598-018-32209-4",
      description: "Climate change impacts on flowering timing patterns in multiple species",
      journal: "Nature Scientific Reports",
      category: "Climate Research"
    },
    {
      id: 4,
      title: "An enhanced bloom index for quantifying floral phenology using multi-scale remote sensing observations",
      url: "https://doi.org/10.1016/j.isprsjprs.2019.08.006",
      description: "Development of improved indices for flower detection and quantification",
      journal: "ISPRS Journal of Photogrammetry and Remote Sensing",
      category: "Index Development"
    },
    {
      id: 5,
      title: "Pear flower cluster quantification using RGB drone imagery",
      url: "https://www.mdpi.com/2073-4395/10/3/407",
      description: "UAV-based approach for counting and analyzing pear blossom clusters",
      journal: "Agronomy",
      category: "UAV Applications"
    },
    {
      id: 6,
      title: "Automatic apple tree blossom estimation from uav rgb imagery",
      url: "https://doi.org/10.5194/isprs-archives-XLII-2-W13-631-2019",
      description: "Automated detection and quantification of apple tree flowering using drone technology",
      journal: "ISPRS Archives",
      category: "UAV Applications"
    },
    {
      id: 7,
      title: "Remote estimation of vegetation fraction and flower fraction in oilseed rape with unmanned aerial vehicle data",
      url: "https://doi.org/10.3390/rs8050416",
      description: "Quantitative analysis of flowering coverage using UAV remote sensing",
      journal: "Remote Sensing",
      category: "UAV Applications"
    },
    {
      id: 8,
      title: "Robinia pseudoacacia L. flower analyzed by using unmanned aerial vehicle (UAV)",
      url: "https://doi.org/10.3390/rs9111091",
      description: "Species-specific flowering analysis using unmanned aerial systems",
      journal: "Remote Sensing",
      category: "UAV Applications"
    },
    {
      id: 9,
      title: "Mapping of the invasive species Hakea sericea using Unmanned Aerial Vehicle (UAV) and worldview-2 imagery and an object-oriented approach",
      url: "https://doi.org/10.3390/rs9090913",
      description: "Combined UAV and satellite approach for invasive species flowering detection",
      journal: "Remote Sensing",
      category: "Species Mapping"
    },
    {
      id: 10,
      title: "Deciphering the spectra of flowers to map landscape-scale blooming dynamics",
      url: "https://esajournals.onlinelibrary.wiley.com/doi/10.1002/ecs2.70127",
      description: "Spectral analysis techniques for large-scale flowering pattern mapping",
      journal: "Ecosphere",
      category: "Spectral Analysis"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Satellite Remote Sensing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Climate Research': 'bg-red-100 text-red-800 border-red-200',
      'Index Development': 'bg-purple-100 text-purple-800 border-purple-200',
      'UAV Applications': 'bg-green-100 text-green-800 border-green-200',
      'Species Mapping': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Spectral Analysis': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const categories = [...new Set(sources.map(source => source.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to FlorCast</span>
            </Link>
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="w-5 h-5" />
              <span className="text-sm">florcast.earth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <BookOpen className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Scientific Sources & References
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Research Foundation for FlorCast</span>
          </div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our flower prediction models are based on cutting-edge research in remote sensing, 
            phenology detection, and agricultural monitoring. These peer-reviewed publications 
            form the scientific foundation of our prediction algorithms.
          </p>
        </div>

        {/* Categories Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-600" />
            Research Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <span 
                key={category}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Sources List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Referenced Publications</h2>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {sources.map((source) => (
              <div key={source.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-600 font-bold text-sm px-2 py-1 rounded">
                      #{source.id}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(source.category)}`}>
                      {source.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                  {source.title}
                </h3>

                <p className="text-gray-600 mb-3 leading-relaxed">
                  {source.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Published in:</span> {source.journal}
                  </div>
                  
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors group"
                  >
                    <span>Read Paper</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Note */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Research Methodology</h3>
              <p className="text-blue-800 leading-relaxed mb-3">
                These publications represent state-of-the-art research in flowering phenology detection 
                using various remote sensing platforms including satellites, UAVs, and ground-based sensors. 
                Our algorithms incorporate techniques from:
              </p>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Multi-temporal satellite imagery analysis (Sentinel-1, Sentinel-2, WorldView)</li>
                <li>• UAV-based RGB and multispectral imaging</li>
                <li>• Spectral index development for flower detection</li>
                <li>• Machine learning approaches for phenology prediction</li>
                <li>• Climate change impact assessment on flowering patterns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Citation Information */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            How to Cite FlorCast
          </h3>
          <div className="bg-white border border-gray-200 rounded p-4 font-mono text-sm text-gray-700">
            FlorCast Team. (2025). FlorCast: AI-Powered Flower Blooming Prediction Platform. 
            NASA Space Apps Challenge 2025. Retrieved from https://florcast.earth
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to FlorCast
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-gray-800 transition-colors px-4 py-2"
            >
              About Our Team
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-600 hover:text-gray-800 transition-colors px-4 py-2"
            >
              Terms & Conditions
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              © 2025 FlorCast Team. Built for NASA Space Apps Challenge 2025.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              All referenced papers are the property of their respective authors and publishers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcesPage;