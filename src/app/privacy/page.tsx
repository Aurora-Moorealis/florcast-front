"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, Lock, Globe, Mail, Calendar } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Last Updated: October 5, 2025</span>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At <span className="font-semibold text-blue-600">FlorCast</span>, we are committed to 
            protecting your privacy and ensuring transparency about our data practices.
          </p>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Information We Collect */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-2">We DO NOT collect personal information</h3>
                <p>FlorCast is designed as an educational visualization tool that does not require user registration, login, or personal data collection.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Technical Information (Anonymous)</h3>
                <p>• Basic browser information for compatibility purposes</p>
                <p>• Anonymous usage statistics to improve site performance</p>
                <p>• Temporary session data for site functionality</p>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How We Use Information</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• <strong>Educational Purpose:</strong> To provide scientific visualization and educational content</p>
              <p>• <strong>Site Improvement:</strong> Anonymous analytics to enhance user experience</p>
              <p>• <strong>Technical Functionality:</strong> To ensure proper operation of 3D visualizations and interactive features</p>
              <p>• <strong>Research Support:</strong> To contribute to open science and educational initiatives</p>
            </div>
          </div>

          {/* Data Sources */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Data Sources</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• <strong>Open Scientific Data:</strong> Publicly available datasets from research institutions</p>
              <p>• <strong>NASA Open Data:</strong> Earth observation and environmental data</p>
              <p>• <strong>Educational Databases:</strong> Botanical and ecological information from academic sources</p>
              <p>• <strong>No Personal Data:</strong> All displayed information is from public scientific sources</p>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Lock className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• <strong>CesiumJS:</strong> 3D visualization library (no data collection)</p>
              <p>• <strong>Hosting Services:</strong> Standard web hosting with minimal logging</p>
              <p>• <strong>CDN Services:</strong> For improved site performance</p>
              <p className="bg-orange-50 p-3 rounded border border-orange-200 text-orange-800">
                <strong>Note:</strong> We do not use advertising networks, social media trackers, or marketing analytics.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• <strong>No Account Required:</strong> Use FlorCast without providing any personal information</p>
              <p>• <strong>Data Transparency:</strong> All data sources are clearly attributed and publicly available</p>
              <p>• <strong>Browser Controls:</strong> Manage cookies and site data through your browser settings</p>
              <p>• <strong>Open Source:</strong> Our code and methodologies are transparent and available for review</p>
            </div>
          </div>

          {/* Cookies and Local Storage */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Database className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Local Storage</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• <strong>Essential Cookies:</strong> Required for site functionality only</p>
              <p>• <strong>No Tracking Cookies:</strong> We do not use advertising or tracking cookies</p>
              <p>• <strong>Local Storage:</strong> Temporary data for 3D rendering and user preferences</p>
              <p>• <strong>Session Storage:</strong> Cleared when you close your browser</p>
            </div>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Changes to This Privacy Policy</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
              <p>For significant changes, we will provide notice on our main website.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-green-900 mb-2">Privacy Questions?</h3>
              <p className="text-green-800 mb-3 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <a 
                href="mailto:florcastteam@gmail.com" 
                className="text-green-600 font-semibold hover:text-green-700 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                florcastteam@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to FlorCast
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
              © 2025 FlorCast Team. Committed to privacy and open science.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;