import React from 'react';
import { Folder, CheckCircle, XCircle } from 'lucide-react';

export default function CategoryGrid({ categories, onSelectCategory, inventory, selectedLocationId }) {

    // Helper to get stats used for display
    const getStats = (categoryId) => {
        const items = inventory.filter(i => i.locationId === selectedLocationId && i.categoryId === categoryId);
        const suitable = items.filter(i => i.reportStatus === 'Uygun').length;
        const unsuitable = items.filter(i => i.reportStatus !== 'Uygun').length; // Kusurlu + Hafif Kusurlu
        return { suitable, unsuitable, total: items.length };
    };

    return (
        <div>
            <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Ekipmanlar</h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {categories.map((cat) => {
                    const stats = getStats(cat.id);
                    return (
                        <div
                            key={cat.id}
                            onClick={() => onSelectCategory(cat)}
                            className="hover-lift"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '20px',
                                border: '1px solid #e2e8f0',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Folder size={32} fill="#fbbf24" color="#d97706" strokeWidth={1.5} />
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                                    {cat.label}
                                </span>
                            </div>

                            {/* Stats Badges */}
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                marginTop: '4px',
                                borderTop: '1px solid #f1f5f9',
                                paddingTop: '12px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }} title="Uygun Raporlar">
                                    <CheckCircle size={16} color="var(--color-success)" />
                                    <span style={{ fontWeight: '600', color: 'var(--color-success)' }}>{stats.suitable}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }} title="Sakıncalı/Eksik Raporlar">
                                    <XCircle size={16} color="var(--color-danger)" />
                                    <span style={{ fontWeight: '600', color: 'var(--color-danger)' }}>{stats.unsuitable}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
