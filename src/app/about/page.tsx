import FlorcastMap from './_components/florcast-map';
import TeamGallery from './_components/gallery-tem';
import Header from '../components/header';
import Footer from '../components/footer';
import Hero from '../(home)/_components/hero';

function AboutPage() {
    return(
        <>
            <Header/>
            <main>
                <Hero />

                <FlorcastMap />
                <TeamGallery />
            </main>
            <Footer/>
        </>
    )
}

export default AboutPage;