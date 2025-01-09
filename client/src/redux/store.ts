import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice';
import popUpDisplayingReducer from './popUpDisplayingSlice.ts';
import deliveryPriceReducer from './deliverySlice.ts';
import authReducer from './authSlice.ts';
import chosenRestaurantReducer from './chosenRestaurantSlice.ts';
import currentRestaurantReducer from "./currentRestaurantSlice.ts";
import statusesReducer from "./statusesSlice.ts";
import modalReducer from "./modalSlice.ts";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/lib/constants";

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
        chosenRestaurant: persistedChosenRestaurantReducer,
        currentRestaurant: currentRestaurantReducer,
        statuses: statusesReducer,
        modal: modalReducer
    },
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
        return middleware;
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;