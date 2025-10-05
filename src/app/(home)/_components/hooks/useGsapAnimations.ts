"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook personalizado para animaciones GSAP en la página de inicio
 */
export const useGsapAnimations = () => {
    const heroRef = useRef<HTMLElement>(null);
    const whatAreRef = useRef<HTMLDivElement>(null);
    const howWorkRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Timeline principal para la carga inicial
            const tl = gsap.timeline();

            // Animación del Hero - Efecto de aparición dramática
            if (heroRef.current) {
                const heroTitle = heroRef.current.querySelector('.hero-title');
                const heroSubtitle = heroRef.current.querySelector('.hero-subtitle');
                const heroImage = heroRef.current.querySelector('.hero-image');

                // Configurar estado inicial
                gsap.set([heroTitle, heroSubtitle], { 
                    opacity: 0, 
                    y: 100,
                    scale: 0.8 
                });
                
                gsap.set(heroImage, { 
                    scale: 1.2, 
                    opacity: 0.7 
                });

                // Animación secuencial del hero
                tl.to(heroImage, {
                    scale: 1,
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out"
                })
                .to(heroTitle, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "back.out(1.7)"
                }, "-=1")
                .to(heroSubtitle, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5");
            }

            // Animación de "What Are" con ScrollTrigger
            if (whatAreRef.current) {
                const whatAreTitle = whatAreRef.current.querySelector('.section-title');
                const whatAreText = whatAreRef.current.querySelector('.section-text');
                const whatAreImage = whatAreRef.current.querySelector('.section-image');

                gsap.fromTo([whatAreTitle, whatAreText], {
                    opacity: 0,
                    x: -100,
                    rotation: -5
                }, {
                    opacity: 1,
                    x: 0,
                    rotation: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: whatAreRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });

                gsap.fromTo(whatAreImage, {
                    opacity: 0,
                    scale: 0.8,
                    rotation: 5
                }, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.8)",
                    scrollTrigger: {
                        trigger: whatAreRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            // Animación de "How Work" con efectos avanzados
            if (howWorkRef.current) {
                const howWorkHeader = howWorkRef.current.querySelector('.work-header');
                const howWorkTitle = howWorkRef.current.querySelector('.work-title');
                const howWorkText = howWorkRef.current.querySelectorAll('.work-text');
                const howWorkImage = howWorkRef.current.querySelector('.work-image');

                // Animación del header con efecto de máquina de escribir
                gsap.fromTo(howWorkHeader, {
                    opacity: 0,
                    y: -50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "bounce.out",
                    scrollTrigger: {
                        trigger: howWorkRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Animación del título con efecto de rebote
                gsap.fromTo(howWorkTitle, {
                    opacity: 0,
                    scale: 0.5,
                    rotation: -10
                }, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1.2,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: howWorkRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Animación de textos con stagger
                gsap.fromTo(howWorkText, {
                    opacity: 0,
                    y: 30,
                    x: -20
                }, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: howWorkRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Animación de imagen con parallax suave
                gsap.fromTo(howWorkImage, {
                    opacity: 0,
                    y: 100,
                    scale: 0.9
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: howWorkRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Efecto de parallax continuo en la imagen
                gsap.to(howWorkImage, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: howWorkRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                });
            }

        }, [heroRef, whatAreRef, howWorkRef]);

        // Limpieza
        return () => ctx.revert();
    }, []);

    return {
        heroRef,
        whatAreRef,
        howWorkRef
    };
};