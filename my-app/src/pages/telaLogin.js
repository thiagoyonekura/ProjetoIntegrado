import { TouchableOpacity } from "react-native";
import styled from "styled-components";

export default function TelaLogin(){
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
    const BotaoLogin = styled.TouchableOpacity`
    margin: 20px 25%;
    text-align:center;
    border-radius:30px;
    border: solid 1px #ccc;
    padding: 10px 0px;
    width:50%
    `
    return(
        <Container>
        <Input 
            inputMode="email" 
            keyboardType="email-address" 
            maxLength={50}
            placeholder="E-mail" />
        <Input 
            caretHidden={false} 
            maxLength={20} 
            placeholder="Senha" 
            secureTextEntry={true} />
        
        <BotaoLogin >
                <Texto>Fazer login</Texto>
            </BotaoLogin>
            
        < TouchableOpacity>
            <Texto>Criar conta</Texto>
        </TouchableOpacity>
        </Container>
    )
}