// components/Layout.js
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({
  children,
  title = "Umami Records",
  description = "Studio de înregistrări în Ploiești pentru artiști autentici. Înregistrări vocale, mix & master profesional și videoclipuri creative."
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content="studio de înregistrări, mix si master Ploiești, producție video muzicală, beat-uri custom" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data Markup using dangerouslySetInnerHTML */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Umami Records",
              "image": "https://www.umamirecords.ro/logo.png",
              "telephone": "+40720382803",
              "email": "contact@umamirecords.ro",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Zimbrului",
                "addressLocality": "Ploiești",
                "addressRegion": "Prahova",
                "postalCode": "100100",
                "addressCountry": "RO"
              },
              "url": "https://www.umamirecords.ro",
              "description": "Studio de înregistrări în Ploiești pentru artiști autentici, oferind înregistrări vocale, mix & master profesional și videoclipuri creative.",
              "currenciesAccepted": "RON",
              "openingHours": "Mo-Su 10:00-20:00",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "priceRange": "$",
              "sameAs": [
                "https://instagram.com/umami.records",
                "https://youtube.com/umami.records"
              ]
            })
          }}
        />
      </Head>
      
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
