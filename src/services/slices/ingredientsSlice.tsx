import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredientsList',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredientsBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message || 'Не удалось получить ингредиенты';
      });
  },
  selectors: {
    ingredientsState: (state) => state,
    isIngredientsLoadingState: (state) => state.isIngredientsLoading,
    getIngredients: (state) => state.ingredients
  }
});

export const { ingredientsState, isIngredientsLoadingState, getIngredients } =
  ingredientsSlice.selectors;

const ingredientReducer = ingredientsSlice.reducer;
export default ingredientReducer;
