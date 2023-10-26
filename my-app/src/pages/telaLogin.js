import { TouchableOpacity } from "react-native";
import { Text } from "react-native";


export default function TelaLogin(){
    return(
        <>
        <Text>E-mail:</Text>
        <TextInput inputMode="email" keyboardType="email-address" maxLength={50} placeholder="E-mail"></TextInput>
        <Text>Senha:</Text>
            <TextInput caretHidden={false} maxLength={20} placeholder="Senha" 
            secureTextEntry={true}></TextInput>
        <TouchableOpacity>
                <Text>Fazer login</Text>
            </TouchableOpacity>
        <TouchableOpacity>
            <Text>Cadastrar</Text>
        </TouchableOpacity>
        </>
    )
}