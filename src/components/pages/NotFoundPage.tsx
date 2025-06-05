import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    const { t, ready, i18n } = useTranslation();
    
    // Show loading state while i18n is initializing
    if (!ready) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "tr" : "en");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6 relative"
        >
            {/* Language Toggle Button */}
            <div 
                className="fixed top-4 right-4 z-50" 
                style={{ 
                    position: 'fixed', 
                    top: '1rem', 
                    right: '1rem', 
                    zIndex: 50 
                }}
            >
                <button
                    onClick={toggleLanguage}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-xs font-medium px-3 py-1 border border-blue-200 rounded-full hover:bg-blue-50 bg-white shadow-sm"
                >
                    {i18n.language === "en" ? "🇹🇷 Türkçe" : "🇺🇸 English"}
                </button>
            </div>

            <div className="text-center max-w-lg">
                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        <span className="text-blue-600">404</span> - {t('home.notFound.title')}
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600">
                        {t('home.notFound.description')}
                    </p>
                </div>

                {/* Navigation Options */}
                <div className=""> 
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg mb-6"
                    >
                        <svg 
                            className="w-6 h-6 mr-3 flex-shrink-0" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {t('home.notFound.homeButton')}
                    </Link>
                    
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-sm text-gray-500">
                    <p>
                        {t('home.notFound.suggestion')}
                    </p>
                </div>
            </div>
        </div>
    );
};
