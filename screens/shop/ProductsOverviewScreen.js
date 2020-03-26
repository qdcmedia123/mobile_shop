import React, {useEffect, useState, useCallback} from 'react';
import { 
          FlatList,
          Text,
          Platform,
          Button,
          ActivityIndicator,
          StyleSheet,
          View
        } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/Productitem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = useCallback (async() => {
    console.log('LODING PRODUCT');
    setIsRefreshing(true)
    setError(null);
  
    try{
      await dispatch(productsActions.fetchProducts());
    } catch(err){
      setError(err.message);
    }
    setIsRefreshing(false)
    
  }, [dispatch, setIsLoading, setError])
  
  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

    return () => {
      willFocusSub.remove();
    }
  }, [loadProducts])

  useEffect(() => {
   setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    })
  }, [dispatch, loadProducts])

  if(error){
    return (<View style = {styles.centered}>
      <Text>An Error occured!</Text>
      <Button title = "Try Again" onPress={loadProducts}></Button>
    </View>)
  }

  if(isLoading) {
    return (<View style = {styles.centered}>
      <ActivityIndicator color= {Colors.primary} />
    </View>)
  }

  if(!isLoading && products.length === 0) {
    return (<View style = {styles.centered}>
      <Text>No Product found, Start adding</Text>
    </View>)
  }
  return (
    <FlatList
    onRefresh={loadProducts}
    refreshing={isLoading}
      data={products}
      keyExtractor={(item, index) => {
            return item.id
      }}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ,

    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  centered: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }
})
export default ProductsOverviewScreen;
