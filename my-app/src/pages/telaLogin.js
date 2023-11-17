import { TouchableOpacity, View, TextInput, Text, Alert } from "react-native";
import styled from "styled-components";
import { useState } from "react";
import Estilo from "../components/Estilo";

export default props=> {
    [valorLogin, setValorLogin] = useState('');
    [valorSenha, setValorSenha] = useState('');
    
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
            // Login foi bem-sucedido
            console.log(data)
        
            props.navigation.push("Home") 
            // Aqui você pode redirecionar para outra tela ou salvar o token
          } else {
            // Login falhou
            Alert.alert('Erro', data.message || 'Falha no login');
          }
        } catch (error) {
          // Erro de rede ou código de erro não capturado
          Alert.alert('Erro', 'Não foi possível conectar ao servidor');
        }
      };
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
            handleLogin()
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