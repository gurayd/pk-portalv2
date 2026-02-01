export default function Container({ children, className = "" }) {
    return (
        <div className={`container ${className}`} style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
            {children}
        </div>
    );
}
