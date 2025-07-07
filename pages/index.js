import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import FeaturedArtists from "@/components/FeaturedArtists";
import WhyChooseUs from "@/components/WhyChooseUs";
import Head from "next/head";

export default function Home() {
    return (
        <> < Head > <title>Umami Records | Studio de Înregistrări în Ploiești pentru Artiști Autentici</title>
        <meta
            name="description"
            content="Studio de înregistrări în Ploiești dedicat artiștilor care vor să-și exprime stilul unic. Înregistrări vocale, mix & master profesional și videoclipuri creative. Gustă savoarea muzicii!"/>
        <meta
            name="keywords"
            content="studio de înregistrări Ploiești, mix & master profesional, beaturi exclusive, studio hip-hop Ploiești, muzică independentă"/>
        <meta name="robots" content="index, follow"/>
        <meta
            property="og:title"
            content="Umami Records | Studio de Înregistrări în Ploiești pentru Artiști Autentici"/>
        <meta
            property="og:description"
            content="Umami Records - un spațiu creativ pentru artiști care vor să-și exprime vibe-ul autentic. Gustă savoarea muzicii!"/>
        <meta property="og:image" content="/logo.png"/>
        <meta property="og:url" content="https://www.umamirecords.ro/"/>
        <meta name="twitter:card" content="summary_large_image"/>
    </Head>
    <div className="homepage">
        <Hero/>
        <WhyChooseUs/>
        <FeaturedArtists/>
        <Testimonials/>
    </div>
</>
    );
}
