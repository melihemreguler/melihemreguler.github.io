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
                                    urlShortenerLink: { href: "https://github.com/MelihEmreGuler/urlshortener" },
                                    captchaSystemLink: { href: "https://github.com/ileri-java-proje/BM470" },
                                    wasteManagementLink: { href: "https://github.com/donus-turkiye/backend" },
                                    noteAppLink: { href: "https://github.com/MelihEmreGuler/go-user-notes-app" },
                                    todoAppLink: { href: "https://github.com/gdscduzceuniversity/todo-app-1" },
                                    cityTrafficLink: { href: "https://github.com/MelihEmreGuler/go-psql-redis-cities" }
                                }}
                            />
                        </h3>
                        <div className="text-gray-600 leading-relaxed mb-4">
                            <RichText 
                                i18nKey={`home.projects.items.${index}.description`}
                            />
                        </div>
                        
                        {/* Technology tags */}
                        {project.technologies && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech: string, techIndex: number) => (
                                    <span 
                                        key={techIndex}
                                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            {project.github && (
                                <a 
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                            {project.demo && (
                                <a 
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Demo
                                </a>
                            )}
                        </div>
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
