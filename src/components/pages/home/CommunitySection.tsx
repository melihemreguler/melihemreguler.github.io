import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";
import { Card, CardContent, Typography, Stack } from '@mui/material';

interface CommunitySectionProps {
    isEmbedded?: boolean;
}

export function CommunitySection({ isEmbedded = false }: CommunitySectionProps) {
    const { t } = useTranslation();
    const communityItems = t("home.community.items", { returnObjects: true }) as any[];

    if (!communityItems || communityItems.length === 0) {
        return null;
    }

    return (
        <section className="mb-8">
            {!isEmbedded && (
                <h2 className="text-xl font-semibold mb-4">{t("home.community.title")}</h2>
            )}
            <Stack spacing={3}>
                {communityItems.map((item: any, index: number) => (
                    <Card key={index} elevation={3} sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} color="primary.main" mb={1}>
                                <RichText
                                    i18nKey={`home.community.items.${index}.role`}
                                    links={{
                                        gdscDuzceLink: { href: "https://www.linkedin.com/company/google-developer-student-clubs-duzce-university/" },
                                        gdgDuzceLink: { href: "https://www.linkedin.com/in/gdgduzce/" }
                                    }}
                                />
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                {item.duration}
                            </Typography>
                            <Stack component="ul" spacing={1} pl={2} mb={0}>
                                {item.activities.map((_: any, activityIndex: number) => (
                                    <li key={activityIndex} style={{ color: 'inherit' }}>
                                        <RichText
                                            i18nKey={`home.community.items.${index}.activities.${activityIndex}`}
                                            links={{
                                                gdscGithubLink: { href: "https://github.com/gdscduzceuniversity" },
                                                gitWorkshopLink: { href: "https://www.linkedin.com/posts/google-developer-student-clubs-duzce-university_git-github-gdsc-activity-7162423821407399936-1Vba?utm_source=share&utm_medium=member_desktop&rcm=ACoAACy-TDIBCtGt5J1Napgn6CxxIo8_3gDaJgo" },
                                                conferenceLink: { href: "https://www.youtube.com/live/IskqzVywXxs?si=dwkxozOmoC7oABAf" },
                                                festivalLink: { href: "https://www.instagram.com/p/CzlyjcAt6R6/?img_index=1&igsh=aGJheDRnZ2hoYjR5" }
                                            }}
                                        />
                                    </li>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </section>
    );
}
