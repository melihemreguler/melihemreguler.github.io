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
                            <RichText
                                i18nKey={`home.community.items.${index}.role`}
                                links={{
                                    gdscDuzceLink: { href: "https://www.linkedin.com/company/google-developer-student-clubs-duzce-university/" },
                                    gdgDuzceLink: { href: "https://www.linkedin.com/in/gdgduzce/" }
                                }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{item.duration}</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {item.activities.map((_: any, activityIndex: number) => (
                                <li key={activityIndex}>
                                    <RichText
                                        i18nKey={`home.community.items.${index}.activities.${activityIndex}`}
                                        links={{
                                            gdscGithubLink: { href: "https://github.com/gdscduzceuniversity" },
                                            gitWorkshopLink: { href: "https://www.linkedin.com/posts/google-developer-student-clubs-duzce-university_git-github-gdsc-activity-7162423821407399936-1Vba?utm_source=share&utm_medium=member_desktop&rcm=ACoAACy-TDIBCtGt5J1Napgn6CxxIo8_3gDaJgo" },
                                            conferenceLink: { href: "https://www.youtube.com/live/IskqzVywXxs?si=dwkxozOmoC7oABAf" },
                                            festivalLink: { href: "https://www.instagram.com/p/CzlyjcAt6R6/?img_index=1&igsh=aGJheDRnZ2hoYjR5" }
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
