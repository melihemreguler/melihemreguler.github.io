import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProfileHeader } from "./components/pages/home/ProfileHeader";
import { AboutSection } from "./components/pages/home/AboutSection";
import { TabsSection } from "./components/pages/home/TabsSection";
import { ContactSection } from "./components/pages/home/ContactSection";
import { ProjectsPage } from "./components/pages/projects/ProjectsPage";

function App() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "tr" : "en");
    };

    return (
        <Router>
            <div className="min-h-screen bg-white text-gray-900 font-sans">
                {/* Language Toggle Button - Fixed to top right */}
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

                <Routes>
                    <Route path="/" element={
                        <main className="max-w-3xl mx-auto px-6 py-10">
                            <ProfileHeader />
                            <AboutSection />
                            <TabsSection />
                            <ContactSection />
                        </main>
                    } />
                    <Route path="/projects" element={<ProjectsPage />} />
                </Routes>

                <footer className="p-6 text-center text-sm text-gray-500 border-t border-gray-100 mt-16 bg-gray-50">
                    <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© {new Date().getFullYear()} Melih Emre Güler. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="mailto:guler@melihemre.dev" className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center">
                                <svg 
                                    className="w-4 h-4 mr-1.5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </a>
                            <a href="https://linkedin.com/in/melihemreguler" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center">
                                <svg 
                                    className="w-4 h-4 mr-1.5" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                LinkedIn
                            </a>
                            <a href="https://github.com/melihemreguler" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center">
                                <svg 
                                    className="w-4 h-4 mr-1.5" 
                                    fill="currentColor" 
                                    viewBox="0 0 16 16"
                                    width="16"
                                    height="16"
                                >
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                GitHub
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
