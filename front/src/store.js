import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cardReducer from './slices/cardSlice';

export default configureStore({
reducer: {
            userReducer: userReducer,
            cardReducer: cardReducer,
      },
})