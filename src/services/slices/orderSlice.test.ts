import { TOrderState } from './orderSlice';
import orderReducer, { fetchOrder, clearOrder } from './orderSlice';
import { TOrder } from '@utils-types';

describe('Тестирование orderSlice', () => {
  const initialState: TOrderState = {
    orderModalData: null,
    orderRequest: false,
    error: null
  };

  test('Начальное состояние соответствует initialState', () => {
    const actualState = orderReducer(undefined, { type: '' });
    expect(actualState).toEqual(initialState);
  });

  test('Обработка pending экшена fetchOrder', () => {
    const actualState = orderReducer(initialState, fetchOrder.pending('', []));
    const expectedState = {
      orderModalData: null,
      orderRequest: true,
      error: null
    };
    expect(actualState).toEqual(expectedState);
  });

  test('Обработка fulfilled экшена fetchOrder', () => {
    const order: TOrder = {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2025-01-21',
      updatedAt: '2025-01-21',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    };

    const action = fetchOrder.fulfilled(
      { success: true, order, name: 'Order 1' },
      '',
      []
    );

    const actualState = orderReducer(initialState, action);
    const expectedState = {
      orderModalData: order,
      orderRequest: false,
      error: null
    };

    expect(actualState).toEqual(expectedState);
  });

  test('Обработка rejected экшена fetchOrder', () => {
    const errorMessage = 'Ошибка получения заказа';
    const action = fetchOrder.rejected(new Error(errorMessage), '', []);

    const actualState = orderReducer(initialState, action);
    const expectedState = {
      orderModalData: null,
      orderRequest: false,
      error: errorMessage
    };

    expect(actualState).toEqual(expectedState);
  });

  test('Обработка экшена очистки данных', () => {
    const state: TOrderState = {
      orderModalData: {
        _id: '1',
        status: 'done',
        name: 'Order 1',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      },
      orderRequest: false,
      error: null
    };

    const actualState = orderReducer(state, clearOrder());
    const expectedState = initialState;

    expect(actualState).toEqual(expectedState);
  });
});
