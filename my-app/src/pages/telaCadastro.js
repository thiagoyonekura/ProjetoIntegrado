import {  Alert, TextInput, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import Estilo from "../components/Estilo";
import { useState, useContext } from "react";
import { MeuContexto } from "../context/UserContext";

export default function TelaCadastro(props){
    [userNome, setNome] = useState('');
    [userEmail, setEmail] = useState('');
    [tel, setTel] = useState('');
    [userCpf, setCpf] = useState('');
    [nasc, setNasc] = useState('');
    [userSenha, setSenha] = useState('');
    [confirma, setConfirma] = useState('');
    const {set} = useContext(MeuContexto)
    
    const handleLogin = async () => {
        if(userSenha === confirma){
          const dataNasc = new Date(nasc.slice(4,7), nasc.slice(2,3), nasc.slice(0,1), 0,0,0);
          const data = {id:0, nome: userNome, cpf: userCpf, dataNascimento: dataNasc, email: userEmail, telefone: tel, senha: userSenha}
          try {
            const response = await fetch('https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/usuario/UsuarioEPaciente', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
        
        
            if (response.status === 200 || response.status === 201) {
              set(data)
              Alert.alert('Cadastrado com sucesso!')
              props.navigation.goBack()
            } else {
              Alert.alert('Erro', data.message || 'Erro ao cadastrar.');
            }
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
          }
        }else{
          Alert.alert('Os campos de senha devem ser iguais');
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
            value={userNome}
            onChangeText={ (userNome) => setNome(userNome)}
            /> 
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
            keyboardType="numeric" 
            maxLength={11} 
            placeholder="CPF" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={userCpf}
            onChangeText={ (userCpf) => setCpf(userCpf)}
            />
            <TextInput 
            keyboardType="numeric" 
            maxLength={8} 
            placeholder="Data de Nascimento" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={nasc}
            onChangeText={ (nasc) => setNasc(nasc)}
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
            <TextInput 
            caretHidden={false} 
            maxLength={20} 
            placeholder="Confirmar Senha" 
            placeholderTextColor={'#555'}
            secureTextEntry={true}
            style={Estilo.loginTextInputs}
            value={confirma}
            onChangeText={ (confirma) => setConfirma(confirma)}
            />
            <BotaoCadastro
            onPress={()=>{handleLogin()}}>
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