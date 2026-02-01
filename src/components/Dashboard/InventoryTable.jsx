import React from 'react';
import { Download, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export default function InventoryTable({ items, categoryName, onDownload }) {
    const getStatusDisplay = (status) => {
        if (status === 'Uygun') return { text: 'Uygun', icon: <CheckCircle size={18} color="var(--color-success)" /> };
        // Map Kusurlu/Hafif Kusurlu to Sakıncalı
        return { text: 'Sakıncalı', icon: <AlertTriangle size={18} color="var(--color-danger)" /> };
    };

    const getDaysRemaining = (nextDateStr) => {
        if (!nextDateStr) return 0;

        // Parse "DD.MM.YYYY" manually if string
        let next;
        if (typeof nextDateStr === 'string' && nextDateStr.includes('.')) {
            const [day, month, year] = nextDateStr.split('.').map(Number);
            next = new Date(year, month - 1, day);
        } else {
            next = new Date(nextDateStr);
        }

        const today = new Date();
        // Clear times to only compare dates
        today.setHours(0, 0, 0, 0);
        next.setHours(0, 0, 0, 0);

        const diffTime = next - today;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    return (
        <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
        }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{categoryName} Envanter Listesi</h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f1f5f9', color: 'var(--text-secondary)', textAlign: 'left' }}>
                            {/* Removed Ekipman Bilgisi Column */}
                            <th style={{ padding: '16px', fontWeight: '600' }}>Marka / Seri No</th>
                            <th style={{ padding: '16px', fontWeight: '600' }}>Bulunduğu Yer</th>
                            <th style={{ padding: '16px', fontWeight: '600' }}>Son Kontrol</th>
                            <th style={{ padding: '16px', fontWeight: '600' }}>Gelecek Kontrol</th>
                            <th style={{ padding: '16px', fontWeight: '600', textAlign: 'center' }}>Kalan Gün</th>
                            <th style={{ padding: '16px', fontWeight: '600' }}>Eksiklikler</th>
                            <th style={{ padding: '16px', fontWeight: '600' }}>Sonuç</th>
                            <th style={{ padding: '16px', fontWeight: '600' }}>Periyodik Kontrol Raporu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Bu kategoride kayıtlı ekipman bulunamadı.
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => {
                                const statusInfo = getStatusDisplay(item.reportStatus);
                                const daysRemaining = getDaysRemaining(item.nextControlDate);

                                let countdownStyle = { fontWeight: '700', textAlign: 'center', display: 'block' };
                                if (daysRemaining < 0) {
                                    countdownStyle.color = 'var(--color-danger)';
                                } else if (daysRemaining < 10) {
                                    countdownStyle.color = '#eab308'; // Warning Yellow
                                } else {
                                    countdownStyle.color = 'var(--color-success)';
                                }

                                return (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        {/* Removed item.name usage here */}
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{item.brand}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{item.serialNo}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>{item.place}</td>
                                        <td style={{ padding: '16px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{item.controlDate || '-'}</td>
                                        <td style={{ padding: '16px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{item.nextControlDate || '-'}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={countdownStyle}>
                                                {daysRemaining}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            {item.deficiencies.length > 0 ? (
                                                <ul style={{ listStyleType: 'disc', paddingLeft: '16px', color: 'var(--color-danger)', fontSize: '0.85rem' }}>
                                                    {item.deficiencies.map((d, i) => <li key={i}>{d}</li>)}
                                                </ul>
                                            ) : (
                                                <span style={{ color: 'var(--color-success)', fontSize: '0.85rem' }}>-</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                {statusInfo.icon}
                                                <span>{statusInfo.text}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <button
                                                onClick={() => onDownload(item.id)}
                                                className="hover-lift"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '8px 12px',
                                                    backgroundColor: 'var(--color-primary)',
                                                    color: 'white',
                                                    borderRadius: 'var(--radius-md)',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                <Download size={14} /> İndir
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
