import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProfileHeader } from "./components/pages/home/ProfileHeader";
import { AboutSection } from "./components/pages/home/AboutSection";
import { TabsSection } from "./components/pages/home/TabsSection";
import { ContactSection } from "./components/pages/home/ContactSection";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { Box, Container, Typography, IconButton, Link as MuiLink, Stack, Paper, Button, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState, useMemo } from 'react';

// Layout component for main pages
const MainLayout = () => (
    <Box minHeight="100vh" bgcolor={(theme) => theme.palette.background.default} display="flex" flexDirection="column">
        <Container maxWidth="md" sx={{ flex: 1, py: 8, bgcolor: 'transparent' }}>
            <ProfileHeader />
            <AboutSection />
            <TabsSection />
            <ContactSection />
        </Container>
        <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderTop: 1, borderColor: 'divider', mt: 8, bgcolor: 'background.paper' }} component="footer">
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} maxWidth="md" mx="auto">
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Melih Emre Güler. All rights reserved.
                </Typography>
                <Stack direction="row" spacing={1}>
                    <IconButton component={MuiLink} href="mailto:guler@melihemre.dev" color="primary" aria-label="Email">
                        <EmailIcon />
                    </IconButton>
                    <IconButton component={MuiLink} href="https://linkedin.com/in/melihemreguler" target="_blank" rel="noopener noreferrer" color="primary" aria-label="LinkedIn">
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton component={MuiLink} href="https://github.com/melihemreguler" target="_blank" rel="noopener noreferrer" color="primary" aria-label="GitHub">
                        <GitHubIcon />
                    </IconButton>
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
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
