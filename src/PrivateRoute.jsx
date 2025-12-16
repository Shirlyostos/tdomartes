import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './componentes/LoadingSpinner';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Si todavía estamos comprobando la autenticación, muestra un spinner.
  if (loading) {
    return <LoadingSpinner />;
  }

  // Si no hay usuario después de cargar, redirige a login.
  return user ? children : <Navigate to="/login" replace />;
}