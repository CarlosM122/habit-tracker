const HabitCard = ({ habit, onComplete, onDelete }) => {
    return (
        <div className={`habit-card ${habit.completedToday ? 'completed' : ''}`}>
            <div className="habit-info">
                <h3>{habit.name}</h3>
                {habit.description && <p>{habit.description}</p>}
                <div className="habit-streak">
                    🔥 {habit.streak} días seguidos
                </div>
            </div>
            <div className="habit-actions">
                <button
                    className="btn-complete"
                    onClick={() => onComplete(habit.id)}
                    disabled={habit.completedToday}
                >
                    {habit.completedToday ? '✓ Hecho' : 'Completar'}
                </button>
                <button
                    className="btn-delete"
                    onClick={() => onDelete(habit.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default HabitCard;