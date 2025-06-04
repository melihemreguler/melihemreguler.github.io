import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";

interface ProjectsPageProps {
    isEmbedded?: boolean;
}

export function ProjectsPage({ isEmbedded = false }: ProjectsPageProps) {
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project: any, index: number) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                            <RichText 
                                i18nKey={`home.projects.items.${index}.name`}
                                links={{
                                    urlShortenerLink: { href: project.github, className: "text-gray-900 hover:text-blue-600 transition-colors no-underline" },
                                    captchaSystemLink: { href: project.github, className: "text-gray-900 hover:text-blue-600 transition-colors no-underline" },
                                    wasteManagementLink: { href: project.github, className: "text-gray-900 hover:text-blue-600 transition-colors no-underline" },
                                    noteAppLink: { href: project.github, className: "text-gray-900 hover:text-blue-600 transition-colors no-underline" },
                                    todoAppLink: { href: project.github, className: "text-gray-900 hover:text-blue-600 transition-colors no-underline" },
                                    cityTrafficLink: { href: project.github, className: "text-gray-900 hover:text-blue-600 transition-colors no-underline" }
                                }}
                            />
                        </h3>
                        <div className="text-gray-600 leading-relaxed mb-4">
                            <RichText 
                                i18nKey={`home.projects.items.${index}.description`}
                            />
                        </div>
                        
                        {/* Technology tags - Clickable Version */}
                        <div className="mb-4">
                            {project.technologies && (
                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-2">Technologies:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech: string, index: number) => {
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
                                                <a
                                                    key={index}
                                                    href={getTechUrl(tech)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        display: 'inline-block',
                                                        backgroundColor: '#e0e7ff',
                                                        color: '#3730a3',
                                                        padding: '4px 8px',
                                                        borderRadius: '12px',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        border: '1px solid #c7d2fe',
                                                        marginRight: '4px',
                                                        marginBottom: '4px',
                                                        textDecoration: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#c7d2fe';
                                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#e0e7ff';
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    {tech}
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Demo button only if demo exists */}
                        {project.demo && (
                            <div className="flex gap-3 mt-4">
                                <a 
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                                >
                                    <svg 
                                        className="w-4 h-4 mr-1.5" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                        width="16"
                                        height="16"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Demo
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
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
