import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Minus } from 'lucide-react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Merhaba! Ben MMO PK Asistanıyım. Size periyodik kontrolleriniz, raporlarınız veya mevzuat hakkında nasıl yardımcı olabilirim?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI Response Logic
        setTimeout(() => {
            let botResponse = "Anladım. Bu konuda size yardımcı olabilmem için biraz daha detay verebilir misiniz? İsterseniz 'Rapor sorgulama', 'Eksiklik takibi' veya 'Randevu' konularında soru sorabilirsiniz.";

            const lowerInput = inputValue.toLowerCase();
            if (lowerInput.includes('rapor')) {
                botResponse = "Raporlarınıza 'Güncel' sekmesindeki tablodan ulaşabilirsiniz. Her satırın yanındaki 'Görüntüle' butonu ile rapor detayını görebilirsiniz.";
            } else if (lowerInput.includes('vinc') || lowerInput.includes('platform')) {
                botResponse = "Kaldırma iletme ekipmanları periyodik kontrolleri yılda en az 1 kez yapılmalıdır. Güncel durumunuzu tabloda filtreleyerek görebilirsiniz.";
            } else if (lowerInput.includes('merhaba') || lowerInput.includes('selam')) {
                botResponse = "Merhaba! Size yardımcı olmak için buradayım. Hangi konuda bilgi almak istersiniz?";
            } else if (lowerInput.includes('eksik')) {
                botResponse = "Ekipmanlarınızdaki eksiklikleri tabloda kırmızı ile işaretlenmiş 'Eksiklikler' sütununda görebilirsiniz. Süreç takibi için 'İstatistik' sekmesini kullanabilirsiniz.";
            }

            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: botResponse,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                className="hover-lift"
            >
                <MessageSquare size={28} />
                <div style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: '#10b981',
                    border: '2px solid white'
                }}></div>
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '380px',
            height: isMinimized ? '60px' : '550px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid #e2e8f0'
        }}>
            {/* Header */}
            <div style={{
                padding: '16px 20px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
            }} onClick={() => isMinimized && setIsMinimized(false)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '18px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                        <Bot size={20} color="white" style={{ margin: '0 auto' }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>PK Asistanı</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: '#10b981' }}></div>
                            Çevrimiçi
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>
                        <Minus size={20} />
                    </button>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>
                        <X size={20} />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Chat Messages */}
                    <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '12px 16px',
                                    borderRadius: msg.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                    backgroundColor: msg.type === 'user' ? 'var(--color-primary)' : 'white',
                                    color: msg.type === 'user' ? 'white' : 'var(--text-primary)',
                                    fontSize: '0.9rem',
                                    boxShadow: msg.type === 'user' ? '0 4px 10px rgba(37,99,235,0.2)' : '0 2px 5px rgba(0,0,0,0.05)',
                                    lineHeight: '1.4'
                                }}>
                                    {msg.text}
                                </div>
                                <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>{msg.time}</span>
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ display: 'flex', gap: '4px', padding: '8px 12px', backgroundColor: 'white', borderRadius: '12px', width: 'fit-content' }}>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#cbd5e1', borderRadius: '3px' }} className="animate-pulse"></div>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#cbd5e1', borderRadius: '3px', animationDelay: '0.2s' }} className="animate-pulse"></div>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#cbd5e1', borderRadius: '3px', animationDelay: '0.4s' }} className="animate-pulse"></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '16px', backgroundColor: 'white', borderTop: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '12px' }}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Mesajınızı yazın..."
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '12px', fontSize: '0.7rem', color: '#94a3b8' }}>
                            <Sparkles size={10} />
                            AI Destekli Akıllı Asistan
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
