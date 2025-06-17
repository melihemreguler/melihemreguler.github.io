import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Container, Typography, IconButton, Link as MuiLink, Stack, Paper, Button, ThemeProvider, createTheme, CssBaseline, CircularProgress } from '@mui/material';
import { useState, useMemo, lazy, Suspense } from 'react';

// Lazy load icons - defer until footer loads
const EmailIcon = lazy(() => import('@mui/icons-material/Email'));
const LinkedInIcon = lazy(() => import('@mui/icons-material/LinkedIn')); 
const GitHubIcon = lazy(() => import('@mui/icons-material/GitHub'));

// Lazy load components for better performance
const ProfileHeader = lazy(() => import("./components/pages/home/ProfileHeader").then(module => ({ default: module.ProfileHeader })));
const AboutSection = lazy(() => import("./components/pages/home/AboutSection").then(module => ({ default: module.AboutSection })));
const TabsSection = lazy(() => import("./components/pages/home/TabsSection").then(module => ({ default: module.TabsSection })));
const ContactSection = lazy(() => import("./components/pages/home/ContactSection").then(module => ({ default: module.ContactSection })));
const NotFoundPage = lazy(() => import("./components/pages/NotFoundPage").then(module => ({ default: module.NotFoundPage })));

// Loading component
const LoadingSpinner = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh">
        <CircularProgress size={40} />
    </Box>
);

// Layout component for main pages
const MainLayout = () => (
    <Box minHeight="100vh" bgcolor={(theme) => theme.palette.background.default} display="flex" flexDirection="column">
        <Container maxWidth="md" sx={{ flex: 1, py: 8, bgcolor: 'transparent' }}>
            <Suspense fallback={<LoadingSpinner />}>
                <ProfileHeader />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
                <AboutSection />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
                <TabsSection />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
                <ContactSection />
            </Suspense>
        </Container>
        <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderTop: 1, borderColor: 'divider', mt: 8, bgcolor: 'background.paper' }} component="footer">
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} maxWidth="md" mx="auto">
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Melih Emre Güler. All rights reserved.
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Suspense fallback={<CircularProgress size={20} />}>
                        <IconButton component={MuiLink} href="mailto:guler@melihemre.dev" color="primary" aria-label="Email">
                            <EmailIcon />
                        </IconButton>
                        <IconButton component={MuiLink} href="https://linkedin.com/in/melihemreguler" target="_blank" rel="noopener noreferrer" color="primary" aria-label="LinkedIn">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton component={MuiLink} href="https://github.com/melihemreguler" target="_blank" rel="noopener noreferrer" color="primary" aria-label="GitHub">
                            <GitHubIcon />
                        </IconButton>
                    </Suspense>
                </Stack>
            </Stack>
        </Paper>
    </Box>
);

function App() {
    const { i18n } = useTranslation();
    const [mode, setMode] = useState<'dark' | 'light'>('dark');
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'dark' ? '#90caf9' : '#1976d2',
            },
            background: {
                default: mode === 'dark' ? '#181a1b' : '#f9fafb',
                paper: mode === 'dark' ? '#23272f' : '#fff',
            },
        },
        shape: { borderRadius: 12 },
        typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' },
    }), [mode]);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "tr" : "en");
    };
    const toggleTheme = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                {/* Global Language & Theme Toggle Buttons */}
                <Box position="fixed" top={16} right={16} zIndex={1300} display="flex" flexDirection="column" gap={1}>
                    <Button
                        onClick={toggleLanguage}
                        variant="outlined"
                        color="primary"
                        size="small"
                    >
                        {i18n.language === "en" ? "🇹🇷 Türkçe" : "🇺🇸 English"}
                    </Button>
                    <Button
                        onClick={toggleTheme}
                        variant="outlined"
                        color="primary"
                        size="small"
                    >
                        {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
                    </Button>
                </Box>
                <Routes>
                    <Route path="/" element={<MainLayout />} />
                    <Route path="/experience" element={<MainLayout />} />
                    <Route path="/skills" element={<MainLayout />} />
                    <Route path="/education" element={<MainLayout />} />
                    <Route path="/community" element={<MainLayout />} />
                    <Route path="/projects" element={<MainLayout />} />
                    {/* Catch-all route for 404 */}
                    <Route path="*" element={
                        <Suspense fallback={<LoadingSpinner />}>
                            <NotFoundPage />
                        </Suspense>
                    } />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
