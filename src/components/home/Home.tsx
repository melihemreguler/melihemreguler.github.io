import { AboutSection } from "../components/home/AboutSection";
import { EducationSection } from "../components/home/EducationSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import { SkillsSection } from "../components/home/SkillsSection";
import { ProfileHeader } from "../components/home/ProfileHeader";

export function Home() {
    return (
        <div className="max-w-4xl mx-auto space-y-10 px-4 py-8">
            <ProfileHeader />
            <AboutSection />
            <EducationSection />
            <ExperienceSection />
            <SkillsSection />
        </div>
    );
}
