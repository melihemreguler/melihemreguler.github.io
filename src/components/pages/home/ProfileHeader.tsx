// src/components/sections/ProfileHeader.tsx
import { Trans } from "react-i18next";

export function ProfileHeader() {
    return (
        <section className="text-center mb-16">
            <div className="flex justify-center mb-6">
                <div 
                    className="relative rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                    style={{ 
                        borderRadius: '50%',
                        width: '128px',
                        height: '128px',
                        maxWidth: '128px',
                        maxHeight: '128px',
                        minWidth: '128px',
                        minHeight: '128px'
                    }}
                >
                    <img 
                        src="/profile-photo.jpg" 
                        alt="Melih Emre Güler" 
                        className="transition-transform duration-300 hover:scale-110"
                        style={{ 
                            width: '128px', 
                            height: '128px', 
                            borderRadius: '50%',
                            clipPath: 'circle(50% at 50% 50%)',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-blue-300 ring-opacity-50" style={{ borderRadius: '50%' }}></div>
                </div>
            </div>
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
