
import React, { useState } from 'react';
import { TABS_CONTENT } from '../constants';

const tabKeys = ['description', 'faqs', 'template', 'whyUs'] as const;
type TabKey = typeof tabKeys[number];

const tabTitles: Record<TabKey, string> = {
  description: 'Description',
  faqs: 'FAQs',
  template: 'Template',
  whyUs: 'Why Us',
};

export const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('description');

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{TABS_CONTENT.description.title}</h3>
            <p className="text-gray-300 leading-relaxed">{TABS_CONTENT.description.content}</p>
          </div>
        );
      case 'faqs':
        return (
          <div className="space-y-6">
            {TABS_CONTENT.faqs.map((faq, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white text-lg">{faq.q}</h4>
                <p className="text-gray-400 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        );
      case 'template':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{TABS_CONTENT.template.title}</h3>
            <p className="text-gray-300 leading-relaxed">{TABS_CONTENT.template.content}</p>
            <a href={TABS_CONTENT.template.downloadLink} className="inline-block bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors">
              Download Template
            </a>
          </div>
        );
      case 'whyUs':
        return (
          <div className="space-y-4">
             <h3 className="text-2xl font-bold text-white">{TABS_CONTENT.whyUs.title}</h3>
             <ul className="list-disc list-inside space-y-2 text-gray-300">
                {TABS_CONTENT.whyUs.points.map((point, i) => <li key={i}>{point}</li>)}
             </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {tabKeys.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all`}
            >
              {tabTitles[tab]}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-8 text-gray-300">
        {renderContent()}
      </div>
    </div>
  );
};
