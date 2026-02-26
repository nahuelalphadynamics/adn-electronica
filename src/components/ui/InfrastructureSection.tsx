import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';
import { en } from '../../locales/en';
import { es } from '../../locales/es';

gsap.registerPlugin(ScrollTrigger);

import { useInView } from 'react-intersection-observer';

export const InfrastructureSection: React.FC = () => {
    const { language } = useLanguage();
    const t = language === 'EN' ? en : es;

    const { ref: sectionRef, inView: sectionInView } = useInView({
        threshold: 0,
        rootMargin: '200px',
        triggerOnce: true
    });
    const kpiRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionInView) return;
        // KPI Counter animations
        kpiRefs.current.forEach((kpi) => {
            if (!kpi) return;
            const target = kpi.querySelector('.kpi-value');
            if (!target) return;

            const value = parseFloat(target.getAttribute('data-value') || '0');
            const obj = { val: 0 };

            gsap.to(obj, {
                val: value,
                duration: 2,
                scrollTrigger: {
                    trigger: kpi,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                onUpdate: () => {
                    target.textContent = Math.floor(obj.val).toString();
                }
            });
        });
    }, [sectionInView, language]);


    return (
        <section ref={sectionRef} className="relative w-full py-16 md:py-32 bg-black overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* LEFT SIDE: EDITORIAL TEXT & KPIs */}
                    <div className="lg:w-1/2">
                        <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">{t.sections.infrastructure_tag}</span>
                        <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-12">
                            {t.sections.infrastructure_title} <br />
                            <span className="text-white/30 italic">{t.sections.infrastructure_title_ghost}</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {[
                                { label: t.sections.infrastructure_kpi_area, value: 800, suffix: 'm²' },
                                { label: t.sections.infrastructure_kpi_validation, value: 72, suffix: 'h' },
                                { label: t.sections.infrastructure_kpi_engineering, value: 30, suffix: ' STAFF' },
                                { label: t.sections.infrastructure_kpi_iso, value: 9001, suffix: '' }
                            ].map((kpi, idx) => (
                                <div
                                    key={kpi.label}
                                    ref={el => { kpiRefs.current[idx] = el; }}
                                    className="pb-6 border-b border-white/10"
                                >
                                    <div className="text-[10px] font-mono text-[#8B949E] mb-2 tracking-widest uppercase">{kpi.label}</div>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`kpi-value text-4xl font-display font-bold italic tracking-tighter ${kpi.label === t.sections.infrastructure_kpi_engineering ? 'text-primary' : 'text-white'}`} data-value={kpi.value}>0</span>
                                        <span className="text-primary font-bold text-xl">{kpi.suffix}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-lg font-mono uppercase tracking-wider">
                            {t.sections.infrastructure_desc}
                        </p>
                    </div>

                    {/* RIGHT SIDE: VERTICAL HUMAN PILLAR VIDEO */}
                    <div className="lg:w-1/2 flex justify-center lg:justify-end w-full">
                        <div className="relative w-full max-w-md aspect-[9/16] bg-[#0A0E17] rounded-sm border border-white/10 overflow-hidden shadow-2xl group">
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm border border-white/5 pointer-events-none">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-[9px] font-mono text-white tracking-widest uppercase truncate">CAM-01 // HUMAN_PILLAR_V01</span>
                            </div>

                            {sectionInView && (
                                <video
                                    autoPlay loop muted playsInline
                                    poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover transition-all duration-1000 scale-[1.05]"
                                >
                                    <source src="/assets/videos/ingeniero-vertical.mp4" type="video/mp4" />
                                </video>
                            )}

                            {/* OVERLAY DECORATION */}
                            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* TOP FUSION FROM PREVIOUS SECTION */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#05070A] to-transparent z-10 pointer-events-none" />

            {/* SEAMLESS FUSION GRADIENT - MASSIVE */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
    );
};
