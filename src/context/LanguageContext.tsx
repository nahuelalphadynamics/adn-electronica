import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'EN' | 'ES';

interface LanguageContextType {
    language: Language;
    isScanning: boolean;
    scanProgress: number;
    triggerLanguageSwitch: (newLang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ES');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    const triggerLanguageSwitch = useCallback((newLang: Language) => {
        if (newLang === language || isScanning) return;

        setIsScanning(true);
        setScanProgress(0);

        // AOI Scan Animation Sequence
        // 0ms: Start scan (0%)
        // 400ms: Middle of scan (50%) -> Switch Language
        // 800ms: End scan (100%)

        let start: number | null = null;
        const duration = 800; // 0.8s as requested

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percent = Math.min((progress / duration) * 100, 100);

            setScanProgress(percent);

            if (progress >= duration / 2 && language !== newLang) {
                setLanguage(newLang);
            }

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    setIsScanning(false);
                    setScanProgress(0);
                }, 200); // Small buffer before hiding
            }
        };

        requestAnimationFrame(animate);
    }, [language, isScanning]);

    return (
        <LanguageContext.Provider value={{ language, isScanning, scanProgress, triggerLanguageSwitch }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
