import feedsReducer, { getFeeds } from './feedsSlice';
import { TFeeds } from './feedsSlice';

describe('Тестирование feedsSlice', () => {
  const initialState: TFeeds = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
  };

  test('Начальное состояние соответствует initialState', () => {
    expect(feedsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('Обработка fulfilled экшена getFeeds', () => {
    const orders = [
      {
        _id: '1',
        status: 'pending',
        name: 'Order 1',
        createdAt: '2025-01-21',
        updatedAt: '2025-01-21',
        number: 1,
        ingredients: ['ingredient1', 'ingredient2']
      }
    ];

    const total = 1;
    const totalToday = 1;

    const feedsResponse = {
      success: true,
      orders,
      total,
      totalToday
    };

    const expectedState = {
      orders,
      total,
      totalToday,
      error: null
    };

    const actualState = feedsReducer(
      {
        ...initialState
      },
      getFeeds.fulfilled(feedsResponse, '')
    );

    expect(actualState).toEqual(expectedState);
  });

  test('Обработка rejected экшена getFeeds', () => {
    const errorMessage = 'Ошибка получения данных';

    const expectedState = {
      orders: [],
      total: 0,
      totalToday: 0,
      error: errorMessage
    };

    const actualState = feedsReducer(
      {
        ...initialState
      },
      getFeeds.rejected(new Error(errorMessage), '')
    );

    expect(actualState).toEqual(expectedState);
  });
});
