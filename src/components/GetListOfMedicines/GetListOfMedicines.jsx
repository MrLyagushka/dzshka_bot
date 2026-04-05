import { useState, useEffect, use } from "react";

const API_URL = "https://dzshka.mrnoandmrno.ru:7999"

export default function GetListOfMedicines () {
    const [medicines, setMedicines] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const getInitData = () => window.Telegram?.WebApp?.InitData || ''

    const fetchMedicines = async () => {
        setLoading(true);
        try {
        const res = await fetch(`${API_URL}/api/medicines`, {
            headers: { 'X-Telegram-InitData': getInitData() }
        });
        if (!res.ok) throw new Error('Ошибка загрузки или авторизации');
            const data = await res.json();
            setMedicines(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleMark = async (id) => {
        try {
        const res = await fetch(`${API_URL}/api/medicines/${id}/mark`, {
            method: 'POST',
            headers: { 'X-Telegram-InitData': getInitData() }
        });
        if (!res.ok) throw new Error('Не удалось обновить статус');
        // Перезагружаем список, чтобы отобразить новый статус
        fetchMedicines();
        } catch (err) {
        setError(err.message);
        }
    };

    useEffect(() => {
        fetchMedicines();
        // Сообщаем Telegram, что мини-апп готов
        window.Telegram?.WebApp?.ready();
    }, []);

    if (loading) return <p style={{textAlign: 'center', marginTop: 40}}>Загрузка...</p>;
    if (error) return <p style={{color: 'red', textAlign: 'center', marginTop: 40}}>{error}</p>;

    return (
        <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ marginBottom: '16px', margin: 0 }}>Журнал лекарств</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
            {medicines.length === 0 && <p style={{color: '#888'}}>Нет назначенных лекарств</p>}
            
            {medicines.map(med => (
            <div key={med.id} style={{
                padding: '12px',
                background: med.is_taken ? '#e8f5e9' : '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background 0.2s'
            }}>
                <div>
                <div style={{ fontWeight: '600', fontSize: '15px' }}>{med.name}</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{med.scheduled_time}</div>
                </div>
                <button
                onClick={() => handleMark(med.id)}
                style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: med.is_taken ? '#4CAF50' : '#f44336',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '13px'
                }}
                >
                {med.is_taken ? '✅ Принято' : '⬜ Отметить'}
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}