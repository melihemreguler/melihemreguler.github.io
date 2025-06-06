import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Box, Paper, Typography, Button, Stack } from '@mui/material';

export const NotFoundPage = () => {
    const { t, ready } = useTranslation();
    
    // Show loading state while i18n is initializing
    if (!ready) {
        return (
            <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={(theme) => theme.palette.background.default}>
                <Stack alignItems="center" spacing={2}>
                    <Box sx={{ width: 48, height: 48, border: 3, borderColor: 'primary.main', borderRadius: '50%', borderBottom: '3px solid transparent', animation: 'spin 1s linear infinite' }} />
                    <Typography color="text.secondary">Loading...</Typography>
                </Stack>
            </Box>
        );
    }

    return (
        <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor={(theme) => theme.palette.background.default} px={2}>
            <Paper elevation={3} sx={{ p: { xs: 3, sm: 6 }, maxWidth: 480, width: '100%', textAlign: 'center', borderRadius: 4, bgcolor: 'background.paper' }}>
                <Typography variant="h2" fontWeight={800} color="primary.main" mb={1}>
                    404
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary" mb={2}>
                    {t('home.notFound.title')}
                </Typography>
                <Box sx={{ width: 80, height: 6, bgcolor: 'primary.main', mx: 'auto', borderRadius: 3, mb: 3 }} />
                <Typography variant="body1" color="text.secondary" mb={4}>
                    {t('home.notFound.description')}
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ px: 5, py: 2, fontWeight: 600, fontSize: 18, mb: 4, boxShadow: 2 }}
                >
                    {t('home.notFound.homeButton')}
                </Button>
                <Typography variant="body2" color="text.secondary" mt={6}>
                    {t('home.notFound.suggestion')}
                </Typography>
            </Paper>
        </Box>
    );
};
