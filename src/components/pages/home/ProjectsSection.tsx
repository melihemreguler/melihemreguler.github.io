import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";
import { Card, CardContent, Typography, Stack, Chip, Button as MuiButton } from '@mui/material';

interface ProjectsSectionProps {
    isEmbedded?: boolean;
}

export function ProjectsSection({ isEmbedded = false }: ProjectsSectionProps) {
    const { t } = useTranslation();
    const projects = t("home.projects.items", { returnObjects: true }) as any[];

    const content = (
        <>
            {!isEmbedded && (
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">{t("home.projects.title")}</h1>
                    <p className="text-gray-600 text-lg">{t("home.projects.description")}</p>
                </div>
            )}
            <Stack spacing={3}>
                {projects.map((project: any, index: number) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </Stack>
        </>
    );

    return isEmbedded ? (
        <div className="space-y-6">
            {content}
        </div>
    ) : (
        <main className="max-w-4xl mx-auto px-6 py-10">
            {content}
        </main>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const { t } = useTranslation();
    const getTechUrl = (techName: string) => {
        const techUrls: { [key: string]: string } = {
            'Java': 'https://www.oracle.com/java/',
            'Spring Boot': 'https://spring.io/projects/spring-boot',
            'Spring Framework': 'https://spring.io/projects/spring-framework',
            'MongoDB': 'https://www.mongodb.com/',
            'PostgreSQL': 'https://www.postgresql.org/',
            'JUnit': 'https://junit.org/',
            'JUnit 5': 'https://junit.org/junit5/',
            'Swagger': 'https://swagger.io/',
            'MVC': 'https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller',
            'Hibernate': 'https://hibernate.org/',
            'Maven': 'https://maven.apache.org/',
            'Golang': 'https://golang.org/',
            'Go': 'https://golang.org/',
            'Fiber': 'https://gofiber.io/',
            'Gin': 'https://gin-gonic.com/',
            'AWS': 'https://aws.amazon.com/',
            'Docker': 'https://www.docker.com/',
            'CI/CD': 'https://en.wikipedia.org/wiki/CI/CD',
            'Authentication': 'https://en.wikipedia.org/wiki/Authentication',
            'REST API': 'https://en.wikipedia.org/wiki/Representational_state_transfer',
            'Redis': 'https://redis.io/',
            'RabbitMQ': 'https://www.rabbitmq.com/',
            'React': 'https://reactjs.org/',
            'TypeScript': 'https://www.typescriptlang.org/',
            'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
            'Tailwind CSS': 'https://tailwindcss.com/',
            'Node.js': 'https://nodejs.org/',
            'Express': 'https://expressjs.com/',
            'Vue.js': 'https://vuejs.org/',
            'Angular': 'https://angular.io/',
            'Python': 'https://www.python.org/',
            'Django': 'https://www.djangoproject.com/',
            'Flask': 'https://flask.palletsprojects.com/',
            'MySQL': 'https://www.mysql.com/',
            'SQLite': 'https://www.sqlite.org/',
            'GraphQL': 'https://graphql.org/',
            'Kubernetes': 'https://kubernetes.io/',
            'Git': 'https://git-scm.com/',
            'GitHub': 'https://github.com/',
            'Vite': 'https://vitejs.dev/',
            'Webpack': 'https://webpack.js.org/',
            'Babel': 'https://babeljs.io/',
            'ESLint': 'https://eslint.org/',
            'Prettier': 'https://prettier.io/',
            'Jest': 'https://jestjs.io/',
            'Cypress': 'https://www.cypress.io/',
            'Selenium': 'https://selenium.dev/',
            'NGINX': 'https://nginx.org/',
            'Apache': 'https://httpd.apache.org/',
            'Linux': 'https://www.linux.org/',
            'Ubuntu': 'https://ubuntu.com/',
            'CentOS': 'https://www.centos.org/',
            'Debian': 'https://www.debian.org/',
            'Clean Code': 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
            'ECS': 'https://aws.amazon.com/ecs/',
            'EKS': 'https://aws.amazon.com/eks/',
            'RDS': 'https://aws.amazon.com/rds/',
            'ECR': 'https://aws.amazon.com/ecr/'
        };
        return techUrls[techName] || `https://www.google.com/search?q=${encodeURIComponent(techName + ' programming technology')}`;
    };
    return (
        <Card elevation={3} sx={{ bgcolor: 'background.paper', borderRadius: 4, mb: 4 }}>
            <CardContent>
                <Typography variant="h6" fontWeight={700} color="primary.main" mb={1}>
                    <RichText 
                        i18nKey={`home.projects.items.${index}.name`} 
                        links={{
                            urlShortenerLink: { href: project.github },
                            captchaSystemLink: { href: project.github },
                            wasteManagementLink: { href: project.github },
                            noteAppLink: { href: project.github },
                            todoAppLink: { href: project.github },
                            cityTrafficLink: { href: project.github },
                        }}
                    />
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                    <RichText i18nKey={`home.projects.items.${index}.description`} />
                </Typography>
                {project.technologies && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                        {project.technologies.map((tech: string, i: number) => (
                            <Chip
                                key={i}
                                label={tech}
                                component="a"
                                href={getTechUrl(tech)}
                                target="_blank"
                                rel="noopener noreferrer"
                                clickable
                                sx={{
                                    mb: 1,
                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'primary.dark' : '#e0e7ff',
                                    color: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : '#3730a3',
                                    border: (theme) => theme.palette.mode === 'dark' ? '1px solid #374151' : '1px solid #c7d2fe',
                                    fontWeight: 500,
                                    fontSize: 13,
                                    '&:hover': {
                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'primary.main' : '#c7d2fe',
                                        color: (theme) => theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.main,
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                )}
                {project.demo && (
                    <MuiButton
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mt: 1 }}
                    >
                        Demo
                    </MuiButton>
                )}
            </CardContent>
        </Card>
    );
}
