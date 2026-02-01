import React from 'react';

export default function StatCard({ label, value, type = 'neutral', onClick }) {
    const getColors = () => {
        switch (type) {
            case 'danger': return { border: 'var(--color-danger)', bg: '#fef2f2', text: 'var(--color-danger)' };
            case 'warning': return { border: 'var(--color-warning)', bg: '#fffbeb', text: 'var(--color-warning)' };
            case 'success': return { border: 'var(--color-success)', bg: '#ecfdf5', text: 'var(--color-success)' };
            default: return { border: 'transparent', bg: 'var(--color-surface)', text: 'var(--text-primary)' };
        }
    };

    const style = getColors();

    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px 20px',
                boxShadow: 'var(--shadow-md)',
                border: `1px solid ${style.border === 'transparent' ? '#e2e8f0' : style.border}`,
                cursor: onClick ? 'pointer' : 'default',
                transition: 'var(--transition-normal)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden'
            }}
            className="hover-lift"
        >
            {/* Accent Top Bar if Danger/Warning */}
            {type !== 'neutral' && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: style.border }} />
            )}

            <span style={{
                fontSize: '0.9rem',
                fontWeight: '500',
                color: 'var(--text-secondary)'
            }}>
                {label}
            </span>
            <span style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: type === 'neutral' ? 'var(--text-primary)' : style.text
            }}>
                {value}
            </span>
        </div>
    );
}
