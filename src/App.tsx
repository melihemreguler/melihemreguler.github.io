import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProfileHeader } from "./components/pages/home/ProfileHeader";
import { AboutSection } from "./components/pages/home/AboutSection";
import { EducationSection } from "./components/pages/home/EducationSection";
import { ExperienceSection } from "./components/pages/home/ExperienceSection";
import { SkillsSection } from "./components/pages/home/SkillsSection";
import { CommunitySection } from "./components/pages/home/CommunitySection";
import { ProjectsPage } from "./components/pages/projects/ProjectsPage";

function App() {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "tr" : "en");
    };

    return (
        <Router>
            <div className="min-h-screen bg-white text-gray-900 font-sans">
                <nav className="flex justify-between items-center p-4 shadow-sm border-b border-gray-100">
                    <h1 className="text-xl font-bold text-gray-900">Melih Emre Güler</h1>
                    <ul className="flex gap-6 text-sm items-center">
                        <li>
                            <Link 
                                to="/" 
                                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                            >
                                {t("nav.home")}
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/projects" 
                                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                            >
                                {t("nav.projects")}
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={toggleLanguage}
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-xs font-medium px-3 py-1 border border-blue-200 rounded-full hover:bg-blue-50"
                            >
                                {i18n.language === "en" ? "🇹🇷 Türkçe" : "🇺🇸 English"}
                            </button>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={
                        <main className="max-w-3xl mx-auto px-6 py-10">
                            <ProfileHeader />
                            <AboutSection />
                            <EducationSection />
                            <ExperienceSection />
                            <SkillsSection />
                            <CommunitySection />
                        </main>
                    } />
                    <Route path="/projects" element={<ProjectsPage />} />
                </Routes>

                <footer className="p-6 text-center text-sm text-gray-500 border-t border-gray-100 mt-16 bg-gray-50">
                    <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© {new Date().getFullYear()} Melih Emre Güler. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="mailto:guler@melihemre.dev" className="text-gray-600 hover:text-blue-600 transition-colors">
                                ✉️ Email
                            </a>
                            <a href="https://linkedin.com/in/melihemreguler" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                                💼 LinkedIn
                            </a>
                            <a href="https://github.com/melihemreguler" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                                🐙 GitHub
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
