import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MainScene } from '../../canvas/MainScene';
import { Suspense } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { en } from '../../locales/en';
import { es } from '../../locales/es';

gsap.registerPlugin(ScrollTrigger);

export const OrbitalSection: React.FC = () => {
    const { language } = useLanguage();
    const t = language === 'EN' ? en : es;

    // Reference for section tracking (if needed for later animations)
    const { ref: sectionRef } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    useEffect(() => {
        const elements = document.querySelectorAll('.reveal-text');
        elements.forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: i * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [language]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[140vh] md:min-h-screen bg-transparent overflow-hidden flex items-center pb-64 md:pb-0"
        >
            {/* CAPA 0: EXOSKELETON CSS FORZADO (Resuelve colapso de contenedor en móvil) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', minHeight: '100vh', zIndex: 0, overflow: 'visible', pointerEvents: 'none' }}>
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance"
                    }}
                    style={{ width: '100vw', height: '100vh', display: 'block' }}
                >
                    {/* 1. LUZ AMBIENTE: Base sólida para visibilidad general */}
                    <ambientLight intensity={2.5} />

                    {/* 2. KEY LIGHT: Luz principal "Sol" blanco desde arriba/derecha */}
                    <directionalLight position={[10, 10, 10]} intensity={5.0} color="#ffffff" castShadow />

                    {/* 3. RIM LIGHT: Luz de recorte cian desde abajo/izquierda (Brand ID) */}
                    <directionalLight position={[-10, -10, -10]} intensity={4.0} color="#00e1ff" />

                    {/* 4. FILL LIGHT: Relleno frontal suave */}
                    <directionalLight position={[0, 0, 10]} intensity={1.5} color="#ffffff" />

                    {/* 5. ENVIRONMENT: Provee reflejos metálicos realistas */}
                    <Environment preset="city" environmentIntensity={0.6} />

                    <Suspense fallback={null}>
                        <MainScene />
                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Suspense>

                    {/* 6. POST-PROCESSING: Cinematic Bloom */}
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} mipmapBlur luminanceSmoothing={0.9} intensity={1.2} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* TOP FUSION FROM HERO */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

            {/* SEAMLESS FUSION GRADIENT - MASSIVE (Recalibrado para no tapar el satélite en móvil) */}
            <div className="absolute bottom-0 left-0 w-full h-24 md:h-64 bg-gradient-to-t from-[#05070A] to-transparent z-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full grow">
                <main className="flex-grow flex relative h-full">
                    <div className="container mx-auto px-6 relative z-10 flex flex-col items-start justify-center p-8 lg:px-16 lg:pl-32 overflow-hidden pointer-events-none md:pointer-events-auto">
                        <div className="relative z-10 flex flex-col min-h-[50vh] justify-center text-left max-w-4xl">
                            <div className="reveal-text inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 w-fit mb-8 self-start backdrop-blur-md">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#0df2f2]"></div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">{t.sections.orbital_tag}</span>
                            </div>

                            <h2 className="reveal-text text-glow text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tighter leading-[0.85] uppercase">
                                {t.sections.orbital_title} <br />
                                <span className="text-white/40 italic text-glow">{t.sections.orbital_title_ghost}</span>
                            </h2>

                            <p className="reveal-text text-slate-400 text-sm md:text-base leading-relaxed mb-12 max-w-2xl font-sans">
                                {t.sections.orbital_desc}
                            </p>

                            {/* TRUST MARK: CONAE */}
                            <div className="reveal-text flex flex-col md:flex-row items-start md:items-center gap-8 pt-8 border-t border-white/10 w-fit group/trust">
                                <div className="relative">
                                    <img
                                        src="/assets/Conae_Logo.png"
                                        alt="CONAE Logo"
                                        className="h-16 w-auto object-contain brightness-0 invert opacity-60 group-hover/trust:opacity-100 transition-all duration-700 cursor-help filter drop-shadow-[0_0_10px_rgba(13,242,242,0.1)] group-hover/trust:drop-shadow-[0_0_20px_rgba(13,242,242,0.3)]"
                                        title="Validated under CONAE standards"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] font-medium">Oficial_Validation</span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-display font-bold text-white/80 uppercase tracking-tight group-hover/trust:text-white transition-colors">Comisión Nacional de Actividades Espaciales</span>
                                        <span className="text-[11px] font-mono text-primary/70 uppercase tracking-[0.15em] font-bold">{t.sections.orbital_standard}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};
