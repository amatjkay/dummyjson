import fetch from 'node-fetch';
import config from '../../framework/config/config.js'; // Импортируем конфигурацию

class AuthDummyjsonService {
    async login(username = config.username, password = config.password, expiresInMins = config.expiresInMins) {
        const response = await fetch(`${config.apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins }),
        });

        if (!response.ok) {
            throw new Error('Вход в систему не удался');
        }

        return response.json();
    }

    async getCurrentUser(token) {
        const response = await fetch(`${config.apiUrl}/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Не удалось получить данные о текущем пользователе');
        }

        return response.json();
    }

    async refreshToken(refreshToken, expiresInMins = config.expiresInMins) {
        const response = await fetch(`${config.apiUrl}/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken, expiresInMins }),
        });

        if (!response.ok) {
            throw new Error('Не удалось обновить токен');
        }

        return response.json();
    }
    async disconnect() {
        console.log('Экземпляр AuthDummyjsonService отключен.');
    }
}

const authDummyjsonService = new AuthDummyjsonService();
export default authDummyjsonService;