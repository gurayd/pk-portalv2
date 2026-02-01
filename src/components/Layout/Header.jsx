import React from 'react';
import Container from './Container';
import { COMPANY_INFO } from '../../data/mockData';
import { Phone, Mail, Hash } from 'lucide-react';
import mmoLogo from '../../assets/mmo_bg.png';

export default function Header() {
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
                padding: 'var(--spacing-xl) 0',
                marginBottom: 'var(--spacing-xl)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <Container>
                    <div style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                        {/* Izeltaş Logo Placeholder */}
                        <div style={{
                            width: '120px',
                            height: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            // border: '1px solid #e2e8f0',
                            // borderRadius: '8px'
                        }}>
                            {/* Simulating Izeltaş Logo with Text/Style */}
                            <h1 style={{
                                fontFamily: 'Impact, sans-serif',
                                color: '#e30613', // Izeltaş Red
                                fontSize: '2.5rem',
                                letterSpacing: '2px',
                                margin: 0,
                                fontStyle: 'italic'
                            }}>
                                İZELTAS
                            </h1>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            <h1 style={{
                                fontSize: '1.25rem',
                                fontWeight: '800',
                                letterSpacing: '-0.025em',
                                textTransform: 'uppercase'
                            }}>
                                {COMPANY_INFO.name}
                            </h1>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{COMPANY_INFO.address.split(',')[0]}</span>
                                    <span style={{ color: '#cbd5e1' }}>|</span>
                                    <span>{COMPANY_INFO.address.split(',')[1]}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Hash size={14} />
                                        <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{COMPANY_INFO.id}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Phone size={14} />
                                        <span>{COMPANY_INFO.phone}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Mail size={14} />
                                        <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: 'var(--color-info)' }}>{COMPANY_INFO.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </header>
        </>
    );
}
