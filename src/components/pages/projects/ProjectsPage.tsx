import { useTranslation, Trans } from "react-i18next";

export function ProjectsPage() {
    const { t } = useTranslation();
    const projects = t("home.projects.items", { returnObjects: true });

    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{t("home.projects.title")}</h1>
                <p className="text-gray-600 text-lg">{t("home.projects.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project: any, index: number) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                            {project.name}
                        </h3>
                        <div className="text-gray-600 leading-relaxed">
                            <Trans 
                                i18nKey={`home.projects.items.${index}.description`}
                                components={{ strong: <span className="font-semibold text-gray-800" /> }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
