import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import Estilo from "../components/Estilo"

export default function TelaCadastro(){
    return(
        <>
        <SafeAreaView>
            <Text>Nome:</Text>
            <TextInput autoCapitalize="words" maxLength={50} 
            placeholder="Nome Completo"/> 
            <Text>E-mail:</Text>
            <TextInput inputMode="email" keyboardType="email-address" maxLength={50} placeholder="E-mail"></TextInput>
            <Text>Número:</Text>
            <TextInput inputMode="tel" keyboardType="numeric" maxLength={11} placeholder="(11)11111-1111"></TextInput>
            <Text>CPF:</Text>
            <TextInput keyboardType="numeric" maxLength={11} placeholder="111.111.111-11"></TextInput>
            <Text>Data de Nascimento:</Text>
            <TextInput keyboardType="numeric" maxLength={8} placeholder="01/01/1991"></TextInput>
            <Text>Senha:</Text>
            <TextInput caretHidden={false} maxLength={20} placeholder="Senha" 
            secureTextEntry={true}></TextInput>
            <TouchableOpacity>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Fazer login</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    )
    
}
// o react native tem a função onblur -> usar ela para validar o regex das inputs