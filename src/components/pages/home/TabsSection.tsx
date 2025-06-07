import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExperienceSection } from './ExperienceSection';
import { SkillsSection } from './SkillsSection';
import { CommunitySection } from './CommunitySection';
import { EducationSection } from './EducationSection';
import { ProjectsSection } from './ProjectsSection';
import { Tabs, Tab, Box, Card } from '@mui/material';

type TabType = 'experience' | 'skills' | 'education' | 'community' | 'projects';

interface TabItem {
    id: TabType;
    labelKey: string;
}

export function TabsSection() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    // Get current tab from URL path
    const getCurrentTab = (): TabType => {
        const path = location.pathname;
        switch (path) {
            case '/':
                return 'experience'; // Default tab for home page
            case '/experience':
                return 'experience';
            case '/skills':
                return 'skills';
            case '/projects':
                return 'projects';
            case '/education':
                return 'education';
            case '/community':
                return 'community';
            default:
                return 'experience';
        }
    };

    const activeTab = getCurrentTab();

    const handleTabChange = (_: any, tabId: TabType) => {
        navigate(`/${tabId}`);
    };

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
                return <ProjectsSection isEmbedded={true} />;
            default:
                return <ExperienceSection isEmbedded={true} />;
        }
    };

    return (
        <Box mb={4}>
          {/* Tab Bar with fade overlays */}
          <Box sx={{
            position: 'relative',
            mb: 2,
            bgcolor: (theme) => theme.palette.background.paper,
            p: 0,
            borderRadius: 4,
            boxShadow: 3,
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '100vw',
            overflowX: 'auto',
            overflowY: 'visible',
          }}>
            {/* Left Fade */}
            <Box
              sx={{
                pointerEvents: 'none',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 32,
                zIndex: 1,
                background: (theme) =>
                  `linear-gradient(to right, ${theme.palette.background.paper} 60%, ${theme.palette.background.paper}00 100%)`,
                display: { xs: 'block', md: 'none' },
              }}
            />
            {/* Right Fade */}
            <Box
              sx={{
                pointerEvents: 'none',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 32,
                zIndex: 1,
                background: (theme) =>
                  `linear-gradient(to left, ${theme.palette.background.paper} 60%, ${theme.palette.background.paper}00 100%)`,
                display: { xs: 'block', md: 'none' },
              }}
            />
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons={true}
              TabIndicatorProps={{ style: { display: 'none' } }}
              sx={{ position: 'relative', zIndex: 2,
                // Scroll oklarını özelleştir
                '& .MuiTabs-scrollButtons': {
                  color: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                  background: 'transparent',
                  borderRadius: 2,
                  boxShadow: 'none',
                  '&:hover': {
                    background: (theme) => theme.palette.action.hover,
                  },
                },
                '& .Mui-disabled': {
                  color: (theme) => theme.palette.action.disabled,
                },
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  label={t(tab.labelKey)}
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    textTransform: 'none',
                    borderRadius: 0,
                    mx: 0.5,
                    px: 4,
                    py: 1.2,
                    minHeight: 48,
                    transition: 'all 0.2s',
                    bgcolor: 'transparent',
                    color: (theme) => activeTab === tab.id ? theme.palette.primary.main : theme.palette.text.primary,
                    borderBottom: (theme) => activeTab === tab.id ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                    boxShadow: 0,
                    outline: 'none',
                    border: 'none',
                    '&:focus': {
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none',
                    },
                    '&.Mui-selected': {
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none',
                    },
                    '&:hover': {
                        bgcolor: 'transparent',
                        color: (theme) => theme.palette.primary.main,
                        borderBottom: (theme) => `3px solid ${theme.palette.primary.light}`,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>
          {/* Tab Content */}
          <Card
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              boxShadow: 2,
              bgcolor: 'background.paper',
            }}
          >
            {renderActiveTabContent()}
          </Card>
        </Box>
      );
      
}
