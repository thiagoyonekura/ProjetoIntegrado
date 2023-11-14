import { TouchableOpacity, View, TextInput, Text } from "react-native";
import styled from "styled-components";
import { useState } from "react";
import Estilo from "../components/Estilo";

export default props=> {
    [valorLogin, setValorLogin] = useState('');
    [valorSenha, setValorSenha] = useState('');
    
    const Texto = styled.Text`
    text-align:center;
    `
    const Texto2 = styled.Text`
    color:#fff;
    text-align:center;
    `
    const BotaoLogin = styled.TouchableOpacity`
    background-color:#000;
    margin: 20px 25%;
    text-align:center;
    border-radius:30px;
    padding: 10px 0px;
    width:50%
    `
    return(
        <View style={Estilo.loginContainer}>
        <TextInput 
            style={Estilo.loginTextInputs}
            inputMode="email" 
            keyboardType="email-address" 
            maxLength={50}
            placeholder="E-mail" 
            placeholderTextColor={'#555'}
            value={valorLogin}
            onChangeText={ (valorLogin) => setValorLogin(valorLogin)}
            />
            
        <TextInput 
        style={Estilo.loginTextInputs}
            caretHidden={false} 
            maxLength={20} 
            placeholder="Senha" 
            secureTextEntry={true} 
            placeholderTextColor={'#555'}
            value={valorSenha}
            onChangeText={ (valorSenha) => setValorSenha(valorSenha) }/>
        
        <BotaoLogin onPress={()=>{
             props.navigation.push("Agenda") 
        }}>
                <Texto2>Fazer login</Texto2>
            </BotaoLogin>
            
        <TouchableOpacity 
        onPress={() => {
            props.navigation.push("Cadastro")
        }}
        >
            <Texto>Criar conta</Texto>
        </TouchableOpacity>
        </View>
    )

}