import React, { useState } from 'react';
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
  import { useSelector } from 'react-redux';

const EditProductScreen = props => {
    const [title, setTitle] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState('');
    const [discription, setDiscription] = useState('');

    const productId = props.navigation.getParam('productId');
    const editProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));
    
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
            value = {imageURL}
            onChangeText = {text => setImageURL(text)}
            />
        </View>

        <View style = {styles.formControl}>
            <Text style = {styles.label}>Price</Text>
            <TextInput 
                style = {styles.input} 
                value = {price}
                onChangeText = {text => setPrice(text)}
            />
        </View>

        <View style = {styles.formControl}>
            <Text style = {styles.label}>Discription</Text>
            <TextInput style = {styles.input}
                value = {discription}
                onChangeText = {text => setDiscription(text)}
            />
        </View>

       
        </View>
       
        
    </ScrollView>
    );
    
}

EditProductScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productID') 
                    ? 'Edit Product' 
                    : 'Add Product',
        headerRight: (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
            <Item 
                title = "Add" 
                iconName = { Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
                onPress = {
                           () => {}
                        }
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