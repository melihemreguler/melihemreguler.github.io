// src/components/sections/ProfileHeader.tsx
import { RichText } from "../../common/RichText";
import { ClickableProfilePhoto } from "../../common/ClickableProfilePhoto";
import { Typography, Stack } from '@mui/material';

export function ProfileHeader() {
    return (
        <Stack alignItems="center" spacing={3} mb={8}>
            <ClickableProfilePhoto />
            <Typography variant="h4" fontWeight={700} color="primary.main" align="center">
                <RichText i18nKey="home.greeting" strongClassName="text-blue-600 font-bold" />
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center" maxWidth={500}>
                <RichText i18nKey="home.tagline" strongClassName="font-semibold text-gray-800" />
            </Typography>
        </Stack>
    );
}
