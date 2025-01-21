import {
  addIngredient,
  deleteIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} from './constructorSlice';
import constructorReducer from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { TConstructorState } from './constructorSlice';

describe('Тестирование constructorSlice', () => {
  const ingredient1: TConstructorIngredient = {
    _id: '1',
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Ингредиент 1',
    price: 424,
    proteins: 420,
    type: 'main',
    id: '1'
  };

  const ingredient2: TConstructorIngredient = {
    _id: '2',
    calories: 2674,
    carbohydrates: 300,
    fat: 800,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    name: 'Ингредиент 2',
    price: 3000,
    proteins: 800,
    type: 'main',
    id: '2'
  };

  const ingredient3: TConstructorIngredient = {
    _id: '3',
    calories: 420,
    carbohydrates: 33,
    fat: 244,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    name: 'Ингредиент 3',
    price: 1337,
    proteins: 433,
    type: 'main',
    id: '3'
  };

  const bun: TConstructorIngredient = {
    _id: '4',
    calories: 200,
    carbohydrates: 50,
    fat: 10,
    image: 'image_bun.png',
    image_large: 'image_bun_large.png',
    image_mobile: 'image_bun_mobile.png',
    name: 'Ингредиент 4',
    price: 50,
    proteins: 10,
    type: 'bun',
    id: '4'
  };

  test('Обработка экшена добавления ингредиента', () => {
    const initialState: TConstructorState = { bun: null, ingredients: [] };
    const newState = constructorReducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  test('Обработка экшена добавления булки', () => {
    const initialState: TConstructorState = { bun: null, ingredients: [] };
    const newState = constructorReducer(initialState, addIngredient(bun));

    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  test('Обработка экшена удаления ингредиента', () => {
    const initialState = { bun: null, ingredients: [ingredient1] };
    const newState = constructorReducer(
      initialState,
      deleteIngredient(ingredient1)
    );

    expect(newState.ingredients).toHaveLength(0);
  });

  test('Обработка экшена очистки конструктора', () => {
    const initialState = { bun: bun, ingredients: [ingredient2] };
    const newState = constructorReducer(initialState, clearConstructor());

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([]);
  });

  describe('Обработка экшена изменения порядка ингредиентов в начинке', () => {
    describe('moveIngredientUp', () => {
      test('Перемещение ингредиента вверх в массиве', () => {
        const initialState: TConstructorState = {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3]
        };
        const action = moveIngredientUp(2);
        const newState = constructorReducer(initialState, action);

        expect(newState.ingredients).toEqual([
          ingredient1,
          ingredient3,
          ingredient2
        ]);
      });

      test('Не должен ничего делать, если индекс равен 0', () => {
        const initialState: TConstructorState = {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3]
        };
        const action = moveIngredientUp(0);
        const newState = constructorReducer(initialState, action);

        expect(newState.ingredients).toEqual(initialState.ingredients);
      });

      test('Не должен ничего делать, если индекс вне диапазона', () => {
        const initialState: TConstructorState = {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3]
        };
        const action = moveIngredientUp(3);
        const newState = constructorReducer(initialState, action);

        expect(newState.ingredients).toEqual(initialState.ingredients);
      });
    });

    describe('moveIngredientDown', () => {
      test('Перемещение ингредиента вниз в массиве', () => {
        const initialState: TConstructorState = {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3]
        };
        const action = moveIngredientDown(0);
        const newState = constructorReducer(initialState, action);

        expect(newState.ingredients).toEqual([
          ingredient2,
          ingredient1,
          ingredient3
        ]);
      });

      test('Не должен ничего делать, если индекс последний', () => {
        const initialState: TConstructorState = {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3]
        };
        const action = moveIngredientDown(2);
        const newState = constructorReducer(initialState, action);

        expect(newState.ingredients).toEqual(initialState.ingredients);
      });

      test('Не должен ничего делать, если индекс вне диапазона', () => {
        const initialState: TConstructorState = {
          bun: null,
          ingredients: [ingredient1, ingredient2, ingredient3]
        };
        const action = moveIngredientDown(-1);
        const newState = constructorReducer(initialState, action);

        expect(newState.ingredients).toEqual(initialState.ingredients);
      });
    });
  });
});
