import React from 'react';
import { User, Phone } from 'lucide-react';

export default function ContactInfo() {
    return (
        <div style={{
            marginTop: '24px',
            padding: '24px',
            backgroundColor: '#f1f5f9',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                İletişim
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <User size={18} color="var(--color-primary)" />
                    <span>
                        <span style={{ fontWeight: '600' }}>Kontrol Mühendisi:</span> Mehmet Ali Akgül - 0549 644 68 35 - <a href="mailto:mehmetali.akgul@mmo.org.tr" style={{ color: 'var(--color-info)' }}>mehmetali.akgul@mmo.org.tr</a>
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <Phone size={18} color="var(--color-primary)" />
                    <span>
                        <span style={{ fontWeight: '600' }}>Teknik Hizmetler Birimi:</span> 0 232 462 33 33 - 2205 / 2263 / 2236 - <a href="mailto:pk-izmir@mmo.org.tr" style={{ color: 'var(--color-info)' }}>pk-izmir@mmo.org.tr</a>
                    </span>
                </div>
            </div>
        </div>
    );
}
