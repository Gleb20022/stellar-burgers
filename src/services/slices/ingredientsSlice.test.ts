import ingredientReducer, { getIngredientsList } from './ingredientsSlice';
import { TIngredientsState } from './ingredientsSlice';

describe('Тестирование ingredientsSlice', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    isIngredientsLoading: false,
    error: null
  };

  test('Начальное состояние соответствует initialState', () => {
    const actualState = ingredientReducer(undefined, { type: '' });
    expect(actualState).toEqual(initialState);
  });

  test('Обрабатка pending экшена getIngredientsList', () => {
    const actualState = ingredientReducer(
      initialState,
      getIngredientsList.pending('')
    );
    const expectedState = {
      ingredients: [],
      isIngredientsLoading: true,
      error: null
    };
    expect(actualState).toEqual(expectedState);
  });

  test('Обрабатка fulfilled экшена getIngredientsList', () => {
    const ingredients = [
      {
        _id: '1',
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        name: 'Ингредиент 1',
        price: 424,
        proteins: 420,
        type: 'main'
      },
      {
        _id: '2',
        calories: 2674,
        carbohydrates: 300,
        fat: 800,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        name: 'Ингредиент 2',
        price: 3000,
        proteins: 800,
        type: 'main'
      },
      {
        _id: '3',
        calories: 420,
        carbohydrates: 33,
        fat: 244,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        name: 'Ингредиент 3',
        price: 1337,
        proteins: 433,
        type: 'main'
      }
    ];

    const actualState = ingredientReducer(
      initialState,
      getIngredientsList.fulfilled(ingredients, '')
    );
    const expectedState = {
      ingredients,
      isIngredientsLoading: false,
      error: null
    };

    expect(actualState).toEqual(expectedState);
  });

  test('Обрабатка rejected экшена getIngredientsList', () => {
    const errorMessage = 'Не удалось получить ингредиенты';

    const actualState = ingredientReducer(
      initialState,
      getIngredientsList.rejected(new Error(errorMessage), '')
    );
    const expectedState = {
      ingredients: [],
      isIngredientsLoading: false,
      error: errorMessage
    };

    expect(actualState).toEqual(expectedState);
  });
});
