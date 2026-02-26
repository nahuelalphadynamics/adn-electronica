import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';
import { en } from '../../locales/en';
import { es } from '../../locales/es';

gsap.registerPlugin(ScrollTrigger);

export const MilestonesSection: React.FC = () => {
    const { language } = useLanguage();
    const t = language === 'EN' ? en : es;

    const sectionRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

    const milestones = t.milestone_list;

    useEffect(() => {
        // Clear previous triggers if any to prevent duplicates on language change
        ScrollTrigger.getAll().forEach(t => {
            if (t.trigger && rowsRef.current.includes(t.trigger as HTMLDivElement)) {
                t.kill();
            }
        });

        rowsRef.current.forEach((row, i) => {
            if (!row) return;
            gsap.fromTo(row,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: i * 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [language]); // Re-run when language changes to re-trigger animations on new content

    return (
        <section ref={sectionRef} className="relative w-full py-16 md:py-32 bg-transparent overflow-hidden">
            {/* TOP FUSION FROM INFRASTRUCTURE */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-20">
                {/* HEADER */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-12 bg-primary/50"></div>
                        <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] font-bold">{t.sections.milestones_archive}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter">
                        {t.sections.milestones_title} <span className="text-white/40 italic">{t.sections.milestones_title_ghost}</span>
                    </h2>
                </div>

                {/* LEDGER LIST */}
                <div className="flex flex-col border-t border-white/10">
                    {milestones.map((ms, idx) => (
                        <div
                            key={idx}
                            ref={el => { rowsRef.current[idx] = el; }}
                            className="group grid grid-cols-1 lg:grid-cols-12 items-center py-10 border-b border-white/10 transition-all duration-500 active:bg-white/[0.05] md:hover:bg-white/[0.02] border-l-2 border-transparent md:hover:border-primary md:hover:pl-4"
                        >
                            {/* COL 1: TAG */}
                            <div className="lg:col-span-4 mb-4 lg:mb-0">
                                <span className="text-sm font-mono text-[#8B949E] tracking-widest uppercase transition-colors duration-300 group-hover:text-primary">
                                    {ms.tag}
                                </span>
                            </div>

                            {/* COL 2: DESCRIPTION */}
                            <div className="lg:col-span-8">
                                <p className="text-base md:text-lg text-gray-300 md:text-[#A1A1AA] leading-relaxed max-w-4xl font-sans transition-colors duration-300 md:group-hover:text-white">
                                    {ms.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEAMLESS FUSION GRADIENT - MASSIVE */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
    );
};
