import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';
import { en } from '../../locales/en';
import { es } from '../../locales/es';

interface Industry {
    id: number;
    title: string;
    description: string;
    video: string;
}

interface IndustryCardProps {
    ind: Industry;
    isActive: boolean;
    onClick: (id: number) => void;
    onCentered: (id: number) => void;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ ind, isActive, onClick, onCentered }) => {
    const { ref, inView } = useInView({
        threshold: 0.6,
        rootMargin: "0px -20% 0px -20%",
    });

    useEffect(() => {
        if (inView && typeof window !== 'undefined' && window.innerWidth < 1024) {
            onCentered(ind.id);
        }
    }, [inView, ind.id, onCentered]);

    return (
        <button
            ref={ref}
            onClick={() => onClick(ind.id)}
            className={`group flex flex-col items-start p-4 lg:p-6 text-left transition-all duration-300 border-l-2 lg:border-l-2 border-t-0 lg:border-t-0 snap-center min-w-[85vw] md:min-w-0 flex-shrink-0 min-h-[160px] md:min-h-0 whitespace-normal text-left max-w-full overflow-hidden ${isActive
                ? "border-primary bg-white/5"
                : "border-transparent hover:border-white/20 hover:bg-white/[0.02]"
                }`}
        >
            <span className={`text-lg md:text-xl font-display font-bold uppercase tracking-tight ${isActive ? "text-white" : "text-[#8B949E]"
                }`}>
                {ind.title}
            </span>

            <p className={`mt-3 text-sm md:text-base leading-relaxed whitespace-normal break-words text-wrap max-w-full w-full transition-all duration-300 ${isActive ? "text-gray-300 md:text-[#A1A1AA] opacity-100" : "text-gray-400 md:text-[#8B949E] opacity-100 lg:opacity-60 group-hover:opacity-100"}`}>
                {ind.description}
            </p>
        </button>
    );
};

interface ManagedVideoProps {
    ind: Industry;
    isActive: boolean;
}

const ManagedVideo: React.FC<ManagedVideoProps> = ({ ind, isActive }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const tryPlay = () => {
        if (isActive && videoRef.current) {
            videoRef.current.play().catch(e => console.log("Video play interrupted:", e));
        }
    };

    useEffect(() => {
        if (!videoRef.current) return;

        if (isActive) {
            tryPlay();
        } else {
            videoRef.current.pause();
        }
    }, [isActive]);

    return (
        <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={tryPlay}
            onLoadedData={tryPlay}
            className={`absolute inset-0 w-full h-full object-cover scale-[1.14] origin-center transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            src={ind.video}
        />
    );
};

export const IndustriesSection: React.FC = () => {
    const { language } = useLanguage();
    const t = language === 'EN' ? en : es;

    const [activeIndustry, setActiveIndustry] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const autoPlayRef = useRef<number | null>(null);

    const industries: Industry[] = [
        {
            id: 0,
            title: t.industry_list[0].title,
            description: t.industry_list[0].description,
            video: "/assets/videos/oil-gas.mp4"
        },
        {
            id: 1,
            title: t.industry_list[1].title,
            description: t.industry_list[1].description,
            video: "/assets/videos/mining.mp4"
        },
        {
            id: 2,
            title: t.industry_list[2].title,
            description: t.industry_list[2].description,
            video: "/assets/videos/automation.mp4"
        },
        {
            id: 3,
            title: t.industry_list[3].title,
            description: t.industry_list[3].description,
            video: "/assets/videos/agtech.mp4"
        }
    ];

    const startAutoPlay = () => {
        // Disable autoplay on mobile
        if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            setActiveIndustry((prev) => (prev + 1) % industries.length);
        }, 6000); // 6 seconds interval
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
    };

    useEffect(() => {
        startAutoPlay();

        // Optional: Re-run auto-play check on resize
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                stopAutoPlay();
            } else if (!autoPlayRef.current) {
                startAutoPlay();
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            stopAutoPlay();
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleIndustryClick = (id: number) => {
        setActiveIndustry(id);
        startAutoPlay(); // Reset timer on manual click
    };

    return (
        <section ref={ref} className="relative w-full py-24 bg-[#05070A]">
            {/* TOP FUSION FROM PREVIOUS SECTION */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-20">
                <div className="mb-16">
                    <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">// {t.sections.industries}</span>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-tight">
                        {t.sections.industries_title} <span className="text-white/30 italic">{t.sections.industries_title_ghost}</span>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* SIDEBAR SELECTOR - MOBILE SWIPE CARDS */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-2">
                        {/* SWIPE INDICATOR FOR MOBILE */}
                        <div className="flex lg:hidden items-center gap-2 mb-2 animate-pulse text-primary font-mono text-[10px] tracking-widest">
                            <span className="material-symbols-outlined text-sm">swipe</span>
                            {t.sections.swipe_to_explore}
                        </div>
                        <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible whitespace-nowrap lg:whitespace-normal snap-x snap-mandatory scrollbar-hide pb-4 lg:pb-0">
                            {industries.map((ind) => (
                                <IndustryCard
                                    key={ind.id}
                                    ind={ind}
                                    isActive={activeIndustry === ind.id}
                                    onClick={handleIndustryClick}
                                    onCentered={(id) => {
                                        if (activeIndustry !== id) {
                                            setActiveIndustry(id);
                                            startAutoPlay();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* VIDEO CONTAINER */}
                    <div className="w-full lg:w-2/3 relative">
                        <div className="aspect-video w-full bg-[#0A0E17] border border-white/10 rounded-sm overflow-hidden relative shadow-2xl">
                            {inView && industries.map((ind) => (
                                <ManagedVideo
                                    key={ind.id}
                                    ind={ind}
                                    isActive={activeIndustry === ind.id}
                                />
                            ))}

                            {/* SCANLINES & OVERLAY - REMOVED LOCAL TO USE GLOBAL APP SCANLINES */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                        </div>

                        {/* DECORATIVE ELEMENTS */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r border-b border-primary/20 pointer-events-none" />
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-l border-t border-primary/20 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* SEAMLESS FUSION GRADIENT - MASSIVE */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </section >
    );
};

