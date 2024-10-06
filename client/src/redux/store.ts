import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice';
import popUpDisplayingReducer from './popUpDisplayingSlice.ts';
import deliveryPriceReducer from './deliverySlice.ts';
import authReducer from './authSlice.ts';
import chosenRestaurantReducer from './chosenRestaurantSlice.ts';

const cartPersistConfig = {
    key: 'cart',
    storage,
};

const chosenRestaurantPersistConfig = {
    key: 'chosenRestaurant',
    storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedChosenRestaurantReducer = persistReducer(chosenRestaurantPersistConfig, chosenRestaurantReducer);

const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        popUpDisplaying: popUpDisplayingReducer,
        deliveryPrice: deliveryPriceReducer,
        auth: authReducer,
        chosenRestaurant: persistedChosenRestaurantReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;