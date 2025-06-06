import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";
import { Card, CardContent, Typography, Stack } from '@mui/material';

interface EducationSectionProps {
    isEmbedded?: boolean;
}

export function EducationSection({ isEmbedded = false }: EducationSectionProps) {
    const { t } = useTranslation();
    const educationItems = t("home.education.items", { returnObjects: true }) as any[];

    return (
        <section className="mb-8">
            {!isEmbedded && (
                <h2 className="text-xl font-semibold mb-4">{t("home.education.title")}</h2>
            )}
            <Stack spacing={3}>
                {educationItems.map((item: any, index: number) => (
                    <Card key={index} elevation={3} sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} color="primary.main" mb={1}>
                                <RichText i18nKey={`home.education.items.${index}.degree`} /> – {item.school}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: 16 }}>
                                {item.year}
                            </Typography>
                            {item.note && (
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                                    {item.note}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </section>
    );
}