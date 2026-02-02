import React from 'react';
import Container from './Container';
import { COMPANY_INFO } from '../../data/mockData';
import { Phone, Mail, Hash, User, PhoneCall, LogOut } from 'lucide-react';
import mmoLogo from '../../assets/mmo_bg.png';

export default function Header({ onLogout }) {
    return (
        <>
            {/* Background Watermark */}
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                backgroundImage: `url(${mmoLogo})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                opacity: 0.05,
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <header style={{
                backgroundColor: 'var(--color-surface)',
                borderBottom: '1px solid #e2e8f0',
                padding: '16px 0',
                marginBottom: 'var(--spacing-xl)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>

                        {/* LEFT: Logo and Info */}
                        <div style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                            {/* Izeltaş Logo Placeholder */}
                            <div style={{
                                width: '120px',
                                height: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                            }}>
                                <h1 style={{
                                    fontFamily: 'Impact, sans-serif',
                                    color: '#e30613',
                                    fontSize: '2.5rem',
                                    letterSpacing: '2px',
                                    margin: 0,
                                    fontStyle: 'italic'
                                }}>
                                    İZELTAS
                                </h1>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <h1 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    margin: 0
                                }}>
                                    {COMPANY_INFO.name}
                                </h1>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                        <span style={{ fontWeight: '600' }}>Firma No:</span>
                                        <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{COMPANY_INFO.id}</span>
                                    </div>

                                    {/* İletişim Sub-lines */}
                                    <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '4px', paddingTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span>
                                                Kontrol Mühendisi: Mehmet Ali Akgül (0549 644 68 35) - <a href="mailto:mehmetali.akgul@mmo.org.tr" style={{ color: 'inherit', textDecoration: 'underline' }}>mehmetali.akgul@mmo.org.tr</a>
                                            </span>
                                        </div>
                                        <div>
                                            Teknik Hizmetler: 0 232 462 33 33 (D: 2205,2236,2263) - <a href="mailto:pk-izmir@mmo.org.tr" style={{ color: 'inherit', textDecoration: 'underline' }}>pk-izmir@mmo.org.tr</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: MMO Logo & Logout */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img src={mmoLogo} alt="MMO Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>

                            <button
                                onClick={onLogout}
                                className="hover-lift"
                                title="Güvenli Çıkış"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    backgroundColor: '#111827',
                                    color: '#ffffff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                <LogOut size={20} />
                            </button>
                        </div>

                    </div>
                </Container>
            </header>
        </>
    );
}
