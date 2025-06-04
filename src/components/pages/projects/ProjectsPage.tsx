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
