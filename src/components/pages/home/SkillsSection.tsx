import { useTranslation } from "react-i18next";

interface SkillsSectionProps {
    isEmbedded?: boolean;
}

export function SkillsSection({ isEmbedded = false }: SkillsSectionProps) {
    const { t } = useTranslation();
    const skills = t("home.skills.items", { returnObjects: true }) as string[];

    return (
        <section className="mb-8">
            {!isEmbedded && (
                <h2 className="text-xl font-semibold mb-4">{t("home.skills.title")}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {skills.map((skill: string, index: number) => (
                    <div key={index} className="bg-gray-50 px-3 py-2 rounded-lg text-gray-700 text-sm">
                        {skill}
                    </div>
                ))}
            </div>
        </section>
    );
}