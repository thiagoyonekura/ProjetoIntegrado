import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import styled from "styled-components"

export default function TelaCadastro(){
    const Container = styled.View`
    margin: 30% 5%;
    `
    const Input = styled.TextInput`
    border: solid 1px #ccc;
    padding: 10px 20px;
    margin-bottom: 15px;
    border-radius:30px;
    `
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
        <Container>
            <Input autoCapitalize="words" maxLength={50} 
            placeholder="Nome Completo" placeholderTextColor={'#555'}/> 
            <Input inputMode="email" keyboardType="email-address" maxLength={50} placeholder="E-mail" placeholderTextColor={'#555'}></Input>
            <Input inputMode="tel" keyboardType="numeric" maxLength={11} placeholder="Telefone" placeholderTextColor={'#555'}></Input>
            <Input keyboardType="numeric" maxLength={11} placeholder="CPF" placeholderTextColor={'#555'}></Input>
            <Input keyboardType="numeric" maxLength={8} placeholder="Data de Nascimento" placeholderTextColor={'#555'}></Input>
            <Input caretHidden={false} maxLength={20} placeholder="Senha" placeholderTextColor={'#555'}
            secureTextEntry={true}></Input>
            <BotaoCadastro>
                <Texto2>Cadastrar</Texto2>
            </BotaoCadastro>
            <TouchableOpacity>
                <Texto>Fazer login</Texto>
            </TouchableOpacity>
        </Container>
    )
    
}
// o react native tem a função onblur -> usar ela para validar o regex das inputs