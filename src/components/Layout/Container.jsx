export default function Container({ children, className = "", isWide = false }) {
    return (
        <div className={`container ${className}`} style={{
            maxWidth: isWide ? '1400px' : '1200px',
            margin: '0 auto',
            padding: '0 20px',
            transition: 'max-width 0.3s'
        }}>
            {children}
        </div>
    );
}
