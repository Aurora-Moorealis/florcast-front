"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseAboutGsapAnimationsProps {
    florcastMapRef: React.RefObject<HTMLElement | null>;
    teamGalleryRef: React.RefObject<HTMLElement | null>;
}

/**
 * Hook personalizado para animaciones GSAP en la página About
 */
export const useAboutGsapAnimations = ({ florcastMapRef, teamGalleryRef }: UseAboutGsapAnimationsProps) => {

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            
            // Animación del FlorcastMap
            if (florcastMapRef.current) {
                const mapElements = florcastMapRef.current.querySelectorAll('.map-element');
                const mapTitle = florcastMapRef.current.querySelector('.map-title');
                const mapContainer = florcastMapRef.current.querySelector('.map-container');

                // Animación inicial del título
                gsap.fromTo(mapTitle, {
                    opacity: 0,
                    y: -50,
                    scale: 0.8
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: florcastMapRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Animación del contenedor del mapa
                gsap.fromTo(mapContainer, {
                    opacity: 0,
                    scale: 0.9,
                    y: 30
                }, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: florcastMapRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Animación de elementos individuales del mapa
                gsap.fromTo(mapElements, {
                    opacity: 0,
                    scale: 0,
                    rotation: 180
                }, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "elastic.out(1, 0.8)",
                    scrollTrigger: {
                        trigger: florcastMapRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            // Animación de la galería del equipo
            if (teamGalleryRef.current) {
                const teamTitle = teamGalleryRef.current.querySelector('.team-title');
                const teamMembers = teamGalleryRef.current.querySelectorAll('.team-member');
                const teamFooter = teamGalleryRef.current.querySelector('.team-footer');

                // Animación del título del equipo con efecto de máquina de escribir
                gsap.fromTo(teamTitle, {
                    opacity: 0,
                    y: -100,
                    skewY: 10
                }, {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: teamGalleryRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Animación de los miembros del equipo con efecto de onda
                gsap.fromTo(teamMembers, {
                    opacity: 0,
                    y: 100,
                    scale: 0.5,
                    rotation: -15
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 1.2,
                    stagger: {
                        amount: 1.5,
                        from: "start",
                        ease: "power2.out"
                    },
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: teamGalleryRef.current,
                        start: "top 70%",
                        end: "bottom 30%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Efectos de hover para los miembros del equipo
                teamMembers.forEach((member) => {
                    const memberImage = member.querySelector('.team-image');
                    const memberInfo = member.querySelector('.team-info');
                    
                    if (memberImage && memberInfo) {
                        // Hover effect
                        member.addEventListener('mouseenter', () => {
                            gsap.to(memberImage, {
                                scale: 1.1,
                                rotation: 5,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                            gsap.to(memberInfo, {
                                y: -10,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });

                        member.addEventListener('mouseleave', () => {
                            gsap.to(memberImage, {
                                scale: 1,
                                rotation: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                            gsap.to(memberInfo, {
                                y: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        });
                    }
                });

                // Animación del footer con efectos de partículas
                gsap.fromTo(teamFooter, {
                    opacity: 0,
                    y: 50,
                    scale: 0.8
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.6)",
                    scrollTrigger: {
                        trigger: teamFooter,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Efectos de parallax en elementos decorativos
                const decorativeElements = teamGalleryRef.current.querySelectorAll('.decorative-element');
                
                decorativeElements.forEach((element, index) => {
                    gsap.to(element, {
                        y: -20 * (index + 1),
                        rotation: 360,
                        ease: "none",
                        scrollTrigger: {
                            trigger: teamGalleryRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1
                        }
                    });
                });
            }

            // Animaciones de entrada global para toda la página About
            const aboutElements = document.querySelectorAll('.about-animate');
            
            aboutElements.forEach((element, index) => {
                gsap.fromTo(element, {
                    opacity: 0,
                    y: 50,
                    x: index % 2 === 0 ? -30 : 30
                }, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 1,
                    delay: index * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

        }, [florcastMapRef, teamGalleryRef]);

        // Limpieza
        return () => ctx.revert();
    }, [florcastMapRef, teamGalleryRef]);
};