import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";
import { Card, CardContent, Typography, Stack } from '@mui/material';

interface ExperienceSectionProps {
    isEmbedded?: boolean;
}

export function ExperienceSection({ isEmbedded = false }: ExperienceSectionProps) {
    const { t } = useTranslation();
    const experience = t("home.experience.items", { returnObjects: true }) as any[];

    return (
        <section className="mb-8">
            {!isEmbedded && (
                <h2 className="text-xl font-semibold mb-4">{t("home.experience.title")}</h2>
            )}
            <Stack spacing={3}>
                {experience.map((item: any, index: number) => (
                    <Card key={index} elevation={3} sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} color="primary.main" mb={1}>
                                <RichText i18nKey={`home.experience.items.${index}.position`} /> – <RichText i18nKey={`home.experience.items.${index}.company`} />
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                {item.location} | {item.period}{item.workType && ` | ${item.workType}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                <RichText
                                    i18nKey={`home.experience.items.${index}.companyDescription`}
                                    links={{ primodLink: { href: "https://app.primod.io/" } }}
                                />
                            </Typography>
                            <Stack component="ul" spacing={1} pl={2} mb={0}>
                                {item.responsibilities.map((_: any, i: number) => (
                                    <li key={i} style={{ color: 'inherit' }}>
                                        <RichText
                                            i18nKey={`home.experience.items.${index}.responsibilities.${i}`}
                                            links={{
                                                cloudqueryLink: { href: "https://github.com/MelihEmreGuler/cloudquery/tree/arangodb/plugins/destination/arangodb/client" },
                                                cloudqueryMainLink: { href: "https://github.com/cloudquery/cloudquery" },
                                                arangodbLink: { href: "https://arangodb.com/" }
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