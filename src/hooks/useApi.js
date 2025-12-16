import { useState } from 'react';
import { toast } from 'react-toastify';

export function useApi(apiFunction, initialData = []) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      // Se más flexible: si response.data existe, úsalo; si no, usa la respuesta completa.
      const responseData = response.data !== undefined ? response.data : response;
      setData(responseData);
      return responseData;
    } catch (err) {
      // Extrae un mensaje de error más específico si está disponible.
      const errorMessage = err.response?.data?.message || err.message || 'Ocurrió un error inesperado.';
      setError(errorMessage);
      toast.error(errorMessage);
      // En lugar de lanzar el error (lo que rompe el flujo), devuelve null.
      // El componente puede comprobar si el resultado es nulo para saber si hubo un error.
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}