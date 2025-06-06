import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";
import { Card, CardContent, Typography, Stack } from '@mui/material';

export function AboutSection() {
    const { t } = useTranslation();
    
    return (
        <Card elevation={3} sx={{ mb: 6, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5" fontWeight={700} color="primary.main">
                        {t("home.about.title")}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <RichText i18nKey="home.about.description" strongClassName="font-semibold text-gray-800" />
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
