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
      if (userSenha === confirma) {
          // Divide a data de nascimento em dia, mês e ano
          const partesData = nasc.split('/');
          if (partesData.length === 3) {
              // Subtrai 1 do mês, pois os meses em JavaScript começam do 0
              const ano = parseInt(partesData[2], 10);
              const mes = parseInt(partesData[1], 10) - 1;
              const dia = parseInt(partesData[0], 10);
  
              // Cria o objeto Date com ano, mês e dia
              const dataNasc = new Date(ano, mes, dia);
  
              // Objeto com os dados do usuário
              const data = {
                  id: 0,
                  nome: userNome,
                  cpf: userCpf,
                  dataNascimento: dataNasc.toISOString(), // Converte para o formato ISO para envio
                  email: userEmail,
                  telefone: tel,
                  senha: userSenha
              };
  
              try {
                  // Faz a requisição POST com os dados do usuário
                  const response = await fetch('https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/usuario/UsuarioEPaciente', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data),
                  });
  
                  if (response.status === 200 || response.status === 201) {
                      set(data);
                      Alert.alert('Cadastrado com sucesso!');
                      props.navigation.goBack();
                  } else {
                      const responseData = await response.json(); // Obtem a resposta JSON
                      Alert.alert('Erro', responseData.message || 'Erro ao cadastrar.');
                  }
              } catch (error) {
                  Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
              }
          } else {
              Alert.alert('Erro', 'Formato de data de nascimento inválido.');
          }
      } else {
          Alert.alert('Os campos de senha devem ser iguais');
      }
  };

      const formatarData = (data) => {
        // Remove qualquer caractere que não seja número
        const numeros = data.replace(/[^0-9]/g, '');
    
        // Dividir a string em partes para dia, mês e ano
        let dia = numeros.slice(0, 2);
        let mes = numeros.slice(2, 4);
        let ano = numeros.slice(4, 8);
    
        // Montar a data formatada
        let dataFormatada = dia;
        if (dia.length === 2 && numeros.length > 2) {
            dataFormatada += '/' + mes;
            if (mes.length === 2 && numeros.length > 4) {
                dataFormatada += '/' + ano;
            }
        }
    
        return dataFormatada;
    }
    
    const handleNascChange = (data) => {
        const dataFormatada = formatarData(data);
        setNasc(dataFormatada);
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
            <TextInput 
            autoCapitalize="words" 
            maxLength={50} 
            placeholder="Nome Completo *" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={userNome}
            onChangeText={ (userNome) => setNome(userNome)}
            /> 
            <TextInput 
            inputMode="email" 
            keyboardType="email-address" 
            maxLength={50} 
            placeholder="E-mail *" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={userEmail}
            onChangeText={ (userEmail) => setEmail(userEmail)}
            />
            <TextInput 
            inputMode="tel" 
            keyboardType="numeric" 
            maxLength={11} 
            placeholder="Telefone *" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={tel}
            onChangeText={ (tel) => setTel(tel)}
            />
            <TextInput 
            keyboardType="numeric" 
            maxLength={11} 
            placeholder="CPF *" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={userCpf}
            onChangeText={ (userCpf) => setCpf(userCpf)}
            />
            <TextInput 
            keyboardType="numeric" 
            maxLength={10} 
            placeholder="Data de Nascimento (DD/MM/YYYY) *" 
            placeholderTextColor={'#555'}
            style={Estilo.loginTextInputs}
            value={nasc}
            onChangeText={handleNascChange}
        />
            <TextInput 
            caretHidden={false} 
            maxLength={20} 
            placeholder="Senha *" 
            placeholderTextColor={'#555'}
            secureTextEntry={true}
            style={Estilo.loginTextInputs}
            value={userSenha}
            onChangeText={ (userSenha) => setSenha(userSenha) }
            />
            <TextInput 
            caretHidden={false} 
            maxLength={20} 
            placeholder="Confirmar Senha *" 
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