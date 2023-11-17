import {  TextInput, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import Estilo from "../components/Estilo";

// usuario/usuarioepaciente

export default function TelaCadastro(props){
    const BotaoCadastro = styled.TouchableOpacity`
    background-color:#000;
    margin: 20px 25%;
    text-align:center;
    border-radius:30px;
    padding: 10px 0px;
    width:50%
    `
    const Texto = styled.Text`
    text-align:center;
    `
    const Texto2 = styled.Text`
    color:#fff;
    text-align:center;
    `
    return(
        <View style={Estilo.loginContainer}>
            <TextInput 
            autoCapitalize="words" 
            maxLength={50} 
            placeholder="Nome Completo" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            /> 
            <TextInput 
            inputMode="email" 
            keyboardType="email-address" 
            maxLength={50} 
            placeholder="E-mail" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            />
            <TextInput 
            inputMode="tel" 
            keyboardType="numeric" 
            maxLength={11} 
            placeholder="Telefone" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            />
            <TextInput 
            keyboardType="numeric" 
            maxLength={11} 
            placeholder="CPF" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            />
            <TextInput 
            keyboardType="numeric" 
            maxLength={8} 
            placeholder="Data de Nascimento" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            />
            <TextInput 
            caretHidden={false} 
            maxLength={20} 
            placeholder="Senha" 
            placeholderTextColor={'#555'}
            secureTextEntry={true}
            style={Estilo.loginTextInputs}
            />
            <TextInput 
            caretHidden={false} 
            maxLength={20} 
            placeholder="Confirmar Senha" 
            placeholderTextColor={'#555'}
            secureTextEntry={true}
            style={Estilo.loginTextInputs}
            />
            <BotaoCadastro>
                <Texto2>Cadastrar</Texto2>
            </BotaoCadastro>
            <TouchableOpacity onPress={() => {
            props.navigation.goBack()
        }}>
                <Texto>Fazer login</Texto>
            </TouchableOpacity>
        
        </View>
    )
    
}