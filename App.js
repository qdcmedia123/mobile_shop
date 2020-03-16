import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import cartReducer from './store/reducers/cart';
import OrdersReducer from './store/reducers/orders';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: OrdersReducer,
});

//const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator style={{ marginTop: '8%' }} />
    </Provider>
  );
}
