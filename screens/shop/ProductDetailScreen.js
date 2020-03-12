import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  Button,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import ProductItem from '../../components/shop/Productitem';
import { useSelector } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedproduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  return (
    <ScrollView>
      <View>
        <Image
          style={styles.image}
          source={{ uri: selectedproduct.imageUrl }}
        />
        <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.price}>${selectedproduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedproduct.description}</Text>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
