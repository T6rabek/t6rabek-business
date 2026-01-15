import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
    const { t } = useTranslation('common');

    return (
        <div className="min-h-screen">
            <Head>
                <title>{t('hero_name')} | {t('meta_title')}</title>
                <meta name="description" content={t('meta_description')} />
                <meta name="keywords" content="To'rabek Raufov, T6rabek, TourFixer, txielts, Web Development, Tourism, Tour Guide, Uzbekistan Tours, Full Stack Developer" />
                <meta name="author" content="To'rabek Raufov" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <link rel="canonical" href="https://t6rabek.uz" />

                {/* Open Graph */}
                <meta property="og:title" content={`${t('hero_name')} | ${t('meta_title')}`} />
                <meta property="og:description" content={t('meta_description')} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://t6rabek.uz" />
                <meta property="og:image" content="https://t6rabek.uz/og-image.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="To'rabek Raufov - TourFixer.uz & txielts.uz" />
                <meta property="og:site_name" content="To'rabek Raufov" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${t('hero_name')} | ${t('meta_title')}`} />
                <meta name="twitter:description" content={t('meta_description')} />
                <meta name="twitter:image" content="https://t6rabek.uz/og-image.png" />
                <meta name="twitter:creator" content="@t6rabek" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#a855f7" />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "To'rabek Raufov",
                            "alternateName": "T6rabek",
                            "description": "19-year-old Frontend Developer and Startup Enthusiast from Samarkand, Uzbekistan. Founder of TourFixer.uz and txielts.uz.",
                            "url": "https://t6rabek.uz",
                            "image": "https://t6rabek.uz/image.png",
                            "jobTitle": "Frontend Developer",
                            "worksFor": [
                                {
                                    "@type": "Organization",
                                    "name": "TourFixer.uz",
                                    "url": "https://tourfixer.uz"
                                }
                            ],
                            "alumniOf": {
                                "@type": "CollegeOrUniversity",
                                "name": "Silk Road International University of Tourism"
                            },
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Samarkand",
                                "addressCountry": "UZ"
                            },
                            "sameAs": [
                                "https://github.com/t6rabek",
                                "https://linkedin.com/in/t6rabek",
                                "https://instagram.com/t6rabek",
                                "https://t.me/t6rabek"
                            ],
                            "knowsAbout": [
                                "Frontend Development",
                                "React",
                                "Next.js",
                                "JavaScript",
                                "Tourism",
                                "Uzbekistan Tours",
                                "Web Development"
                            ]
                        })
                    }}
                />
            </Head>

            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
        </div>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
