import React, { useEffect } from 'react';
import io from 'socket.io-client';

// Configura la URL del servidor WebSocket
const SOCKET_URL = 'https://wss.soursop.lat';

const App: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage

    if (!token) {
      console.error('No se encontró el token en localStorage');
      return;
    }

    // Conectar al servidor WebSocket
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
      extraHeaders: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Manejar los eventos recibidos
    socket.on('nuevo', (data) => {
      console.log('Datos recibidos:', data);
    });

    // Manejar la desconexión
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Suscripción a Canales de WebSocket</h1>
      <p>Abre la consola para ver los datos recibidos.</p>
    </div>
  );
};

export default App;
