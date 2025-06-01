import { useTranslation, Trans } from "react-i18next";

export function ExperienceSection() {
    const { t } = useTranslation();
    const experience = t("home.experience.items", { returnObjects: true }) as any[];

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("home.experience.title")}</h2>
            {experience.map((item: any, index: number) => (
                <div key={index} className="mb-6">
                    <div className="font-bold text-gray-900">
                        <Trans 
                            i18nKey={`home.experience.items.${index}.position`}
                            components={{ strong: <span className="font-bold" /> }}
                        />
                        {" – "}
                        {item.company}
                    </div>
                    <p className="text-sm text-gray-600">{item.location} | {item.period}</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                        {item.responsibilities.map((_: any, i: number) => (
                            <li key={i}>
                                <Trans
                                    i18nKey={`home.experience.items.${index}.responsibilities.${i}`}
                                    components={{
                                        link1: <a href="https://github.com/cloudquery/cloudquery" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer" />,
                                        link2: <a href="https://arangodb.com" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer" />,
                                        strong: <span className="font-semibold text-gray-900" />
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
}