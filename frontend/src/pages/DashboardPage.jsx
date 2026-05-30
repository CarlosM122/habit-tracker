import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHabits, createHabit, completeHabit, deleteHabit } from '../api/habits';
import HabitCard from '../components/HabitCard';
import NewHabitModal from '../components/NewHabitModal';

const DashboardPage = () => {
    const { user, token, logout } = useAuth();
    const [habits, setHabits] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const data = await getHabits(token);
            setHabits(data);
        } catch (err) {
            console.error('Error cargando hábitos', err);
        }
    };

    const handleCreate = async (name, description) => {
        try {
            const newHabit = await createHabit(token, name, description);
            setHabits([...habits, newHabit]);
        } catch (err) {
            console.error('Error creando hábito', err);
        }
    };

    const handleComplete = async (id) => {
        try {
            const updated = await completeHabit(token, id);
            setHabits(habits.map(h => h.id === id ? updated : h));
        } catch (err) {
            console.error('Error completando hábito', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteHabit(token, id);
            setHabits(habits.filter(h => h.id !== id));
        } catch (err) {
            console.error('Error eliminando hábito', err);
        }
    };

    const completedCount = habits.filter(h => h.completedToday).length;

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Hola, {user?.name} 👋</h1>
                    <p>{completedCount} de {habits.length} hábitos completados hoy</p>
                </div>
                <div className="header-actions">
                    <button className="btn-new" onClick={() => setShowModal(true)}>
                        + Nuevo hábito
                    </button>
                    <button className="btn-logout" onClick={logout}>
                        Salir
                    </button>
                </div>
            </header>

            <main className="habits-grid">
                {habits.length === 0 ? (
                    <div className="empty-state">
                        <p>No tienes hábitos aún.</p>
                        <p>¡Crea uno para empezar!</p>
                    </div>
                ) : (
                    habits.map(habit => (
                        <HabitCard
                            key={habit.id}
                            habit={habit}
                            onComplete={handleComplete}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </main>

            {showModal && (
                <NewHabitModal
                    onClose={() => setShowModal(false)}
                    onSave={handleCreate}
                />
            )}
        </div>
    );
};

export default DashboardPage;