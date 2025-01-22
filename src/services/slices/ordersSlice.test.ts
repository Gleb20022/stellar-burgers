import ordersReducer, { fetchOrders } from './ordersSlice';
import { TOrdersState } from './ordersSlice';
import { TOrder } from '@utils-types';

describe('Тестирование ordersSlice', () => {
  const initialState: TOrdersState = {
    orders: []
  };

  test('Начальное состояние соответствует initialState', () => {
    const actualState = ordersReducer(undefined, { type: '' });
    expect(actualState).toEqual(initialState);
  });

  test('Обработка fulfilled экшена fetchOrders', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Order 1',
        createdAt: '2025-01-21',
        updatedAt: '2025-01-21',
        number: 1,
        ingredients: ['ingredient1', 'ingredient2']
      },
      {
        _id: '2',
        status: 'done',
        name: 'Order 2',
        createdAt: '2025-01-22',
        updatedAt: '2025-01-22',
        number: 2,
        ingredients: ['ingredient3', 'ingredient4']
      }
    ];

    const action = fetchOrders.fulfilled(orders, '');

    const actualState = ordersReducer(initialState, action);
    const expectedState: TOrdersState = {
      orders
    };

    expect(actualState).toEqual(expectedState);
  });
});
