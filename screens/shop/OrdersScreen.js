import React, {useEffect, useState } from 'react';
import { FlatList, Platform, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';

const OrderScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    });
  }, [dispatch]);
  
  if(isLoading) {
    return <View style = {styles.centered}>
       <ActivityIndicator size = 'small'></ActivityIndicator>
    </View>
  }

  if(orders.length === 0) {
    return <View style = {styles.centered}>
      <Text> No order found. Start adding something.</Text>
    </View>
  }


  return (
    <FlatList
      data={orders}
      keyExtractor={(item, index) => {
        return item.id
  }}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default OrderScreen;
