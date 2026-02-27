import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { en } from '../../locales/en';
import { es } from '../../locales/es';

export const SideNavigation: React.FC = () => {
    const { language } = useLanguage();
    const t = language === 'EN' ? en : es;

    const sections = [
        { id: 'hero-section', label: t.nav.home },
        { id: 'orbital-section', label: t.nav.orbital },
        { id: 'industries-section', label: t.nav.industries },
        { id: 'infrastructure-section', label: t.nav.plant },
        { id: 'milestones-section', label: t.nav.milestones },
        { id: 'contact-section', label: t.nav.contact },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[110] hidden md:flex flex-col items-center gap-8">
            {/* DOTS NAVIGATION */}
            <div className="flex flex-col gap-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group relative flex items-center justify-center p-2"
                        title={section.label}
                    >
                        <div className="w-1.5 h-1.5 rounded-full border border-white/40 group-hover:border-primary group-hover:bg-primary transition-all duration-300" />
                        <span className="absolute right-8 font-mono text-[9px] text-white/0 group-hover:text-white uppercase tracking-[0.3em] transition-all whitespace-nowrap pointer-events-none">
                            {section.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};
