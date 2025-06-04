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
                        <div className="flex gap-3 mt-4">
                            {project.github && (
                                <a 
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    <svg 
                                        className="w-4 h-4 mr-1.5" 
                                        fill="currentColor" 
                                        viewBox="0 0 16 16"
                                        width="16"
                                        height="16"
                                    >
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
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
