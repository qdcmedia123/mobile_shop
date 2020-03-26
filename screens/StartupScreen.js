import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

import {
        View,
        ActivityIndicator,
        StyleSheet,
        AsyncStorage
    } from 'react-native';

    import Colors from '../constants/Colors';


    const StartupScreen = props => {
       const dispatch = useDispatch();
        useEffect(() => {
            const tryLogin = async() => {
               const userData = await AsyncStorage.getItem('userData');
               if(!userData) {
                   props.navigation.navigate('Auth');
                   return;
               }
               // get token      
               const transformedData = JSON.parse(userData);
               const{token, userId, expiryData} = transformedData;

               const expirationDate = new Date(expiryData);
               if(expirationDate <= new Date() || !token || !userId) {
                  props.navigation.navigate('Auth'); 
                  return;
               }

               const expirationTime = expirationDate.getTime() - new Date().getTime();

               props.navigation.navigate('Shop')
               dispatch(authActions.authenticate(userId, token, expirationTime));


            };

            tryLogin()
        }, [dispatch])

        return <View style = {StyleSheet.screen}>
             <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    }

    const styles = StyleSheet.create({
        screen: {
            flex:1,
            justifyContent:'center',
            alignItems:'center'
,
        }
    });

    export default StartupScreen;