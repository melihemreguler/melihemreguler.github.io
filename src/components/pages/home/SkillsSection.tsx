import { useTranslation } from "react-i18next";

interface SkillsSectionProps {
    isEmbedded?: boolean;
}

export function SkillsSection({ isEmbedded = false }: SkillsSectionProps) {
    const { t } = useTranslation();
    const skillsData = t("home.skills.categories", { returnObjects: true }) as any[];

    return (
        <section className="mb-8">
            {!isEmbedded && (
                <h2 className="text-xl font-semibold mb-4">{t("home.skills.title")}</h2>
            )}
            <div className="space-y-4">
                {skillsData.map((category: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                        <p className="text-gray-700 text-sm">{category.items}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}