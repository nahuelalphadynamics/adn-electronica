import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useLanguage } from '../../context/LanguageContext';
import { en } from '../../locales/en';
import { es } from '../../locales/es';

gsap.registerPlugin(TextPlugin);

interface HeroProps {
    isStarted?: boolean;
}

export const HeroSection: React.FC<HeroProps> = ({ isStarted }) => {
    const { language } = useLanguage();
    const t = language === 'EN' ? en : es;

    const subRef = useRef<HTMLSpanElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const logoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isStarted) return;

        const tl = gsap.timeline();

        // Logo & Subtitle
        tl.fromTo(logoContainerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        )
            .fromTo(subRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                "-=1"
            )
            .from(btnRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5");
    }, [isStarted]);

    return (
        <section className="relative w-full min-h-screen overflow-hidden flex flex-col bg-transparent">
            {/* TOP FUSION FROM HERO */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full grow">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover"
                    >
                        <source src="/assets/videos/Video_Hero.mp4" type="video/mp4" />
                    </video>
                    {/* 70% DARK OVERLAY */}
                    <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
                </div>

                <main className="flex grow flex-col relative z-20">
                    <div className="relative flex min-h-[90vh] w-full flex-col items-center justify-center bg-transparent overflow-hidden">
                        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl">
                            {/* BRAND LOGO */}
                            <div ref={logoContainerRef} className="mb-12 flex flex-col items-center opacity-0">
                                <img
                                    src="/assets/logo-adn.svg"
                                    alt="ADN Logo"
                                    className="w-48 md:w-80 lg:w-[32rem] h-auto"
                                />
                                <span ref={subRef} className="text-white font-mono text-[10px] md:text-xs tracking-[1.5em] uppercase mt-6 ml-[1.5em] opacity-0">
                                    {language === 'EN' ? 'Engineering' : 'Ingeniería'}
                                </span>
                            </div>



                            <button ref={btnRef} className="group relative h-14 px-12 overflow-hidden bg-white/5 border border-white/20 text-white font-bold text-[11px] tracking-[0.4em] uppercase transition-all rounded-sm hover:bg-white hover:text-black flex items-center gap-6">
                                <span className="relative z-10">{t.hero.cta}</span>
                                <span className="material-symbols-outlined text-sm transition-transform relative z-10">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* SEAMLESS FUSION GRADIENT - MASSIVE */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
    );
};
