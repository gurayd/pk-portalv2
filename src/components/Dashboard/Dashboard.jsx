import React, { useState, useRef, useEffect } from 'react';
import Container from '../Layout/Container';
import Header from '../Layout/Header';

// New Components
import LocationList from './LocationList';
import CategoryGrid from './CategoryGrid';
import InventoryTable from './InventoryTable';
import AnnouncementCarousel from './AnnouncementCarousel';
import ContactInfo from './ContactInfo';

// Data
import { LOCATIONS, CATEGORIES, INVENTORY, ARCHIVE_INVENTORY, SUB_CATEGORIES } from '../../data/mockData';
import { ChevronRight, Home, FileSpreadsheet, Download, FileArchive, ChevronDown, Archive, Folder, Calendar } from 'lucide-react';

export default function Dashboard({ onLogout }) {
    const [activeTab, setActiveTab] = useState('LIVE'); // LIVE | ARCHIVE
    const [view, setView] = useState('LOCATIONS'); // LOCATIONS | CATEGORIES | INVENTORY | YEARS | DATES
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
    const downloadDropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(event.target)) {
                setIsDownloadDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Navigation Handlers
    const handleSelectLocation = (loc) => {
        setSelectedLocation(loc);
        setView('CATEGORIES');
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
        setView('LOCATIONS');
        setSelectedLocation(null);
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setSelectedYear(null);
        setSelectedDate(null);
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
        handleGoHome();
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
        if (!selectedLocation) return;
        const count = INVENTORY.filter(i => i.locationId === selectedLocation.id).length;
        alert(`'${selectedLocation.name}' için Tüm Envanter Listesi (${count} ekipman) Excel formatında indiriliyor...`);
    };

    const handleDownloadAllReports = () => {
        const locName = selectedLocation ? selectedLocation.name : '';
        const catName = selectedCategory ? selectedCategory.label : '';
        const target = catName ? `${locName} - ${catName}` : locName;
        alert(`'${target}' için Tüm Raporlar (PDF/ZIP) hazırlanıyor...`);
        setIsDownloadDropdownOpen(false);
    };

    const handleDownloadFilteredReports = (status) => {
        alert(`'${selectedCategory.label}' kategorisindeki sadece '${status}' raporlar indiriliyor...`);
        setIsDownloadDropdownOpen(false);
    };

    // Live Filter
    const filteredInventory = selectedLocation && (selectedSubCategory || selectedCategory)
        ? INVENTORY.filter(item =>
            item.locationId === selectedLocation.id &&
            item.categoryId === (selectedSubCategory ? selectedSubCategory.id : selectedCategory.id)
        )
        : [];

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
                        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '0' }}>
                            <button
                                onClick={() => handleTabChange('LIVE')}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: activeTab === 'LIVE' ? 'white' : 'transparent',
                                    border: '1px solid ' + (activeTab === 'LIVE' ? '#e2e8f0' : 'transparent'),
                                    borderBottom: activeTab === 'LIVE' ? '2px solid var(--color-primary)' : '1px solid transparent',
                                    borderRadius: '8px 8px 0 0',
                                    fontWeight: '700',
                                    color: activeTab === 'LIVE' ? 'var(--color-primary)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '-1px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Home size={18} /> Adresler
                            </button>
                            <button
                                onClick={() => handleTabChange('ARCHIVE')}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: activeTab === 'ARCHIVE' ? 'white' : 'transparent',
                                    border: '1px solid ' + (activeTab === 'ARCHIVE' ? '#e2e8f0' : 'transparent'),
                                    borderBottom: activeTab === 'ARCHIVE' ? '2px solid var(--color-primary)' : '1px solid transparent',
                                    borderRadius: '8px 8px 0 0',
                                    fontWeight: '700',
                                    color: activeTab === 'ARCHIVE' ? 'var(--color-primary)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '-1px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Archive size={18} /> Arşiv
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            {/* Left: Breadcrumbs */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <div
                                    onClick={handleGoHome}
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: view === 'LOCATIONS' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                                    className={view !== 'LOCATIONS' ? 'hover-underline' : ''}
                                >
                                    {activeTab === 'LIVE' ? <Home size={16} /> : <Archive size={16} />}
                                    {activeTab === 'LIVE' ? 'Adresler' : 'Arşiv'}
                                </div>

                                {selectedLocation && (
                                    <>
                                        <ChevronRight size={16} />
                                        <span
                                            onClick={() => {
                                                if (activeTab === 'LIVE') handleGoToCategories();
                                                else { setView('YEARS'); setSelectedYear(null); setSelectedDate(null); }
                                            }}
                                            style={{ cursor: 'pointer', fontWeight: view === (activeTab === 'LIVE' ? 'CATEGORIES' : 'YEARS') ? '600' : '400', color: view === (activeTab === 'LIVE' ? 'CATEGORIES' : 'YEARS') ? 'var(--text-primary)' : 'inherit' }}
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

                                {activeTab === 'LIVE' && selectedCategory && (
                                    <>
                                        <ChevronRight size={16} />
                                        <span
                                            onClick={selectedSubCategory ? handleGoToSubCategories : handleGoToCategories}
                                            style={{ cursor: 'pointer', fontWeight: (view === 'CATEGORIES' || view === 'SUB_CATEGORIES') ? '600' : '400', color: (view === 'CATEGORIES' || view === 'SUB_CATEGORIES') ? 'var(--text-primary)' : 'inherit' }}
                                        >
                                            {selectedCategory.label}
                                        </span>
                                    </>
                                )}

                                {activeTab === 'LIVE' && selectedSubCategory && (
                                    <>
                                        <ChevronRight size={16} />
                                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                                            {selectedSubCategory.label}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Right: Actions */}
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                {view === 'CATEGORIES' && (
                                    <>
                                        <button
                                            onClick={handleDownloadAllReports}
                                            className="hover-lift"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                backgroundColor: 'var(--color-danger)',
                                                color: 'white',
                                                padding: '10px 16px',
                                                borderRadius: 'var(--radius-md)',
                                                fontWeight: '600',
                                                fontSize: '0.9rem',
                                                boxShadow: 'var(--shadow-sm)'
                                            }}
                                        >
                                            <FileArchive size={18} />
                                            Tüm raporları indir
                                        </button>

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
                                    </>
                                )}

                                {view === 'INVENTORY' && (
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
                                                    onClick={() => handleDownloadFilteredReports('Sakıncalı')}
                                                    style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '0.9rem', borderBottom: '1px solid #f1f5f9' }}
                                                    className="hover-bg-slate-50"
                                                >
                                                    Sakıncalı raporları indir
                                                </div>
                                                <div
                                                    onClick={() => handleDownloadFilteredReports('Uygun')}
                                                    style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '0.9rem', borderBottom: '1px solid #f1f5f9' }}
                                                    className="hover-bg-slate-50"
                                                >
                                                    Uygun raporları indir
                                                </div>
                                                <div
                                                    onClick={handleDownloadAllReports}
                                                    style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
                                                    className="hover-bg-slate-50"
                                                >
                                                    Tüm raporları indir
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Views */}
                    {view === 'LOCATIONS' && (
                        <>
                            <LocationList
                                locations={LOCATIONS}
                                onSelectLocation={(loc) => {
                                    setSelectedLocation(loc);
                                    setView(activeTab === 'LIVE' ? 'CATEGORIES' : 'YEARS');
                                }}
                            />
                            {activeTab === 'LIVE' && (
                                <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                                    <AnnouncementCarousel />
                                </div>
                            )}
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
                    {activeTab === 'LIVE' && view === 'CATEGORIES' && (
                        <CategoryGrid
                            categories={CATEGORIES}
                            onSelectCategory={handleSelectCategory}
                            inventory={INVENTORY}
                            selectedLocationId={selectedLocation.id}
                        />
                    )}

                    {activeTab === 'LIVE' && view === 'SUB_CATEGORIES' && (
                        <CategoryGrid
                            categories={SUB_CATEGORIES.filter(s => s.parentId === selectedCategory.id)}
                            onSelectCategory={handleSelectSubCategory}
                            inventory={INVENTORY}
                            selectedLocationId={selectedLocation.id}
                        />
                    )}

                    {activeTab === 'LIVE' && view === 'INVENTORY' && (
                        <InventoryTable
                            items={filteredInventory}
                            categoryName={selectedSubCategory ? selectedSubCategory.label : selectedCategory.label}
                            onDownload={handleDownload}
                        />
                    )}

                </main>
            </Container>
        </>
    );
}
