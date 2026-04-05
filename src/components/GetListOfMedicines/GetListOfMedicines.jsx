import { useState, useEffect } from "react";

const API_URL = "https://dzshka.mrnoandmrno.ru:7999";

// Получаем user_id из Telegram WebApp (или заглушка для локальных тестов)
const getUserId = () => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    return user?.id || 123456789; // ← В продакшене уберите заглушку
};

export default function GetListOfMedicines() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const userId = getUserId();

    const fetchMedicines = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/medicines`, {
                method: "POST",  // ← POST, чтобы передать тело с user_id
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.detail || "Ошибка загрузки");
            }
            const data = await res.json();
            setMedicines(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // const handleMark = async (id) => {
    //     try {
    //         const res = await fetch(`${API_URL}/api/medicines/${id}/mark`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ user_id: userId })
    //         });
    //         if (!res.ok) {
    //             const errData = await res.json().catch(() => ({}));
    //             throw new Error(errData.detail || "Не удалось обновить статус");
    //         }
    //         // Перезагружаем список, чтобы отобразить новый статус
    //         fetchMedicines();
    //     } catch (err) {
    //         setError(err.message);
    //     }
    // };

    useEffect(() => {
        fetchMedicines();
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
                            <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                                {med.scheduled_time || 'Время не указано'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}