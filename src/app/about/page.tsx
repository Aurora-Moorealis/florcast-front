"use client";

import { useRef } from 'react';
import FlorcastMap from './_components/florcast-map';
import TeamGallery from './_components/gallery-tem';
import Header from '../components/header';
import Footer from '../components/footer';
import Hero from '../(home)/_components/hero';
import { useAboutGsapAnimations } from './_components/hooks/useAboutGsapAnimations';

function AboutPage() {
    // Referencias para las animaciones GSAP
    const florcastMapRef = useRef<HTMLElement>(null);
    const teamGalleryRef = useRef<HTMLElement>(null);
    
    // Hook para las animaciones de la página About
    useAboutGsapAnimations({
        florcastMapRef,
        teamGalleryRef
    });

    return(
        <>
            <Header/>
            <main className="relative overflow-hidden">
                <Hero />

                {/* Componentes animados con referencias */}
                <FlorcastMap 
                    ref={florcastMapRef}
                    className="animated-section"
                />
                <TeamGallery 
                    ref={teamGalleryRef}
                    className="animated-section"
                />
            </main>
            <Footer/>
        </>
    )
}

export default AboutPage;