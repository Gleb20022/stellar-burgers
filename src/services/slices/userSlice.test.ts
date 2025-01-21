import {
  initialState,
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerNewUser,
  updateUserProfile
} from './userSlice';
import userReducer from './userSlice';
import { TUser } from '@utils-types';

describe('Проверка слоя "userSlice"', () => {
  const testUser: TUser = {
    email: 'test@test.ru',
    name: 'User'
  };

  const errorMessage = {
    message: 'Ошибка'
  };

  const actualState = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);

  describe('Тестирование fetchCurrentUser', () => {
    test('Обрабатка fulfilled экшена fetchCurrentUser', () => {
      const expectedState = {
        ...initialState,
        isAuthenticated: true,
        user: testUser,
        error: ''
      };

      const action = {
        type: fetchCurrentUser.fulfilled.type,
        payload: { user: testUser }
      };

      expect(actualState(action)).toEqual(expectedState);
    });

    test('Обрабатка rejected экшена fetchCurrentUser', () => {
      const expectedState = {
        ...initialState,
        isAuthenticated: false,
        error: errorMessage.message
      };

      const action = {
        type: fetchCurrentUser.rejected.type,
        error: errorMessage
      };

      expect(actualState(action)).toEqual(expectedState);
    });
  });

  describe('Тестирование updateUserProfile', () => {
    test('Обрабатка pending экшена updateUserProfile', () => {
      const expectedState = {
        ...initialState,
        error: ''
      };

      const action = {
        type: updateUserProfile.pending.type
      };

      expect(actualState(action)).toEqual(expectedState);
    });

    test('Обрабатка fulfilled экшена updateUserProfile', () => {
      const expectedState = {
        ...initialState,
        isAuthenticated: true,
        user: testUser,
        error: ''
      };

      const action = {
        type: updateUserProfile.fulfilled.type,
        payload: { user: testUser }
      };

      expect(actualState(action)).toEqual(expectedState);
    });

    test('Обрабатка rejected экшена updateUserProfile', () => {
      const expectedState = {
        ...initialState,
        isAuthenticated: false,
        error: errorMessage.message
      };

      const action = {
        type: updateUserProfile.rejected.type,
        error: errorMessage
      };

      expect(actualState(action)).toEqual(expectedState);
    });
  });

  describe('Тестирование registerNewUser', () => {
    test('Обрабатка pending экшена registerNewUser', () => {
      const expectedState = {
        ...initialState,
        error: ''
      };

      const action = {
        type: registerNewUser.pending.type
      };

      expect(actualState(action)).toEqual(expectedState);
    });

    test('Обрабатка fulfilled экшена registerNewUser', () => {
      const expectedState = {
        ...initialState,
        isAuthenticated: true,
        user: testUser,
        error: ''
      };

      const action = {
        type: registerNewUser.fulfilled.type,
        payload: { user: testUser }
      };

      expect(actualState(action)).toEqual(expectedState);
    });

    test('Обрабатка rejected экшена registerNewUser', () => {
      const expectedState = {
        ...initialState,
        error: errorMessage.message
      };

      const action = {
        type: registerNewUser.rejected.type,
        error: errorMessage
      };

      expect(actualState(action)).toEqual(expectedState);
    });
  });

  describe('Тестирование loginUser', () => {
    test('Обрабатка pending экшена loginUser', () => {
      const expectedState = {
        ...initialState,
        isAuthenticated: false,
        error: ''
      };

      const action = {
        type: loginUser.pending.type
      };

      expect(actualState(action)).toEqual(expectedState);
    });

    test('Обрабатка fulfilled экшена loginUser', () => {
      const expectedState = {
        ...initialState,
        isAuthenticated: true,
        user: testUser,
        error: ''
      };

      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: testUser }
      };

      expect(actualState(action)).toEqual(expectedState);
    });

    test('Обрабатка rejected экшена loginUser', () => {
      const expectedState = {
        ...initialState,
        isAuthenticated: false,
        error: errorMessage.message
      };

      const action = {
        type: loginUser.rejected.type,
        error: errorMessage
      };

      expect(actualState(action)).toEqual(expectedState);
    });
  });

  describe('Тестирование logoutUser', () => {
    test('Обрабатка fulfilled экшена logoutUser', () => {
      const action = {
        type: logoutUser.fulfilled.type
      };

      expect(actualState(action)).toEqual(initialState);
    });
  });
});
