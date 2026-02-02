import React, { useState } from 'react';
import Container from '../Layout/Container';
import Header from '../Layout/Header';

// New Components
import LocationList from './LocationList';
import CategoryGrid from './CategoryGrid';
import InventoryTable from './InventoryTable';
import AnnouncementCarousel from './AnnouncementCarousel';
import ContactInfo from './ContactInfo';

// Data
import { LOCATIONS, CATEGORIES, INVENTORY } from '../../data/mockData';
import { ChevronRight, Home, FileSpreadsheet, Download, FileArchive, ChevronDown } from 'lucide-react';

export default function Dashboard({ onLogout }) {
    const [view, setView] = useState('LOCATIONS'); // LOCATIONS | CATEGORIES | INVENTORY
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);

    // Navigation Handlers
    const handleSelectLocation = (loc) => {
        setSelectedLocation(loc);
        setView('CATEGORIES');
    };

    const handleSelectCategory = (cat) => {
        setSelectedCategory(cat);
        setView('INVENTORY');
    };

    const handleGoHome = () => {
        setView('LOCATIONS');
        setSelectedLocation(null);
        setSelectedCategory(null);
    };

    const handleGoToCategories = () => {
        setView('CATEGORIES');
        setSelectedCategory(null);
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

    // Filter Inventory
    const filteredInventory = selectedLocation && selectedCategory
        ? INVENTORY.filter(item => item.locationId === selectedLocation.id && item.categoryId === selectedCategory.id)
        : [];

    return (
        <>
            <Header onLogout={onLogout} />
            <Container>
                <main style={{ paddingBottom: '60px' }}>

                    {/* Top Navigation Bar: Breadcrumbs + Actions */}
                    <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            {/* Left: Breadcrumbs */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <div
                                    onClick={handleGoHome}
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: view === 'LOCATIONS' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                                    className={view !== 'LOCATIONS' ? 'hover-underline' : ''}
                                >
                                    <Home size={16} /> Adresler
                                </div>

                                {selectedLocation && (
                                    <>
                                        <ChevronRight size={16} />
                                        <span
                                            onClick={handleGoToCategories}
                                            style={{ cursor: 'pointer', fontWeight: view === 'CATEGORIES' ? '600' : '400', color: view === 'CATEGORIES' ? 'var(--text-primary)' : 'inherit' }}
                                        >
                                            {selectedLocation.name}
                                        </span>
                                    </>
                                )}

                                {selectedCategory && (
                                    <>
                                        <ChevronRight size={16} />
                                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                                            {selectedCategory.label}
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
                                    <div style={{ position: 'relative' }}>
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
                            <LocationList locations={LOCATIONS} onSelectLocation={handleSelectLocation} />
                            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                                <AnnouncementCarousel />
                            </div>
                        </>
                    )}

                    {view === 'CATEGORIES' && (
                        <CategoryGrid
                            categories={CATEGORIES}
                            onSelectCategory={handleSelectCategory}
                            inventory={INVENTORY}
                            selectedLocationId={selectedLocation.id}
                        />
                    )}

                    {view === 'INVENTORY' && (
                        <InventoryTable
                            items={filteredInventory}
                            categoryName={selectedCategory.label}
                            onDownload={handleDownload}
                        />
                    )}

                </main>
            </Container>
        </>
    );
}
