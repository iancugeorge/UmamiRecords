// components/Layout.js
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

const BASE_URL = "https://www.umamirecords.ro"; // prod domain

// Optional: map slugs to nicer labels
const LABEL_MAP = {
  "servicii": "Servicii",
  "muzica": "Muzică",
  "despre": "Despre",
  "contact": "Contact",
  "mix-master": "Mix & Master",
  "beaturi": "Beaturi",
};

const toTitle = (seg) => {
  const s = (seg || "").toLowerCase();
  if (LABEL_MAP[s]) return LABEL_MAP[s];
  // Fallback: decode, replace dashes, Title Case
  return decodeURIComponent(seg)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const Layout = ({
  children,
  title = "Umami Records",
  description = "Studio de înregistrări în Ploiești pentru artiști autentici. Înregistrări vocale, mix & master profesional și videoclipuri creative."
}) => {
  const { asPath } = useRouter();

  // Clean URL pieces (no query/hash)
  const cleanPath = (asPath || "/").split("#")[0].split("?")[0];
  const canonicalUrl = `${BASE_URL}${cleanPath === "/" ? "" : cleanPath}`;

  // 👉 Build BreadcrumbList JSON-LD
  const segments = cleanPath.split("/").filter(Boolean);
  const items = [
    { "@type": "ListItem", position: 1, name: "Acasă", item: `${BASE_URL}/` }
  ];
  segments.forEach((seg, i) => {
    const url = `${BASE_URL}/${segments.slice(0, i + 1).join("/")}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: toTitle(seg),
      item: url
    });
  });
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content="studio de înregistrări, mix si master Ploiești, producție video muzicală, beat-uri custom" />
        <meta name="robots" content="index, follow" />

        {/* ✅ Canonical + OG URL */}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* ✅ Absolute OG image */}
        <meta property="og:image" content={`${BASE_URL}/images/logo.png`} />
        <meta property="og:type" content="website" />

        {/* ✅ BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />

        {/* LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Umami Records",
              "image": `${BASE_URL}/images/logo.png`,
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
              "url": BASE_URL,
              "description": "Studio de înregistrări în Ploiești pentru artiști autentici, oferind înregistrări vocale, mix & master profesional și videoclipuri creative.",
              "currenciesAccepted": "RON",
              "openingHours": "Mo-Su 10:00-20:00",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "priceRange": "$",
              "sameAs": [
                "https://instagram.com/umami.records",
                "https://youtube.com/@umami.records"
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
