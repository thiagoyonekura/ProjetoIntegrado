import { TouchableOpacity } from "react-native";
import styled from "styled-components";

export default function TelaLogin(props){
    const Container = styled.View `
    margin-top:30px;
    padding:60% 5%;
    `
    const Input = styled.TextInput`
    border: solid 1px #ccc;
    border-radius: 30px;
    margin: 20px;
    padding: 15px;
    `
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
        <Container>
        <Input 
            inputMode="email" 
            keyboardType="email-address" 
            maxLength={50}
            placeholder="E-mail" 
            placeholderTextColor={'#555'}/>
        <Input 
            caretHidden={false} 
            maxLength={20} 
            placeholder="Senha" 
            secureTextEntry={true} 
            placeholderTextColor={'#555'}/>
        
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
        </Container>
    )
}