import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { en } from '../../locales/en';
import { es } from '../../locales/es';

export const MobileNavigation: React.FC = () => {
    const { language, triggerLanguageSwitch } = useLanguage();
    const t = language === 'EN' ? en : es;

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-[#05070A]/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex md:hidden items-center justify-between">
            {/* LEFT: BRAND */}
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#0df2f2]" />
                <span className="text-white font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
                    ADN // CORE
                </span>
            </div>

            {/* RIGHT: LANGUAGE SWITCH */}
            <button
                onClick={() => triggerLanguageSwitch(language === 'EN' ? 'ES' : 'EN')}
                className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
                <span className="text-[10px] font-mono tracking-widest text-white">
                    {t.nav.switch}
                </span>
            </button>
        </nav>
    );
};
