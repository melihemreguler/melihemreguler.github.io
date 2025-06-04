import { useTranslation } from "react-i18next";

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
            <div className="space-y-4">
                {skillsData.map((category: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">{category.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            {parseSkills(category.items).map((skill: string, skillIndex: number) => (
                                <a
                                    key={skillIndex}
                                    href={getTechUrl(skill)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-block',
                                        backgroundColor: '#f0f9ff',
                                        color: '#0c4a6e',
                                        padding: '4px 10px',
                                        borderRadius: '14px',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        border: '1px solid #bae6fd',
                                        marginRight: '4px',
                                        marginBottom: '4px',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#bae6fd';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f0f9ff';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    {skill}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}