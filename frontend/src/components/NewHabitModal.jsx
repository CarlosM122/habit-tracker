import { useState } from 'react';

const NewHabitModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave(name, description);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Nuevo hábito</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre del hábito"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                    />
                    <input
                        type="text"
                        placeholder="Descripción (opcional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancelar
                        </button>
                        <button type="submit" className="btn-save">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewHabitModal;