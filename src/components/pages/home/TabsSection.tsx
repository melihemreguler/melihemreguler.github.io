import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExperienceSection } from './ExperienceSection';
import { SkillsSection } from './SkillsSection';
import { CommunitySection } from './CommunitySection';
import { EducationSection } from './EducationSection';
import { ProjectsPage } from '../projects/ProjectsPage';

type TabType = 'experience' | 'skills' | 'education' | 'community' | 'projects';

interface TabItem {
    id: TabType;
    labelKey: string;
}

export function TabsSection() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<TabType>('experience');

    const tabs: TabItem[] = [
        {
            id: 'experience',
            labelKey: 'home.experience.title'
        },
        {
            id: 'skills',
            labelKey: 'home.skills.title'
        },
        {
            id: 'projects',
            labelKey: 'home.projects.title'
        },
        {
            id: 'education',
            labelKey: 'home.education.title'
        },
        {
            id: 'community',
            labelKey: 'home.community.title'
        }
    ];

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'experience':
                return <ExperienceSection isEmbedded={true} />;
            case 'skills':
                return <SkillsSection isEmbedded={true} />;
            case 'education':
                return <EducationSection isEmbedded={true} />;
            case 'community':
                return <CommunitySection isEmbedded={true} />;
            case 'projects':
                return <ProjectsPage isEmbedded={true} />;
            default:
                return <ExperienceSection isEmbedded={true} />;
        }
    };

    return (
        <section className="mb-8">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {t(tab.labelKey)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {renderActiveTabContent()}
            </div>
        </section>
    );
}
