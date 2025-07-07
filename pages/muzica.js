import SampleGallery from '@/components/SampleGallery';
import {motion} from "framer-motion";
import Head from "next/head";

export default function Music() {
    return (
        <> < Head > <title>Muzica Umami Records | Beat-uri, Mixuri și Videoclipuri pentru Artiști Adevărați</title>
        <meta
            name="description"
            content="Descoperă vibe-ul Umami Records: beat-uri originale, mixuri clare și videoclipuri creative. Sound-ul tău merită să fie auzit!"/>
        <meta
            name="keywords"
            content="beat-uri personalizate Ploiești, mix & master profesional, videoclipuri muzicale creative, studio hip-hop Ploiești"/>
        <meta
            property="og:title"
            content="Muzica Umami Records | Beat-uri, Mixuri și Videoclipuri pentru Artiști Adevărați"/>
        <meta
            property="og:description"
            content="Beat-uri originale și videoclipuri creative. Transformă-ți ideile în sound memorabil!"/>
        <meta property="og:image" content="/images/mix-sample.jpg"/>
    </Head>
    <div className="min-h-screen bg-black text-white">
            {/* Hero Section */
        } < section className = "relative flex flex-col items-center justify-center text-center py-20 px-6" > {/* Background Animation */
        } < div className = "absolute inset-0 bg-black opacity-70 mix-blend-overlay animate-distort" /> <motion.h2
            className="text-5xl sm:text-6xl font-extrabold text-yellow-400 uppercase tracking-wide glitch-text"
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.8,
                ease: "easeOut"
            }}>
            Sunetul Umami Records
        </motion.h2>
        <h1 className="text-sm text-gray-300 uppercase tracking-wider font-bold mt-2">
            Sunet care face valuri – Beat-uri, mixuri și videoclipuri fresh direct din
            studioul nostru din Ploiești
        </h1>

        <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mt-10 font-medium"
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut"
            }}>
            Beat-uri, mixuri și videoclipuri – descoperă vibe-ul nostru unic.
        </motion.p>
    </section>

            {/* Sample Gallery */
        } < SampleGallery /> </div>
</>
    );
}
