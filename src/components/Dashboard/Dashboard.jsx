import React, { useState, useRef, useEffect, useMemo } from 'react';
import Container from '../Layout/Container';
import Header from '../Layout/Header';

// New Components
import LocationList from './LocationList';
import CategoryGrid from './CategoryGrid';
import InventoryTable from './InventoryTable';
import AnnouncementCarousel from './AnnouncementCarousel';
import ContactInfo from './ContactInfo';

// Data
import { LOCATIONS, CATEGORIES, INVENTORY, ARCHIVE_INVENTORY, SUB_CATEGORIES, AUTHORIZED_PERSONS, CONTRACTS, DEFICIENCY_STATS } from '../../data/mockData';
import { ChevronRight, Home, FileSpreadsheet, Download, FileArchive, ChevronDown, Archive, Folder, Calendar, Users, Briefcase, FileText, BarChart3, Info, Copy, Check } from 'lucide-react';

export default function Dashboard({ onLogout }) {
    const [activeTab, setActiveTab] = useState('LIVE'); // LIVE | CONTRACTS | ARCHIVE | OFFICIALS | STATS
    const [view, setView] = useState('LOCATIONS'); // LOCATIONS | CATEGORIES | INVENTORY | YEARS | DATES | LIST | CONTRACT_LIST | CONTRACT_DETAILS | STATS_PAGE
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedContract, setSelectedContract] = useState(null);
    const [selectedStatType, setSelectedStatType] = useState('deficiency_process');
    const [selectedStatCategory, setSelectedStatCategory] = useState('vinc');
    const [statReportNo, setStatReportNo] = useState('');
    const [selectedEquipmentTypes, setSelectedEquipmentTypes] = useState(['ALL']);
    const [selectedLocations, setSelectedLocations] = useState(['ALL']);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);
    const filterDropdownRef = useRef(null);
    const locationFilterRef = useRef(null);

    const EQUIPMENT_GROUPS = [
        {
            id: 'lifting',
            label: 'Kaldırma İletme Ekipmanları',
            types: ['vinc', 'transpalet', 'platform', 'forklift', 'kazici']
        },
        {
            id: 'pressure',
            label: 'Basınçlı Kaplar',
            types: ['buhar', 'genlesme', 'sicaksu', 'kompresor', 'boyler']
        },
        {
            id: 'other',
            label: 'Diğer',
            types: ['tezgah', 'kapi', 'yangin', 'havalandirma', 'raf', 'ndt']
        }
    ];

    const allTypeIds = [...EQUIPMENT_GROUPS.flatMap(g => g.types)];

    const equipmentHistory = useMemo(() => {
        if (!statReportNo) return null;
        const current = INVENTORY.find(i => i.reportNo === statReportNo);
        const archived = ARCHIVE_INVENTORY.find(i => i.reportNo === statReportNo);
        const targetSerialNo = (current || archived)?.serialNo;

        if (!targetSerialNo) return null;

        const allRecords = [
            ...INVENTORY.filter(i => i.serialNo === targetSerialNo),
            ...ARCHIVE_INVENTORY.filter(i => i.serialNo === targetSerialNo)
        ];

        return allRecords.sort((a, b) => {
            const dateA = new Date((a.controlDate || '').split('.').reverse().join('-'));
            const dateB = new Date((b.controlDate || '').split('.').reverse().join('-'));
            if (isNaN(dateA)) return 1;
            if (isNaN(dateB)) return -1;
            return dateB - dateA;
        });
    }, [statReportNo]);

    const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
    const downloadDropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target)) {
                setIsDownloadDropdownOpen(false);
            }
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setIsFilterDropdownOpen(false);
            }
            if (locationFilterRef.current && !locationFilterRef.current.contains(event.target)) {
                setIsLocationFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Navigation Handlers
    const handleSelectLocation = (loc) => {
        setSelectedLocation(loc);
        if (activeTab === 'LIVE') {
            setView('INVENTORY');
            setSelectedEquipmentTypes(['ALL']);
        } else if (activeTab === 'ARCHIVE') {
            setView('YEARS');
        } else {
            setView('LIST');
        }
    };

    const handleSelectCategory = (cat) => {
        setSelectedCategory(cat);
        if (cat.isFolder) {
            setView('SUB_CATEGORIES');
        } else {
            setView('INVENTORY');
        }
    };

    const handleSelectSubCategory = (sub) => {
        setSelectedSubCategory(sub);
        setView('INVENTORY');
    };

    const handleGoHome = () => {
        if (activeTab === 'LIVE') {
            setView('INVENTORY');
            setSelectedLocation(null);
            setSelectedLocations(['ALL']);
            setSelectedEquipmentTypes(['ALL']);
        } else {
            setView('LOCATIONS');
            setSelectedLocation(null);
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            setSelectedYear(null);
            setSelectedDate(null);
        }
    };

    const handleGoToCategories = () => {
        setView('CATEGORIES');
        setSelectedCategory(null);
        setSelectedSubCategory(null);
    };

    const handleGoToSubCategories = () => {
        setView('SUB_CATEGORIES');
        setSelectedSubCategory(null);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'CONTRACTS') {
            setView('CONTRACT_LIST');
        } else if (tab === 'STATS') {
            setView('STATS_PAGE');
        } else if (tab === 'LIVE') {
            setView('INVENTORY');
            setSelectedLocation(null);
            setSelectedLocations(['ALL']);
            setSelectedEquipmentTypes(['ALL']);
        } else if (tab === 'ANNOUNCEMENTS') {
            setView('ANNOUNCEMENTS_VIEW');
        } else {
            setView('LOCATIONS');
            setSelectedLocation(null);
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            setSelectedYear(null);
            setSelectedDate(null);
        }
    };

    const handleSelectContract = (contract) => {
        setSelectedContract(contract);
        setSelectedLocation(LOCATIONS.find(l => l.id === contract.locationId));
        setView('CONTRACT_DETAILS');
    };

    const handleSelectArchiveYear = (year) => {
        setSelectedYear(year);
        setView('DATES');
    };

    const handleSelectArchiveDate = (date) => {
        setSelectedDate(date);
        setView('INVENTORY');
    };

    const handleDownload = (id) => {
        // Mock download single report
        alert(`Rapor (ID: ${id}) sunucudan indiriliyor...`);
    };

    // NEW: Download All Excel
    const handleDownloadExcel = () => {
        const items = filteredInventory;
        const count = items.length;
        const target = selectedLocation ? selectedLocation.name :
            (selectedLocations.includes('ALL') ? 'Tüm Adresler' : `${selectedLocations.length} Seçili Adres`);
        alert(`'${target}' için Tüm Envanter Listesi (${count} ekipman) Excel formatında indiriliyor...`);
    };

    const handleDownloadAllReports = () => {
        const locName = selectedLocation ? selectedLocation.name :
            (selectedLocations.includes('ALL') ? 'Tüm Adresler' : `${selectedLocations.length} Seçili Adres`);
        const catName = selectedCategory ? selectedCategory.label : '';
        const target = catName ? `${locName} - ${catName}` : locName;
        alert(`'${target}' için Raporlar (PDF/ZIP) hazırlanıyor...`);
        setIsDownloadDropdownOpen(false);
    };

    const handleDownloadFilteredReports = (status) => {
        const locName = selectedLocation ? selectedLocation.name :
            (selectedLocations.includes('ALL') ? 'Tüm Adresler' : `${selectedLocations.length} Seçili Adres`);
        const catName = selectedCategory ? `(${selectedCategory.label}) ` : '';
        alert(`'${locName}' lokasyonundaki ${catName}sadece '${status}' olan raporlar indiriliyor...`);
        setIsDownloadDropdownOpen(false);
    };

    // Live Filter
    const filteredInventory = useMemo(() => {
        let items = [...INVENTORY];

        // Location Filter
        if (!selectedLocations.includes('ALL')) {
            items = items.filter(item => selectedLocations.includes(item.locationId));
        }

        // Equipment Type Filter
        if (!selectedEquipmentTypes.includes('ALL')) {
            items = items.filter(item => selectedEquipmentTypes.includes(item.categoryId));
        }

        return items;
    }, [selectedLocations, selectedEquipmentTypes]);

    // Archive Filter
    const archiveYears = selectedLocation
        ? [...new Set(ARCHIVE_INVENTORY.filter(i => i.locationId === selectedLocation.id).map(i => i.year))].sort((a, b) => b - a)
        : [];

    const archiveDates = selectedLocation && selectedYear
        ? [...new Set(ARCHIVE_INVENTORY.filter(i => i.locationId === selectedLocation.id && i.year === selectedYear).map(i => i.controlDate))]
        : [];

    const archiveInventory = selectedLocation && selectedDate
        ? ARCHIVE_INVENTORY.filter(i => i.locationId === selectedLocation.id && i.controlDate === selectedDate)
        : [];

    return (
        <>
            <Header onLogout={onLogout} />
            <Container isWide={true}>
                <main style={{ paddingBottom: '60px' }}>

                    {/* Top Navigation Bar: Breadcrumbs + Actions */}
                    <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Tab Switcher */}
                        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '0', overflowX: 'auto' }}>
                            {[
                                { id: 'LIVE', label: 'Güncel', icon: <Home size={18} /> },
                                { id: 'ANNOUNCEMENTS', label: 'Duyurular', icon: <Info size={18} /> },
                                { id: 'CONTRACTS', label: 'Sözleşmeler', icon: <FileText size={18} /> },
                                { id: 'ARCHIVE', label: 'Arşiv', icon: <Archive size={18} /> },
                                { id: 'OFFICIALS', label: 'Yetkili Kişiler', icon: <Users size={18} /> },
                                { id: 'STATS', label: 'İstatistik', icon: <BarChart3 size={18} /> }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    style={{
                                        padding: '12px 24px',
                                        backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                                        border: '1px solid ' + (activeTab === tab.id ? '#e2e8f0' : 'transparent'),
                                        borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '1px solid transparent',
                                        borderRadius: '8px 8px 0 0',
                                        fontWeight: '700',
                                        color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '-1px',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            {/* Left: Breadcrumbs */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <div
                                    onClick={activeTab === 'STATS' ? undefined : handleGoHome}
                                    style={{
                                        cursor: activeTab === 'STATS' ? 'default' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: (view === 'LOCATIONS' || view === 'CONTRACT_LIST' || view === 'STATS_PAGE' || view === 'ANNOUNCEMENTS_VIEW') ? 'var(--text-primary)' : 'var(--text-secondary)'
                                    }}
                                    className={(activeTab !== 'STATS' && view !== 'LOCATIONS' && view !== 'CONTRACT_LIST' && view !== 'STATS_PAGE') ? 'hover-underline' : ''}
                                >
                                    {activeTab === 'LIVE' ? <Home size={16} /> :
                                        activeTab === 'ANNOUNCEMENTS' ? <Info size={16} /> :
                                            activeTab === 'CONTRACTS' ? <FileText size={16} /> :
                                                activeTab === 'ARCHIVE' ? <Archive size={16} /> :
                                                    activeTab === 'OFFICIALS' ? <Users size={16} /> : <BarChart3 size={16} />}
                                    {activeTab === 'LIVE' ? 'Güncel' :
                                        activeTab === 'ANNOUNCEMENTS' ? 'Duyurular' :
                                            activeTab === 'CONTRACTS' ? 'Sözleşmeler' :
                                                activeTab === 'ARCHIVE' ? 'Arşiv' :
                                                    activeTab === 'OFFICIALS' ? 'Yetkili Kişiler' : 'İstatistik'}
                                </div>

                                {selectedLocation && (
                                    <>
                                        <ChevronRight size={16} />
                                        <span
                                            onClick={() => {
                                                if (activeTab === 'LIVE') handleGoHome();
                                                else if (activeTab === 'ARCHIVE') { setView('YEARS'); setSelectedYear(null); setSelectedDate(null); }
                                                else if (activeTab === 'CONTRACTS') { setView('CONTRACT_LIST'); setSelectedContract(null); }
                                                else { setView('LIST'); }
                                            }}
                                            style={{ cursor: 'pointer', fontWeight: view === (activeTab === 'LIVE' ? 'CATEGORIES' : activeTab === 'ARCHIVE' ? 'YEARS' : 'LIST') ? '600' : '400', color: view === (activeTab === 'LIVE' ? 'CATEGORIES' : activeTab === 'ARCHIVE' ? 'YEARS' : 'LIST') ? 'var(--text-primary)' : 'inherit' }}
                                        >
                                            {selectedLocation.name}
                                        </span>
                                    </>
                                )}

                                {activeTab === 'ARCHIVE' && selectedYear && (
                                    <>
                                        <ChevronRight size={16} />
                                        <span
                                            onClick={() => { setView('DATES'); setSelectedDate(null); }}
                                            style={{ cursor: 'pointer', fontWeight: view === 'DATES' ? '600' : '400', color: view === 'DATES' ? 'var(--text-primary)' : 'inherit' }}
                                        >
                                            {selectedYear}
                                        </span>
                                    </>
                                )}

                                {activeTab === 'ARCHIVE' && selectedDate && (
                                    <>
                                        <ChevronRight size={16} />
                                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                                            {selectedDate}
                                        </span>
                                    </>
                                )}

                                {/* Removed Category/SubCategory breadcrumbs for unified view */}
                            </div>

                            {/* Right: Actions */}
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                {(view === 'INVENTORY' || activeTab === 'LIVE' || view === 'CONTRACT_DETAILS') && (
                                    <>
                                        <button
                                            onClick={handleDownloadExcel}
                                            className="hover-lift"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                backgroundColor: '#107c41', // Excel Green
                                                color: 'white',
                                                padding: '10px 16px',
                                                borderRadius: 'var(--radius-md)',
                                                fontWeight: '600',
                                                fontSize: '0.9rem',
                                                boxShadow: 'var(--shadow-sm)'
                                            }}
                                        >
                                            <FileSpreadsheet size={18} />
                                            İş ekipmanları listesi
                                        </button>

                                        <div style={{ position: 'relative' }} ref={downloadDropdownRef}>
                                            <button
                                                onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
                                                className="hover-lift"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    backgroundColor: 'var(--color-primary)',
                                                    color: 'white',
                                                    padding: '10px 16px',
                                                    borderRadius: 'var(--radius-md)',
                                                    fontWeight: '600',
                                                    fontSize: '0.9rem',
                                                    boxShadow: 'var(--shadow-sm)'
                                                }}
                                            >
                                                <Download size={18} />
                                                Raporları İndir
                                                <ChevronDown size={16} />
                                            </button>

                                            {isDownloadDropdownOpen && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    right: 0,
                                                    marginTop: '8px',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '8px',
                                                    boxShadow: 'var(--shadow-lg)',
                                                    zIndex: 100,
                                                    minWidth: '220px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div
                                                        onClick={handleDownloadAllReports}
                                                        style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '0.9rem', borderBottom: '1px solid #f1f5f9' }}
                                                        className="hover-bg-slate-50"
                                                    >
                                                        Görüntülenen raporlar
                                                    </div>
                                                    <div
                                                        onClick={() => handleDownloadFilteredReports('Uygun')}
                                                        style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '0.9rem', borderBottom: '1px solid #f1f5f9' }}
                                                        className="hover-bg-slate-50"
                                                    >
                                                        Uygun Raporlar
                                                    </div>
                                                    <div
                                                        onClick={() => handleDownloadFilteredReports('Sakıncalı')}
                                                        style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '0.9rem' }}
                                                        className="hover-bg-slate-50"
                                                    >
                                                        Sakıncalı Raporlar
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Views */}
                    {view === 'LOCATIONS' && activeTab !== 'LIVE' && (
                        <>
                            <LocationList
                                locations={LOCATIONS}
                                onSelectLocation={(loc) => {
                                    setSelectedLocation(loc);
                                    if (activeTab === 'ARCHIVE') setView('YEARS');
                                    else setView('LIST');
                                }}
                            />
                        </>
                    )}

                    {/* ARCHIVE SPECIFIC VIEWS */}
                    {activeTab === 'ARCHIVE' && view === 'YEARS' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            {archiveYears.map(year => (
                                <div
                                    key={year}
                                    onClick={() => handleSelectArchiveYear(year)}
                                    className="hover-lift"
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '30px',
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '12px',
                                        cursor: 'pointer',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                >
                                    <Folder size={48} color="#64748b" fill="#f1f5f9" />
                                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{year}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'ARCHIVE' && view === 'DATES' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            {archiveDates.map(date => (
                                <div
                                    key={date}
                                    onClick={() => handleSelectArchiveDate(date)}
                                    className="hover-lift"
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '30px',
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '12px',
                                        cursor: 'pointer',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                >
                                    <Calendar size={48} color="#3b82f6" fill="#eff6ff" />
                                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{date}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'ARCHIVE' && view === 'INVENTORY' && (
                        <InventoryTable
                            items={archiveInventory}
                            categoryName={`${selectedLocation.name} - ${selectedDate}`}
                            onDownload={handleDownload}
                        />
                    )}

                    {/* LIVE SPECIFIC VIEWS */}


                    {activeTab === 'LIVE' && (view === 'INVENTORY' || view === 'LOCATIONS' || view === 'CATEGORIES' || view === 'SUB_CATEGORIES') && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Unified Global Table with Filters */}
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                                {/* Location Filter */}
                                <div style={{ position: 'relative', width: '300px' }} ref={locationFilterRef}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Adres / Lokasyon Seçimi</label>
                                    <div
                                        onClick={() => setIsLocationFilterOpen(!isLocationFilterOpen)}
                                        style={{
                                            padding: '12px 16px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                        }}
                                    >
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {selectedLocations.includes('ALL')
                                                ? 'Tüm Adresler'
                                                : `${selectedLocations.length} Adres Seçili`}
                                        </span>
                                        <ChevronDown size={18} color="#94a3b8" />
                                    </div>

                                    {isLocationFilterOpen && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            marginTop: '8px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            boxShadow: 'var(--shadow-lg)',
                                            zIndex: 110,
                                            padding: '12px'
                                        }}>
                                            <div
                                                onClick={() => setSelectedLocations(['ALL'])}
                                                style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', backgroundColor: selectedLocations.includes('ALL') ? '#eff6ff' : 'transparent' }}
                                            >
                                                <div style={{ width: '18px', height: '18px', border: '2px solid var(--color-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: selectedLocations.includes('ALL') ? 'var(--color-primary)' : 'transparent' }}>
                                                    {selectedLocations.includes('ALL') && <Check size={14} color="white" />}
                                                </div>
                                                <span style={{ fontWeight: '700' }}>Tüm Adresler</span>
                                            </div>
                                            {LOCATIONS.map(loc => {
                                                const isSelected = selectedLocations.includes(loc.id);
                                                return (
                                                    <div
                                                        key={loc.id}
                                                        onClick={() => {
                                                            let newLocs = selectedLocations.filter(id => id !== 'ALL');
                                                            if (isSelected) {
                                                                newLocs = newLocs.filter(id => id !== loc.id);
                                                            } else {
                                                                newLocs = [...newLocs, loc.id];
                                                            }
                                                            if (newLocs.length === 0 || newLocs.length === LOCATIONS.length) {
                                                                setSelectedLocations(['ALL']);
                                                            } else {
                                                                setSelectedLocations(newLocs);
                                                            }
                                                        }}
                                                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: isSelected ? '#eff6ff' : 'transparent' }}
                                                    >
                                                        <div style={{ width: '16px', height: '16px', border: '1px solid #cbd5e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent', borderColor: isSelected ? 'var(--color-primary)' : '#cbd5e1' }}>
                                                            {isSelected && <Check size={12} color="white" />}
                                                        </div>
                                                        <span style={{ fontSize: '0.85rem' }}>{loc.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <div style={{ position: 'relative', width: '350px' }} ref={filterDropdownRef}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>Ekipman Türü Seçimi</label>
                                    <div
                                        onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                        style={{
                                            padding: '12px 16px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                        }}
                                    >
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {selectedEquipmentTypes.includes('ALL')
                                                ? 'Tüm Ekipmanlar'
                                                : `${selectedEquipmentTypes.length} Ekipman Türü Seçili`}
                                        </span>
                                        <ChevronDown size={18} color="#94a3b8" />
                                    </div>

                                    {isFilterDropdownOpen && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            marginTop: '8px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            boxShadow: 'var(--shadow-lg)',
                                            zIndex: 100,
                                            maxHeight: '450px',
                                            overflowY: 'auto',
                                            padding: '12px'
                                        }}>
                                            {/* All Option */}
                                            <div
                                                onClick={() => setSelectedEquipmentTypes(['ALL'])}
                                                style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', backgroundColor: selectedEquipmentTypes.includes('ALL') ? '#eff6ff' : 'transparent' }}
                                                className="hover-bg-slate-50"
                                            >
                                                <div style={{ width: '18px', height: '18px', border: '2px solid var(--color-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: selectedEquipmentTypes.includes('ALL') ? 'var(--color-primary)' : 'transparent' }}>
                                                    {selectedEquipmentTypes.includes('ALL') && <Check size={14} color="white" />}
                                                </div>
                                                <span style={{ fontWeight: '700', color: selectedEquipmentTypes.includes('ALL') ? 'var(--color-primary)' : 'inherit' }}>Tüm Ekipmanlar</span>
                                            </div>

                                            {EQUIPMENT_GROUPS.map(group => {
                                                const groupTypes = group.types;
                                                const isGroupSelected = groupTypes.every(t => selectedEquipmentTypes.includes(t));

                                                return (
                                                    <div key={group.id} style={{ marginBottom: '16px' }}>
                                                        {/* Main Group Header */}
                                                        <div
                                                            onClick={() => {
                                                                let newSelection = selectedEquipmentTypes.filter(t => t !== 'ALL');
                                                                if (isGroupSelected) {
                                                                    newSelection = newSelection.filter(t => !groupTypes.includes(t));
                                                                } else {
                                                                    newSelection = [...new Set([...newSelection, ...groupTypes])];
                                                                }
                                                                if (newSelection.length === 0 || newSelection.length === allTypeIds.length) {
                                                                    setSelectedEquipmentTypes(['ALL']);
                                                                } else {
                                                                    setSelectedEquipmentTypes(newSelection);
                                                                }
                                                            }}
                                                            style={{
                                                                padding: '8px 10px',
                                                                backgroundColor: '#f8fafc',
                                                                borderRadius: '8px',
                                                                marginBottom: '8px',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px'
                                                            }}
                                                            className="hover-bg-slate-100"
                                                        >
                                                            <div style={{ width: '18px', height: '18px', border: '2px solid #cbd5e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isGroupSelected ? 'var(--color-primary)' : 'transparent', borderColor: isGroupSelected ? 'var(--color-primary)' : '#cbd5e1' }}>
                                                                {isGroupSelected && <Check size={14} color="white" />}
                                                            </div>
                                                            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#475569' }}>{group.label}</span>
                                                        </div>

                                                        {/* Sub types */}
                                                        <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                            {group.types.map(typeId => {
                                                                const category = CATEGORIES.find(c => c.id === typeId) || SUB_CATEGORIES.find(s => s.id === typeId);
                                                                if (!category) return null;
                                                                const isSelected = selectedEquipmentTypes.includes(typeId);

                                                                return (
                                                                    <div
                                                                        key={typeId}
                                                                        onClick={() => {
                                                                            let newSelection = selectedEquipmentTypes.filter(t => t !== 'ALL');
                                                                            if (isSelected) {
                                                                                newSelection = newSelection.filter(t => t !== typeId);
                                                                            } else {
                                                                                newSelection = [...newSelection, typeId];
                                                                            }
                                                                            if (newSelection.length === 0 || newSelection.length === allTypeIds.length) {
                                                                                setSelectedEquipmentTypes(['ALL']);
                                                                            } else {
                                                                                setSelectedEquipmentTypes(newSelection);
                                                                            }
                                                                        }}
                                                                        style={{
                                                                            padding: '6px 10px',
                                                                            borderRadius: '6px',
                                                                            cursor: 'pointer',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '10px'
                                                                        }}
                                                                        className="hover-bg-slate-50"
                                                                    >
                                                                        <div style={{ width: '16px', height: '16px', border: '1px solid #cbd5e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent', borderColor: isSelected ? 'var(--color-primary)' : '#cbd5e1' }}>
                                                                            {isSelected && <Check size={12} color="white" />}
                                                                        </div>
                                                                        <span style={{ fontSize: '0.85rem', color: isSelected ? 'var(--text-primary)' : '#64748b' }}>{category.label}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <InventoryTable
                                items={filteredInventory}
                                categoryName="Güncel Ekipman Listesi"
                                onDownload={handleDownload}
                            />
                        </div>
                    )}

                    {/* ANNOUNCEMENTS VIEW */}
                    {activeTab === 'ANNOUNCEMENTS' && (
                        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>MMO tarafından paylaşılan güncel bilgilendirmeler.</p>
                            </div>
                            <AnnouncementCarousel />
                        </div>
                    )}

                    {/* CONTRACTS VIEW */}
                    {activeTab === 'CONTRACTS' && view === 'CONTRACT_LIST' && (
                        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>Aktif Sözleşmeler Listesi</h3>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>SÖZLEŞME NO</th>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>BAŞLANGIÇ TARİHİ</th>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>BİTİŞ TARİHİ</th>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>KONTROL ADRESİ</th>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>İŞLEMLER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CONTRACTS.map(contract => (
                                            <tr key={contract.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-slate-50">
                                                <td style={{ padding: '16px', fontWeight: '700', color: 'var(--color-primary)' }}>{contract.contractNo}</td>
                                                <td style={{ padding: '16px' }}>{contract.startDate}</td>
                                                <td style={{ padding: '16px' }}>{contract.endDate}</td>
                                                <td style={{ padding: '16px', color: '#64748b' }}>{contract.locationName}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <button
                                                        onClick={() => handleSelectContract(contract)}
                                                        className="hover-lift"
                                                        style={{
                                                            padding: '8px 16px',
                                                            backgroundColor: 'var(--color-primary)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            fontSize: '0.85rem',
                                                            fontWeight: '600',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Sözleşmeye Git
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'CONTRACTS' && view === 'CONTRACT_DETAILS' && (
                        <InventoryTable
                            items={INVENTORY.filter(i => i.locationId === selectedContract.locationId)}
                            categoryName={`${selectedContract.contractNo} Nolu Sözleşme Kapsamındaki`}
                            onDownload={handleDownload}
                        />
                    )}

                    {/* OFFICIALS SPECIFIC VIEW */}
                    {activeTab === 'OFFICIALS' && view === 'LIST' && (
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9' }}>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: '700' }}>Yetkili Kişiler Listesi</h3>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic' }}>
                                    * Tabloda bir değişiklik yapılması gerektiğinde lütfen Teknik Hizmetler ile iletişime geçiniz.
                                </p>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>AD SOYAD</th>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>ÜNVAN</th>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>BULUNDUĞU BİRİM/BÖLÜM</th>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>GSM NO</th>
                                            <th style={{ padding: '16px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>E-MAIL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AUTHORIZED_PERSONS.filter(p => p.location === selectedLocation.name).map(person => (
                                            <tr key={person.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover-bg-slate-50">
                                                <td style={{ padding: '16px', fontWeight: '600', fontSize: '0.9rem' }}>{person.name}</td>
                                                <td style={{ padding: '16px', fontSize: '0.9rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <Briefcase size={14} color="#94a3b8" />
                                                        {person.title}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '16px', fontSize: '0.9rem', color: '#64748b' }}>{person.department}</td>
                                                <td style={{ padding: '16px', fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '500' }}>
                                                    {person.gsm.slice(0, -4)}****
                                                </td>
                                                <td style={{ padding: '16px', fontSize: '0.9rem' }}>
                                                    <a href={`mailto:${person.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{person.email}</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* STATS VIEW */}
                    {activeTab === 'STATS' && view === 'STATS_PAGE' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>İstatistiksel Veriler</h3>
                                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                                        <select
                                            value={selectedStatType}
                                            onChange={(e) => setSelectedStatType(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                paddingRight: '40px',
                                                borderRadius: '12px',
                                                border: '1px solid #e2e8f0',
                                                backgroundColor: '#f8fafc',
                                                fontSize: '0.95rem',
                                                fontWeight: '600',
                                                color: 'var(--text-primary)',
                                                appearance: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="deficiency_process">Ekipman bazlı eksiklik süreç takibi</option>
                                            <option value="deficiency_percentile">Eksiklik yüzdelik dilim</option>
                                        </select>
                                        <ChevronDown size={20} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                    </div>

                                    {/* Info Hover Tooltip */}
                                    <div style={{ position: 'relative' }} className="group">
                                        <div style={{ padding: '8px', borderRadius: '50%', backgroundColor: '#f1f5f9', cursor: 'pointer' }}>
                                            <Info size={20} color="#64748b" />
                                        </div>
                                        <div className="tooltip" style={{
                                            position: 'absolute',
                                            bottom: 'calc(100% + 15px)',
                                            right: '0',
                                            width: '280px',
                                            padding: '16px',
                                            backgroundColor: '#1e293b',
                                            color: 'white',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            lineHeight: '1.5',
                                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                                            zIndex: 50,
                                            pointerEvents: 'none',
                                            opacity: 0,
                                            transform: 'translateY(10px)',
                                            transition: 'all 0.3s'
                                        }}>
                                            {selectedStatType === 'deficiency_process' ? (
                                                <><strong>Ekipman bazlı eksiklik süreç takibi:</strong><br />Kullanıcılar Rapor No sütunundaki numarayı kopyalayıp buraya yapıştırarak ilgili raporun ve ekipmanın tarihsel gelişim grafiğine ulaşabilir.</>
                                            ) : (
                                                <><strong>Eksiklik yüzdelik dilim:</strong><br />Herhangi bir eksiklik türünün, toplam eksiklikler içindeki payını ve diğer kusurlara göre nerede konumlandığını gösterir.</>
                                            )}
                                            <div style={{ position: 'absolute', top: '100%', right: '15px', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid #1e293b' }}></div>
                                        </div>
                                        <style dangerouslySetInnerHTML={{ __html: `.group:hover .tooltip { opacity: 1 !important; transform: translateY(0) !important; }` }} />
                                    </div>
                                </div>

                                {selectedStatType === 'deficiency_process' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, maxWidth: '300px' }}>
                                                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>Rapor Numarasını Yapıştırın</label>
                                                <input
                                                    type="text"
                                                    placeholder="Örn: 12345/3456/23456"
                                                    value={statReportNo}
                                                    onChange={(e) => setStatReportNo(e.target.value)}
                                                    style={{
                                                        padding: '12px 16px',
                                                        borderRadius: '12px',
                                                        border: '1px solid #e2e8f0',
                                                        fontSize: '0.9rem',
                                                        backgroundColor: 'white'
                                                    }}
                                                />
                                            </div>
                                            <button
                                                className="hover-lift"
                                                style={{
                                                    padding: '12px 24px',
                                                    backgroundColor: 'var(--color-primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontWeight: '700',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Veriyi Getir
                                            </button>
                                        </div>

                                        {/* History Results Area */}
                                        <div style={{ minHeight: '300px', width: '100%', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                            {!statReportNo ? (
                                                <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                                                    <BarChart3 size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                                                    <p style={{ margin: 0, fontWeight: '500' }}>Verileri listelemek için bir rapor numarası girin.</p>
                                                </div>
                                            ) : !equipmentHistory || equipmentHistory.length === 0 ? (
                                                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-danger)' }}>
                                                    <p style={{ margin: 0, fontWeight: '600' }}>Rapor numarası bulunamadı veya eşleşen veri yok.</p>
                                                </div>
                                            ) : (
                                                <div style={{ width: '100%' }}>
                                                    <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                                                            Ekipman Geçmişi: {equipmentHistory[0].name} ({equipmentHistory[0].serialNo})
                                                        </h4>
                                                    </div>
                                                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                                            <thead>
                                                                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                                                                    <th style={{ padding: '12px 20px', fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>KONTROL TARİHİ</th>
                                                                    <th style={{ padding: '12px 20px', fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>RAPOR NO</th>
                                                                    <th style={{ padding: '12px 20px', fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>TESPİT EDİLEN EKSİKLİKLER</th>
                                                                    <th style={{ padding: '12px 20px', fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>DURUM</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {equipmentHistory.map((h, idx) => (
                                                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                                        <td style={{ padding: '16px 20px', fontSize: '0.9rem', fontWeight: '600' }}>{h.controlDate}</td>
                                                                        <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: '#64748b', fontFamily: 'monospace' }}>{h.reportNo}</td>
                                                                        <td style={{ padding: '16px 20px' }}>
                                                                            {h.deficiencies.length > 0 ? (
                                                                                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.85rem', color: 'var(--color-danger)' }}>
                                                                                    {h.deficiencies.map((d, i) => <li key={i} style={{ marginBottom: '4px' }}>{d}</li>)}
                                                                                </ul>
                                                                            ) : (
                                                                                <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: '600' }}>✓ Eksiklik tespit edilmedi.</span>
                                                                            )}
                                                                        </td>
                                                                        <td style={{ padding: '16px 20px' }}>
                                                                            <span style={{
                                                                                padding: '4px 10px',
                                                                                borderRadius: '20px',
                                                                                fontSize: '0.75rem',
                                                                                fontWeight: '700',
                                                                                backgroundColor: h.reportStatus === 'Uygun' ? '#dcfce7' : '#fee2e2',
                                                                                color: h.reportStatus === 'Uygun' ? '#166534' : '#991b1b'
                                                                            }}>
                                                                                {h.reportStatus}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {selectedStatType === 'deficiency_percentile' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
                                            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>Ekipman Seçiniz</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    value={selectedStatCategory}
                                                    onChange={(e) => setSelectedStatCategory(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        paddingRight: '40px',
                                                        borderRadius: '12px',
                                                        border: '1px solid #e2e8f0',
                                                        backgroundColor: 'white',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '600',
                                                        color: 'var(--text-primary)',
                                                        appearance: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {CATEGORIES.filter(c => !c.isFolder).map(cat => (
                                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} />
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>{CATEGORIES.find(c => c.id === selectedStatCategory)?.label} Eksiklik Dağılımı (%)</h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                    {DEFICIENCY_STATS.map((stat, i) => (
                                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                                                <span style={{ fontWeight: '600' }}>{stat.label}</span>
                                                                <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>%{Math.floor(stat.value * (0.8 + Math.random() * 0.4))}</span>
                                                            </div>
                                                            <div style={{ height: '10px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                                                                <div style={{ height: '100%', width: `${stat.value}%`, backgroundColor: i === 0 ? 'var(--color-primary)' : i === 1 ? '#3b82f6' : '#94a3b8', borderRadius: '5px' }} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
                                                <div style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic' }}>
                                                    "Bu istatistik, İzeltaş genelinde yapılan kontrollerde en sık rastlanan kusurları analiz ederek önleyici bakım stratejilerinizi geliştirmenize yardımcı olur."
                                                </div>
                                                <div style={{ display: 'flex', gap: '40px' }}>
                                                    <div>
                                                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)' }}>4.2</div>
                                                        <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Ort. Kusur Sayısı</div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-success)' }}>%88</div>
                                                        <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Ekipman Uygunluk Oranı</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </main>
            </Container>
        </>
    );
}
