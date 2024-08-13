import AuthDummyjsonService from '../../framework/services/AuthDummyjsonService.js';
import config from '../../framework/config/config.js'; // Импортируем конфигурацию

describe('Тесты AuthDummyjsonService', () => {
    let token;
    let refreshToken; // Добавляем переменную для хранения токена обновления

    it('должен войти в систему и вернуть токен', async () => {
        const response = await AuthDummyjsonService.login(config.username, config.password);
        expect(response).toHaveProperty('token');
        expect(response).toHaveProperty('refreshToken'); // Проверяем наличие токена обновления
        token = response.token; // Сохраняем токен для дальнейших тестов
        refreshToken = response.refreshToken; // Сохраняем токен обновления
    });

    it('должен получить текущего пользователя', async () => {
        const user = await AuthDummyjsonService.getCurrentUser(token);
        expect(user).toHaveProperty('username', config.username);
    });

    it('должен обновить токен', async () => {
        const response = await AuthDummyjsonService.refreshToken(refreshToken);
        expect(response).toHaveProperty('token');
    });

    afterAll(async () => {
        try {
            // Закрываем экземпляр AuthDummyjsonService
            await AuthDummyjsonService.disconnect();
            console.log('Экземпляр AuthDummyjsonService закрыт.');
        } catch (error) {
            console.error('Ошибка при закрытии экземпляра AuthDummyjsonService:', error);
        }
    });
});