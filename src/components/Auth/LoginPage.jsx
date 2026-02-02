import React, { useState } from 'react';
import mmoLogo from '../../assets/mmo_bg.png';
import { Lock, User, LogIn } from 'lucide-react';

export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '12345' && password === '12345') {
            onLogin();
        } else {
            setError('Geçersiz kullanıcı adı veya şifre.');
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background MMO Logo */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                backgroundImage: `url(${mmoLogo})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                opacity: 0.07,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '400px',
                padding: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '8px' }}>
                        PK Portal Giriş
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Devam etmek için lütfen giriş yapın
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                        (Demo Giriş Bilgileri: 12345 / 12345)
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 14px 14px 48px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                backgroundColor: '#fff',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                            autoComplete="off"
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 14px 14px 48px',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                backgroundColor: '#fff',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                        />
                    </div>

                    {error && (
                        <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem', textAlign: 'left', margin: 0 }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="hover-lift"
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '8px',
                            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        <LogIn size={20} /> Giriş Yap
                    </button>
                </form>

                <div style={{ marginTop: '32px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    © 2026 Makina Mühendisleri Odası
                </div>
            </div>
        </div>
    );
}
