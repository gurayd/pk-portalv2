import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import genelKurulImg from '../../assets/announce_genel_kurul.jpg';
import qrCodeNewsImg from '../../assets/qr_code_news.png';

const SLIDES = [
    {
        type: 'video',
        src: "https://www.youtube.com/embed/cZ5c7Pxpqfk",
        title: "Tanıtım Filmi",
        description: "Makina Mühendisleri Odası olarak periyodik kontrollerde güvenilir çözüm ortağınız olmaya devam ediyoruz."
    },
    {
        type: 'image',
        src: genelKurulImg,
        title: "33. Olağan Şube Genel Kurulu ve Seçimleri",
        description: "7 Şubat 2026 Cumartesi Genel Kurul - 8 Şubat 2026 Pazar Seçimler. Yer: Tepekule Kongre ve Sergi Merkezi"
    },
    {
        type: 'news',
        title: "MMO’dan Yeni Hizmet: Periyodik Kontrol Raporlarına QR Kod ile Anında Erişim",
        description: "Periyodik kontrol raporlarınıza artık QR kod ile anında erişebilirsiniz. Detaylar için tıklayınız.",
        link: "https://ankara.mmo.org.tr/izmir/haber/mmodan-yeni-hizmet-periyodik-kontrol-raporlarina-qr-kod-ile-aninda-erisim",
        image: qrCodeNewsImg
    }
];

export default function AnnouncementCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    };

    const currentSlide = SLIDES[currentIndex];

    return (
        <div style={{
            marginTop: '48px',
            padding: '32px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {currentIndex + 1} / {SLIDES.length}
                </div>
            </div>

            {/* Carousel Content */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="hover-lift"
                    style={{
                        position: 'absolute',
                        left: '-20px',
                        zIndex: 10,
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid #cbd5e1',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-md)',
                        color: 'var(--text-primary)'
                    }}
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Slide Display */}
                {/* Slide Display with Fixed 16:9 Aspect Ratio */}
                <div style={{
                    width: '100%',
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 Aspect Ratio
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: '#000' // Better for videos/images
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflowY: 'auto' }}>

                        {/* VIDEO TYPE */}
                        {currentSlide.type === 'video' && (
                            <iframe
                                style={{ width: '100%', height: '100%' }}
                                src={currentSlide.src}
                                title={currentSlide.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}

                        {/* IMAGE TYPE */}
                        {currentSlide.type === 'image' && (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                <img src={currentSlide.src} alt={currentSlide.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            </div>
                        )}

                        {/* NEWS TYPE */}
                        {currentSlide.type === 'news' && (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                padding: '40px',
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${currentSlide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                gap: '20px',
                                color: 'white'
                            }}>
                                <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>
                                    {currentSlide.title}
                                </h4>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px' }}>
                                    {currentSlide.description}
                                </p>
                                <a
                                    href={currentSlide.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover-lift"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 24px',
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-full)',
                                        fontWeight: '600',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Habere Git <ExternalLink size={16} />
                                </a>
                            </div>
                        )}

                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="hover-lift"
                    style={{
                        position: 'absolute',
                        right: '-20px',
                        zIndex: 10,
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid #cbd5e1',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-md)',
                        color: 'var(--text-primary)'
                    }}
                >
                    <ChevronRight size={24} />
                </button>

            </div>

            <div style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {currentSlide.type !== 'news' && currentSlide.description}
            </div>
        </div>
    );
}
