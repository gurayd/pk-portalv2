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
import { ChevronRight, Home, FileSpreadsheet } from 'lucide-react';

export default function Dashboard() {
    const [view, setView] = useState('LOCATIONS'); // LOCATIONS | CATEGORIES | INVENTORY
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
        // In a real app, this would trigger a CSV/XLSX generation including 'item.name' which is the equipment info.
    };

    // Filter Inventory
    const filteredInventory = selectedLocation && selectedCategory
        ? INVENTORY.filter(item => item.locationId === selectedLocation.id && item.categoryId === selectedCategory.id)
        : [];

    return (
        <>
            <Header />
            <Container>
                <main style={{ paddingBottom: '60px' }}>

                    {/* Top Navigation Bar: Breadcrumbs + Actions */}
                    <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                        {view === 'CATEGORIES' && (
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
                        )}
                    </div>

                    {/* Content Views */}
                    {view === 'LOCATIONS' && (
                        <>
                            <LocationList locations={LOCATIONS} onSelectLocation={handleSelectLocation} />
                            <AnnouncementCarousel />
                            <ContactInfo />
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
