import {  Alert, TextInput, View } from "react-native"
import styled from "styled-components"
import Estilo from "../components/Estilo";
import { useState, useContext } from "react";
import { MeuContexto } from "../context/UserContext";

export default props =>{
    const {userId, set} = useContext(MeuContexto)
    const initialEmail = userId.usuario.email;
    const initialTel = userId.usuario.telefone;
    const initialSenha = userId.usuario.senha;
    const Id = userId.usuario.id;
    [userEmail, setEmail] = useState(initialEmail);
    [tel, setTel] = useState(initialTel);
    [userSenha, setSenha] = useState(initialSenha);

    function handleLogin(){
        const data = {id:Id, nome: userId.usuario.nome, cpf: userId.usuario.cpf, dataNascimento: userId.usuario.dataNascimento, email: userEmail, telefone: tel, senha: userSenha}
          try {
            const response = fetch('https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/usuario/'+ Id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
        
            if (response.status !== 400) {
              set(data)
              Alert.alert('Cadastro atualizado com sucesso!')
              props.navigation.goBack()
            } else {
              Alert.alert('Erro', data.message || 'Erro ao atualizar.');
            }
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
          }
        }
    
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
            <Texto>Alterar dados: </Texto>
            <TextInput 
            inputMode="email" 
            keyboardType="email-address" 
            maxLength={50} 
            placeholder="E-mail" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={userEmail}
            onChangeText={ (userEmail) => setEmail(userEmail)}
            />

            <TextInput 
            inputMode="tel" 
            keyboardType="numeric" 
            maxLength={11} 
            placeholder="Telefone" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={tel}
            onChangeText={ (tel) => setTel(tel)}
            />


            <TextInput 
            caretHidden={false} 
            maxLength={20} 
            placeholder="Senha" 
            placeholderTextColor={'#555'}
            secureTextEntry={true}
            style={Estilo.loginTextInputs}
            value={userSenha}
            onChangeText={ (userSenha) => setSenha(userSenha) }
            />
            
            <BotaoCadastro
            onPress={()=>{handleLogin()}}>
                <Texto2>Confirmar</Texto2>
            </BotaoCadastro>
        
        </View>
    )
}