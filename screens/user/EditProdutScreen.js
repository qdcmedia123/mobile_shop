import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform
  } from 'react-native';
  import  HeaderButton  from '../../components/UI/HeaderButton';
  import { HeaderButtons, Item } from 'react-navigation-header-buttons';
  import { useSelector, useDispatch} from 'react-redux';
  import * as productsActions from '../../store/actions/products';

const EditProductScreen = props => {
    const dispatch = useDispatch();

    const productId = props.navigation.getParam('productId');

    const editProduct = useSelector(
        state => state.products.userProducts.find(prod => prod.id === productId)
      );

    const [title, setTitle] = useState(editProduct ? editProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editProduct ? editProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editProduct ? editProduct.description : '');

  
    const submitHandler = useCallback(() => {
      if(editProduct) {
        console.log('Edit screen fired');
        console.log(title);
        dispatch(productsActions.updateProduct(productId, title, description, imageUrl))
      } else {
        
        dispatch(productsActions.createProduct(title, description, imageUrl, +price))
      }
      props.navigation.goBack();
    }, [dispatch, productId, title, description, imageUrl, price]);

    useEffect(() => {
      props.navigation.setParams({submit: submitHandler});
    }, [submitHandler])
    
    
    return (
        <ScrollView>
        <View style = {styles.form}>
        <View style = {styles.formControl}>
            <Text style = {styles.label}>Title</Text>
            <TextInput 
             style = {styles.input}
             value = {title}
             onChangeText = {text => setTitle(text)}
             />
        </View>

        <View style = {styles.formControl}>
            <Text style = {styles.label}>Image URL</Text>
            <TextInput 
            style = {styles.input}
            value = {imageUrl}
            onChangeText = {text => setImageUrl(text)}
            />
        </View>
        {
          editProduct ? null : 
            <View style = {styles.formControl}>
            <Text style = {styles.label}>Price</Text>
            <TextInput 
                style = {styles.input} 
                value = {price}
                onChangeText = {text => setPrice(text)}
            />
        </View> 
        }
        

        <View style = {styles.formControl}>
            <Text style = {styles.label}>Discription</Text>
            <TextInput style = {styles.input}
                value = {description}
                onChangeText = {text => setDescription(text)}
            />
        </View>

       
        </View>
       
        
    </ScrollView>
    );
    
}

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') 
                    ? 'Edit Product' 
                    : 'Add Product',
        headerRight: (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
            <Item 
                title = "Add" 
                iconName = { Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
                onPress = {submitFn}
                />
          </HeaderButtons>
          )
    };
}

const styles = StyleSheet.create({
    form: {
      margin: 20
    },
    formControl: {
      width: '100%'
    },
    label: {
      fontFamily: 'open-sans-bold',
      marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    }
  });

export default EditProductScreen;