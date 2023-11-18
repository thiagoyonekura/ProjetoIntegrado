import {  TextInput, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import Estilo from "../components/Estilo";
import { useState } from "react";

// usuario/usuarioepaciente

export default function TelaCadastro(props){
    [nome, setNome] = useState('');
    [email, setEmail] = useState('');
    [tel, setTel] = useState('')

    const {userId, userSetId, base, set} = useContext(MeuContexto)
    
    const handleLogin = async () => {
        try {
          const response = await fetch('https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/usuario/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email : valorLogin, senha : valorSenha }),
          });
      
          const data = await response.json();
      
          if (response.status === 200 && data) {
            set(data)
            props.navigation.push("Home") 
            // Aqui você pode redirecionar para outra tela ou salvar o token
          } else {
            // Login falhou
            Alert.alert('Erro', data.message || 'Falha no login.');
          }
        } catch (error) {
          // Erro de rede ou código de erro não capturado
          Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
      };
      
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