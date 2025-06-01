// src/components/sections/ProfileHeader.tsx
import { Trans } from "react-i18next";

export function ProfileHeader() {
    return (
        <section className="text-center mb-16">
            <img 
                src="/profile-photo.jpg" 
                alt="Melih Emre Güler" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
            />
            <div className="text-3xl font-bold mb-4">
                <Trans 
                    i18nKey="home.greeting"
                    components={{ strong: <span className="text-blue-600" /> }}
                />
            </div>
            <div className="text-xl text-gray-600 max-w-2xl mx-auto">
                <Trans 
                    i18nKey="home.tagline"
                    components={{ strong: <span className="font-semibold text-gray-800" /> }}
                />
            </div>
        </section>
    );
}
