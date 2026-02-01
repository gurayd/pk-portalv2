import React from 'react';
import { FileText } from 'lucide-react';

export default function ContractCard({ contracts }) {
    return (
        <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
        }}>
            {contracts.map((c, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.label}</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{c.value}</span>
                </div>
            ))}
        </div>
    );
}
