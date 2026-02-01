import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export default function LocationList({ locations, onSelectLocation }) {
    return (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {locations.map((loc) => (
                <div
                    key={loc.id}
                    onClick={() => onSelectLocation(loc)}
                    className="hover-lift"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '24px',
                        border: '1px solid #e2e8f0',
                        boxShadow: 'var(--shadow-sm)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%' // uniform height
                    }}
                >
                    <div>
                        <div style={{
                            display: 'inline-flex',
                            padding: '12px',
                            backgroundColor: '#eff6ff',
                            borderRadius: '12px',
                            marginBottom: '16px',
                            color: 'var(--color-info)'
                        }}>
                            <MapPin size={24} />
                        </div>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                            {loc.name}
                        </h3>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px', lineHeight: '1.5' }}>
                            {loc.address}
                        </p>

                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            {loc.description}
                        </div>
                    </div>

                    <div style={{
                        marginTop: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        color: 'var(--color-info)',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        gap: '8px'
                    }}>
                        Ekipmanları Görüntüle <ArrowRight size={16} />
                    </div>
                </div>
            ))}
        </div>
    );
}
