"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Globe, Calendar, Shield, FileText, Users, AlertCircle } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <FileText className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms and Conditions of Use
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Effective Date: October 5, 2025</span>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="font-semibold text-green-600">florcast.earth (FLORCAST)</span>. 
            This site was developed as part of the <span className="font-semibold">NASA Space Apps Challenge</span>, 
            an international hackathon focused on addressing challenges related to Earth and space science.
          </p>
        </div>

        {/* Introduction Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
              <p className="text-blue-800 leading-relaxed">
                The purpose of this page is to display and visualize flowering events using open data, 
                with educational and scientific dissemination purposes. Please read these Terms and 
                Conditions carefully before using this site. By accessing or using the Site, you agree 
                to be bound by these terms.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Section 1 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Use of the Site</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• The use of this site is free of charge and intended exclusively for educational, scientific, and outreach purposes.</p>
              <p>• Commercial or unlawful use of the site is not permitted.</p>
              <p>• You agree to use the information provided in an ethical and responsible manner.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. Intellectual Property</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• The content, design, graphics, visualizations, and source code of the site belong to its developers, unless otherwise stated.</p>
              <p>• The data used come from public or open sources, including datasets provided by NASA or other scientific agencies. Proper attribution rights are respected.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. Accuracy of Data</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• This site uses open data that may be subject to errors, omissions, or updates.</p>
              <p>• While reasonable efforts are made to present accurate information, we do not guarantee the accuracy, completeness, or timeliness of the data displayed.</p>
              <p>• The information presented should not be used as an official reference for scientific research or for making critical decisions.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Disclaimer of Liability</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• This site is provided &ldquo;as is,&rdquo; without warranties of any kind, express or implied.</p>
              <p>• The developers of the site shall not be held liable for any damages arising from the use or inability to use the site, or from reliance on the information provided.</p>
              <p>• Participation in the NASA Space Apps Challenge does not imply official endorsement by NASA or any other organization.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. External Links</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• This site may contain links to other websites not under our control. We are not responsible for the content or privacy policies of such sites.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">6. Changes to the Terms and Conditions</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>• We reserve the right to modify these Terms and Conditions at any time. Changes will become effective immediately upon publication on the site.</p>
              <p>• We encourage you to review this page periodically.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">7. Contact Information</h2>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>If you have questions or comments about these Terms and Conditions, you may contact us at:</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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
        </div>

        {/* Legal Notice */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Legal Notice</h3>
              <p className="text-blue-800 leading-relaxed">
                This project was developed as part of the <span className="font-semibold">NASA Space Apps Challenge</span>. 
                It is not officially affiliated with or endorsed by NASA.
              </p>
            </div>
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
              href="/privacy" 
              className="text-gray-600 hover:text-gray-800 transition-colors px-4 py-2"
            >
              Privacy Policy
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              © 2025 FlorCast Team. Developed for NASA Space Apps Challenge 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;