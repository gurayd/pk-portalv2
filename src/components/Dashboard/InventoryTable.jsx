import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Download, CheckCircle, AlertTriangle, ArrowUpDown, Filter, X } from 'lucide-react';

export default function InventoryTable({ items, categoryName, onDownload }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [activeFilters, setActiveFilters] = useState({}); // { place: ['Depo A', 'Depo B'], reportStatus: ['Kusurlu'] }
    const [openFilter, setOpenFilter] = useState(null); // 'place' | 'reportStatus' | null

    const filterRef = useRef(null);

    // Close filter dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setOpenFilter(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getStatusDisplay = (status) => {
        if (status === 'Uygun') return { text: 'Uygun', icon: <CheckCircle size={18} color="var(--color-success)" /> };
        return { text: 'Sakıncalı', icon: <AlertTriangle size={18} color="var(--color-danger)" /> };
    };

    const getDaysRemaining = (nextDateStr) => {
        if (!nextDateStr) return 0;
        let next;
        if (typeof nextDateStr === 'string' && nextDateStr.includes('.')) {
            const [day, month, year] = nextDateStr.split('.').map(Number);
            next = new Date(year, month - 1, day);
        } else {
            next = new Date(nextDateStr);
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        next.setHours(0, 0, 0, 0);
        const diffTime = next - today;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    // --- SORTING LOGIC ---
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // --- FILTER LOGIC ---
    const toggleFilterMenu = (key) => {
        setOpenFilter(openFilter === key ? null : key);
    };

    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => {
            const currentValues = prev[key] || [];
            if (currentValues.includes(value)) {
                const newValues = currentValues.filter(v => v !== value);
                if (newValues.length === 0) {
                    const { [key]: unused, ...rest } = prev;
                    return rest;
                }
                return { ...prev, [key]: newValues };
            } else {
                return { ...prev, [key]: [...currentValues, value] };
            }
        });
    };

    const clearFilter = (key) => {
        setActiveFilters(prev => {
            const { [key]: unused, ...rest } = prev;
            return rest;
        });
    }

    // --- DATA PROCESSING ---
    const uniqueValues = useMemo(() => {
        return {
            place: [...new Set(items.map(i => i.place))].sort(),
            reportStatus: [...new Set(items.map(i => i.reportStatus))].sort()
        };
    }, [items]);

    const processedItems = useMemo(() => {
        let result = [...items];

        // 1. Filtering
        Object.keys(activeFilters).forEach(key => {
            if (activeFilters[key] && activeFilters[key].length > 0) {
                result = result.filter(item => activeFilters[key].includes(item[key]));
            }
        });

        // 2. Sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Custom Sort Logic for specific columns
                if (sortConfig.key === 'daysRemaining') {
                    aValue = getDaysRemaining(a.nextControlDate);
                    bValue = getDaysRemaining(b.nextControlDate);
                    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
                }

                // Generic String Sort
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.direction === 'asc'
                        ? aValue.localeCompare(bValue, 'tr')
                        : bValue.localeCompare(aValue, 'tr');
                }

                if (aValue === bValue) return 0;
                if (aValue === null || aValue === undefined) return 1;
                if (bValue === null || bValue === undefined) return -1;

                return sortConfig.direction === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue < bValue ? 1 : -1);
            });
        }

        return result;
    }, [items, sortConfig, activeFilters]);


    // --- RENDER HELPERS ---
    const renderHeaderCell = (label, sortKey, filterKey = null) => {
        const isSorted = sortConfig.key === sortKey;
        const isFiltered = filterKey && activeFilters[filterKey];

        return (
            <th style={{ padding: '16px', whiteSpace: 'nowrap', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>

                    {/* Label & Sort */}
                    <div onClick={() => handleSort(sortKey)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: '700', color: isSorted ? 'var(--color-primary)' : 'inherit' }}>{label}</span>
                        <ArrowUpDown size={14} color={isSorted ? 'var(--color-primary)' : '#cbd5e1'} />
                    </div>

                    {/* Filter Trigger */}
                    {filterKey && (
                        <div
                            onClick={(e) => { e.stopPropagation(); toggleFilterMenu(filterKey); }}
                            style={{
                                padding: '4px',
                                borderRadius: '4px',
                                backgroundColor: isFiltered ? '#e0f2fe' : 'transparent',
                                color: isFiltered ? 'var(--color-primary)' : '#94a3b8'
                            }}
                        >
                            <Filter size={14} fill={isFiltered ? 'currentColor' : 'none'} />
                        </div>
                    )}
                </div>

                {/* Filter Dropdown */}
                {filterKey && openFilter === filterKey && (
                    <div
                        ref={filterRef}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            marginTop: '8px',
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            zIndex: 50,
                            minWidth: '200px',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Filtrele</span>
                            {isFiltered && (
                                <button onClick={() => clearFilter(filterKey)} style={{ fontSize: '0.75rem', color: 'var(--color-danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    Temizle
                                </button>
                            )}
                        </div>
                        <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '8px' }}>
                            {uniqueValues[filterKey].map(val => (
                                <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-slate-50">
                                    <input
                                        type="checkbox"
                                        checked={activeFilters[filterKey]?.includes(val) || false}
                                        onChange={() => handleFilterChange(filterKey, val)}
                                    />
                                    {val}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </th>
        );
    };

    return (
        <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid #e2e8f0',
            overflow: 'visible' // Allow dropdowns to overflow if needed, though they are usually inside container
        }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{categoryName} Envanter Listesi</h3>
            </div>

            <div style={{ overflowX: 'auto', minHeight: '400px' }}> {/* Min height to allow sorting dropdown space if list empty */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f1f5f9', color: 'var(--text-secondary)', textAlign: 'left' }}>
                            {renderHeaderCell("Marka / Seri No", "brand")}
                            {renderHeaderCell("Bulunduğu Yer", "place", "place")} {/* Sorter + Filter */}
                            <th style={{ padding: '16px', fontWeight: '600' }}>Son Kontrol</th>
                            <th style={{ padding: '16px', fontWeight: '600' }}>Gelecek Kontrol</th>
                            {renderHeaderCell("Kalan Gün", "daysRemaining")} {/* Only Sort */}
                            <th style={{ padding: '16px', fontWeight: '600' }}>Eksiklikler</th>
                            {renderHeaderCell("Sonuç", "reportStatus", "reportStatus")} {/* Sorter + Filter */}
                            <th style={{ padding: '16px', fontWeight: '600' }}>Periyodik Kontrol Raporu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedItems.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    {items.length === 0 ? "Bu kategoride kayıtlı ekipman bulunamadı." : "Filtreleme sonucunda kayıt bulunamadı."}
                                </td>
                            </tr>
                        ) : (
                            processedItems.map((item) => {
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
