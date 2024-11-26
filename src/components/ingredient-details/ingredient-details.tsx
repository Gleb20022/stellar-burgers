import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import {
  ingredientsState,
  getIngredientsList
} from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(ingredientsState);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredientsList());
    }
  }, [dispatch, ingredients]);

  const { id } = useParams<{ id: string }>();
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
