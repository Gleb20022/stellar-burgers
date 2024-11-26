import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorSelector,
  clearConstructor
} from '../../services/slices/constructorSlice';
import {
  getOrderRequest,
  clearOrder,
  getorderModalData,
  fetchOrder
} from '../../services/slices/orderSlice';
import { isAuthCheckedSelector } from '../../services/slices/UserSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(constructorSelector.selectedIngredients);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getorderModalData);
  const isAuth = useSelector(isAuthCheckedSelector);

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(fetchOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
