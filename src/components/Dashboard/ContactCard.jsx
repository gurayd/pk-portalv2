import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function ContactCard({ role, name, phone, email }) {
    return (
        <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '16px', // Compact padding
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        }}>
            {/* Avatar Placeholder */}
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                flexShrink: 0
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    {role}
                </span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{name}</span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <Phone size={12} /> {phone}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <Mail size={12} />
                        <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'inherit' }}>{email}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
