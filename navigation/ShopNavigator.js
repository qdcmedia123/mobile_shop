import React from 'react';
import { 
          createAppContainer,
          createSwitchNavigator
        } from 'react-navigation';
import {useDispatch} from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, Text, View, SafeAreaView, Button } from 'react-native';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

import OrdersScreen from '../screens/shop/OrdersScreen';

import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserProudctsScreen from '../screens/user/UserProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
// Admin
import EditProductScreen from '../screens/user/EditProdutScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';



const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
      ),
    },

    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducs: UserProudctsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);



const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOption: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return <View>
        <SafeAreaView forceInset = {{top: 'always', 'horizontal': 'never'}} >
          <DrawerItems {...props} />
          <Button 
                  title = "Logout" 
                  color={Colors.primary}
                  onPress = {() => {
                    dispatch(authActions.logout());
                    //props.navigation.navigate('Auth');
                  }}              
                />
        </SafeAreaView>
      </View>
    }
   
  }
);

const AuthNavigator = createStackNavigator({
  Auth:AuthScreen
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);
