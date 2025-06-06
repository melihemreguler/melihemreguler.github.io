import { useTranslation } from "react-i18next";
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';

interface SkillsSectionProps {
    isEmbedded?: boolean;
}

export function SkillsSection({ isEmbedded = false }: SkillsSectionProps) {
    const { t } = useTranslation();
    const skillsData = t("home.skills.categories", { returnObjects: true }) as any[];

    const getTechUrl = (techName: string) => {
        const techUrls: { [key: string]: string } = {
            'Java': 'https://www.oracle.com/java/',
            'Golang': 'https://golang.org/',
            'Spring Boot': 'https://spring.io/projects/spring-boot',
            'PostgreSQL': 'https://www.postgresql.org/',
            'MongoDB': 'https://www.mongodb.com/',
            'Redis': 'https://redis.io/',
            'ArangoDB': 'https://arangodb.com/',
            'Maven': 'https://maven.apache.org/',
            'Kafka': 'https://kafka.apache.org/',
            'RabbitMQ': 'https://www.rabbitmq.com/',
            'gRPC': 'https://grpc.io/',
            'JUnit': 'https://junit.org/',
            'Docker': 'https://www.docker.com/',
            'Docker Compose': 'https://docs.docker.com/compose/',
            'Kubernetes': 'https://kubernetes.io/',
            'Minikube': 'https://minikube.sigs.k8s.io/',
            'Skaffold': 'https://skaffold.dev/',
            'AWS': 'https://aws.amazon.com/',
            'ECS': 'https://aws.amazon.com/ecs/',
            'EKS': 'https://aws.amazon.com/eks/',
            'RDS': 'https://aws.amazon.com/rds/',
            'ECR': 'https://aws.amazon.com/ecr/',
            'Clean Code': 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
            'Temiz Kod': 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882', // Turkish version
            'Git': 'https://git-scm.com/',
            'GitHub Actions': 'https://github.com/features/actions',
            'CI/CD': 'https://en.wikipedia.org/wiki/CI/CD',
            'Swagger': 'https://swagger.io/'
        };
        return techUrls[techName.trim()] || `https://www.google.com/search?q=${encodeURIComponent(techName.trim() + ' programming technology')}`;
    };

    const parseSkills = (skillsText: string) => {
        return skillsText
            .split(',')
            .map(skill => skill.replace('.', '').trim())
            .filter(skill => skill.length > 0);
    };

    return (
        <section className="mb-8">
            {!isEmbedded && (
                <h2 className="text-xl font-semibold mb-4">{t("home.skills.title")}</h2>
            )}
            <Stack spacing={3}>
                {skillsData.map((category: any, index: number) => (
                    <Card key={index} elevation={3} sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} color="primary.main" mb={2}>
                                {category.name}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {parseSkills(category.items).map((skill: string, skillIndex: number) => (
                                    <Chip
                                        key={skillIndex}
                                        label={skill}
                                        component="a"
                                        href={getTechUrl(skill)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        clickable
                                        sx={{
                                            mb: 1,
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'primary.dark' : '#e0e7ff',
                                            color: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : '#0c4a6e',
                                            border: (theme) => theme.palette.mode === 'dark' ? '1px solid #374151' : '1px solid #bae6fd',
                                            fontWeight: 500,
                                            fontSize: 13,
                                            '&:hover': {
                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'primary.main' : '#bae6fd',
                                                color: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.main,
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </section>
    );
}