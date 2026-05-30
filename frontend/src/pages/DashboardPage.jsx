import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Bienvenido, {user?.name}</h1>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
};

export default DashboardPage;