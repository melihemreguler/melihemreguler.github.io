import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";

export function AboutSection() {
    const { t } = useTranslation();
    
    return (
        <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{t("home.about.title")}</h2>
            <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                    <RichText 
                        i18nKey="home.about.description"
                        strongClassName="font-semibold text-gray-800"
                    />
                </p>
            </div>
        </section>
    );
}
