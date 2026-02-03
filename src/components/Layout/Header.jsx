import React, { useState, useRef, useEffect } from 'react';
import Container from './Container';
import { COMPANY_INFO, NOTIFICATIONS } from '../../data/mockData';
import { Phone, Mail, Hash, User, PhoneCall, LogOut, Bell } from 'lucide-react';
import mmoLogo from '../../assets/mmo_bg.png';

export default function Header({ onLogout }) {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationRef = useRef(null);
    const newCount = NOTIFICATIONS.filter(n => n.isNew).length;

    // Close notifications when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                <Container isWide={true}>
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

                        {/* RIGHT: MMO Logo, Notifications & Logout */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>

                            {/* Notification Icon */}
                            <div style={{ position: 'relative' }} ref={notificationRef}>
                                <button
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        backgroundColor: '#f1f5f9',
                                        color: '#64748b',
                                        border: 'none',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        transition: 'all 0.2s'
                                    }}
                                    className="hover-lift"
                                >
                                    <Bell size={20} />
                                    {newCount > 0 && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '-4px',
                                            right: '-4px',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            fontSize: '10px',
                                            fontWeight: '700',
                                            padding: '2px 6px',
                                            borderRadius: '10px',
                                            border: '2px solid white'
                                        }}>
                                            {newCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                {isNotificationsOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        marginTop: '12px',
                                        width: '320px',
                                        backgroundColor: 'white',
                                        borderRadius: '16px',
                                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                                        border: '1px solid #e2e8f0',
                                        zIndex: 100,
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>Bildirimler</h4>
                                        </div>
                                        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
                                            {NOTIFICATIONS.length === 0 ? (
                                                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                    Yeni bildirim bulunmuyor.
                                                </div>
                                            ) : (
                                                NOTIFICATIONS.map(notif => (
                                                    <div
                                                        key={notif.id}
                                                        style={{
                                                            padding: '16px',
                                                            borderBottom: '1px solid #f1f5f9',
                                                            backgroundColor: notif.isNew ? '#eff6ff' : 'white',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                        className="hover-bg-slate-50"
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: notif.isNew ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                                                                {notif.isNew ? '● Yeni Rapor' : 'Rapor Bildirimi'}
                                                            </span>
                                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{notif.date}</span>
                                                        </div>
                                                        <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.4', color: notif.isNew ? '#1e3a8a' : 'var(--text-secondary)' }}>
                                                            {notif.message}
                                                        </p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>
                                            <button style={{ border: 'none', background: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                                                Tümünü Gör
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

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
