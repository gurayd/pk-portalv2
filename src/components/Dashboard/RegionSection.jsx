import React from 'react';
import StatCard from './StatCard';
import ContactCard from './ContactCard';
import ContractCard from './ContractCard';

export default function RegionSection({ regionData, onOpenDeficiencies }) {
    // Grid styles
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
    };

    return (
        <div style={{ marginBottom: '48px' }}>
            <h2 style={{
                marginBottom: '20px',
                fontSize: '1.25rem',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '8px',
                display: 'inline-block'
            }}>
                {regionData.title}
            </h2>

            {/* Stats Grid */}
            <div style={gridStyle}>
                {regionData.stats.map((stat, idx) => (
                    <StatCard
                        key={idx}
                        label={stat.label}
                        value={stat.value}
                        type={stat.type}
                        onClick={stat.type === 'danger' ? () => onOpenDeficiencies(regionData.title) : undefined}
                    />
                ))}
                {/* If there's a contract card instead of a stat, or mixed. In mock data, Contracts is separate or last stat? 
            Mock data has "Sözleşmeler" as stat. And also separate contracts fields.
            Let's render contracts if present in a card-like slot.
        */}
                {regionData.contracts && (
                    <ContractCard contracts={regionData.contracts} />
                )}
            </div>

            {/* Contacts Grid */}
            {regionData.contacts && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {regionData.contacts.map((contact, idx) => (
                        <ContactCard
                            key={idx}
                            role={contact.role}
                            name={contact.name}
                            phone={contact.phone}
                            email={contact.email}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
