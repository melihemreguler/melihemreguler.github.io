import { useTranslation } from "react-i18next";
import { RichText } from "../../common/RichText";

interface CommunitySectionProps {
    isEmbedded?: boolean;
}

export function CommunitySection({ isEmbedded = false }: CommunitySectionProps) {
    const { t } = useTranslation();
    const communityItems = t("home.community.items", { returnObjects: true }) as any[];

    if (!communityItems || communityItems.length === 0) {
        return null;
    }

    return (
        <section className="mb-8">
            {!isEmbedded && (
                <h2 className="text-xl font-semibold mb-4">{t("home.community.title")}</h2>
            )}
            <div className="space-y-6">
                {communityItems.map((item: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="font-semibold text-gray-900 mb-1">
                            {item.role}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{item.duration}</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {item.activities.map((_: any, activityIndex: number) => (
                                <li key={activityIndex}>
                                    <RichText
                                        i18nKey={`home.community.items.${index}.activities.${activityIndex}`}
                                        links={{
                                            link1: { href: "https://gdsc.community.dev/duzce-university/" },
                                            link2: { href: "#workshop-details" },
                                            link3: { href: "https://youtube.com/watch?v=example" },
                                            link4: { href: "#event-photos" }
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
