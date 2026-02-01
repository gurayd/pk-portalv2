import React from 'react';
import { X, AlertTriangle, FileText, Download } from 'lucide-react';
import { DEFICIENCIES } from '../../data/mockData';

export default function DeficiencyTable({ onClose, regionTitle }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#f8fafc'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertTriangle color="var(--color-danger)" size={20} />
                            Sakıncalı Ekipmanlar
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{regionTitle}</p>
                    </div>
                    <button onClick={onClose} style={{ padding: '8px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '20px', overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: 'var(--text-secondary)' }}>
                                <th style={{ padding: '12px' }}>Ekipman</th>
                                <th style={{ padding: '12px' }}>Eksiklik / Sorun</th>
                                <th style={{ padding: '12px' }}>Önem Derecesi</th>
                                <th style={{ padding: '12px' }}>Tarih</th>
                                <th style={{ padding: '12px' }}>Aksiyon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DEFICIENCIES.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '12px', fontWeight: '500' }}>{item.equipment}</td>
                                    <td style={{ padding: '12px' }}>{item.deficiency}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            backgroundColor: item.severity === 'Critical' ? '#fee2e2' : '#fef3c7',
                                            color: item.severity === 'Critical' ? '#dc2626' : '#d97706'
                                        }}>
                                            {item.severity}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{item.date}</td>
                                    <td style={{ padding: '12px' }}>
                                        <button style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            color: 'var(--color-info)',
                                            fontSize: '0.85rem',
                                            fontWeight: '500'
                                        }}>
                                            <Download size={14} /> Rapor
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', fontWeight: '500', color: 'var(--text-secondary)' }}>Kapat</button>
                    <button style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        fontWeight: '500'
                    }}>
                        Tüm Raporları İndir
                    </button>
                </div>
            </div>
        </div>
    );
}
