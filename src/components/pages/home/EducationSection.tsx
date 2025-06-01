import { useTranslation, Trans } from "react-i18next";

export function EducationSection() {
    const { t } = useTranslation();
    const educationItems = t("home.education.items", { returnObjects: true }) as any[];

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("home.education.title")}</h2>
            <ul className="space-y-4">
                {educationItems.map((item: any, index: number) => (
                    <li key={index} className="text-gray-700">
                        <div className="font-semibold">
                            <Trans 
                                i18nKey={`home.education.items.${index}.degree`}
                                components={{ strong: <span className="font-bold text-gray-900" /> }}
                            />
                            {" – "}
                            {item.school}
                        </div>
                        <p className="text-sm text-gray-600">{item.year}</p>
                        {item.note && (
                            <p className="text-sm text-gray-500">{item.note}</p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}