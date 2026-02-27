import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SceneDirector = ({ particlesRef, satelliteRef, rimLightRef }: { particlesRef: any, satelliteRef: any, rimLightRef: any }) => {
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial State: Satellite fixed and massive
            if (satelliteRef.current) {
                gsap.set(satelliteRef.current.position, { x: 3.5, y: 0, z: 0 });
                gsap.set(satelliteRef.current.rotation, { x: 0, y: 0, z: 0 });
            }

            if (rimLightRef.current) {
                gsap.set(rimLightRef.current, { intensity: 0 });
            }

            // 1. Orbital Section Reveal - Appearance by Light
            const tlOrbital = gsap.timeline({
                scrollTrigger: {
                    trigger: "#orbital-section",
                    start: "top bottom",
                    end: "top center",
                    scrub: 1.0,
                }
            });

            // REVELACIÓN POR LUZ: La cinemática B2B principal
            if (rimLightRef.current) {
                tlOrbital.to(rimLightRef.current, {
                    intensity: 2500,
                    ease: "power2.inOut"
                }, 0);
            }

            // 2. SATELLITE ANCHORING: El satélite se queda en su sección
            if (satelliteRef.current) {
                gsap.to(satelliteRef.current.position, {
                    y: 15, // Fuera de cámara arriba
                    scrollTrigger: {
                        trigger: "#orbital-section",
                        start: "bottom center",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }

            // 3. Hero Back-to-top behavior (Particles only)
            const tlHero = gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            if (particlesRef.current) {
                tlHero.to(particlesRef.current.position, {
                    z: 0,
                    ease: "power2.out"
                }, 0);
            }

            // 4. Global Text Reveal Logic with Professional Stagger
            const revealElements = document.querySelectorAll('.reveal-text');
            revealElements.forEach((el) => {
                gsap.fromTo(el,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.0,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 95%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        });

        return () => ctx.revert();
    }, [particlesRef, satelliteRef]);

    return null;
};
