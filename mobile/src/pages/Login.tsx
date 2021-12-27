import React from "react";
import { useNavigation } from "@react-navigation/native";
import {KeyboardAvoidingView, StyleSheet, TouchableOpacity, View, Text, Image, TextInput} from "react-native";


export default function Login(){
    const navigation = useNavigation();

    function handlerLogin(){
        navigation.navigate('CollectionMap');
    }

    return(
        <KeyboardAvoidingView style = {styles.background}>

            <View style= {styles.ContainerLogo}>
                <Image source = {require('../images/Logo.png')} />
            </View>

        <View
         style= {styles.container}>

            <TextInput
            keyboardType = 'email-address'
            style = {styles.input}
            placeholder= "Email"
            autoCorrect = {false}
            onChangeText = {()=> {}}
            />

            <TextInput
            secureTextEntry
            style = {styles.input}
            placeholder= "Senha"
            autoCorrect = {false}
            onChangeText = {()=> {}}
            />

        <TouchableOpacity style= {styles.buttonSubmit} onPress= {handlerLogin}>
            <Text style= {styles.submitText} >Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style= {styles.buttonRegister}>
            <Text style= {styles.submitRegister}>Criar Conta</Text>
        </TouchableOpacity>

        </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#15b6d6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    ContainerLogo:{
        flex: 0.8,
        justifyContent: 'center'
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        paddingBottom: 50,
    },
    
    input:{
       backgroundColor: '#fff',
       width: 300,
       marginBottom: 15,
       fontFamily: 'Nunito_600SemiBold',
       color: '#222',
       fontSize: 17,
       borderRadius: 7,
       padding: 10,
    },

    buttonSubmit: {
        backgroundColor:'#3CDC8C',
        width: 300,
        height: 45,
        fontFamily: 'Nunito_600SemiBold',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    }, 

    submitText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Nunito_600SemiBold',

    },
    buttonRegister:{
        marginTop: 10,
        
    },

    submitRegister:{
        color: '#fff',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
    }

});
