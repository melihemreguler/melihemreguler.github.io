import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";

export function ExperienceSection() {
    const { t } = useTranslation();
    const experience = t("home.experience.items", { returnObjects: true }) as any[];

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("home.experience.title")}</h2>
            {experience.map((item: any, index: number) => (
                <div key={index} className="mb-6">
                    <div className="font-bold text-gray-900">
                        <RichText
                            i18nKey={`home.experience.items.${index}.position`}
                        />
                        {" – "}
                        {item.company}
                    </div>
                    <p className="text-sm text-gray-600">{item.location} | {item.period}</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                        {item.responsibilities.map((_: any, i: number) => (
                            <li key={i}>
                                <RichText
                                    i18nKey={`home.experience.items.${index}.responsibilities.${i}`}
                                    links={{
                                        link1: { href: "https://github.com/cloudquery/cloudquery" },
                                        link2: { href: "https://arangodb.com" }
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