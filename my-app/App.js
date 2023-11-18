import React from 'react';
import {  StyleSheet, Text, TouchableOpacity } from 'react-native';
import TelaCadastro from './src/pages/telaCadastro'
import TelaLogin from './src/pages/telaLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import telaLogado from './src/pages/telaLogado';
import telaMedicos from './src/pages/telaMedicos';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import telaPerfil from './src/pages/telaPerfil';
import MeuContextoProvidender from './src/context/UserContext';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
        <MeuContextoProvidender>
        <Stack.Navigator initialRouteName='TelaLogin' screenOptions={{headerShown: true, headerBackVisible:false}}>
          <Stack.Screen name="Entrar" component={TelaLogin} ></Stack.Screen>

          <Stack.Screen name='Cadastro' component={TelaCadastro}
          options={{title: 'Cadastro de usuários'}}/>

          <Stack.Screen name='Home' component={telaLogado} options={({navigation}) => ({headerRight: () =>(<>
          <TouchableOpacity onPress={()=> (navigation.navigate('Agendar'))}
          style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
            
            <Ionicons name="add" size={24} color="black" />
            <Text style={{ marginRight: 0, fontWeight: 'bold' }}>Nova Consulta</Text>            
            </TouchableOpacity>
          <TouchableOpacity onPress={()=> (navigation.navigate('Perfil'))}>
          <AntDesign name="user" size={30} color="black" />
          </TouchableOpacity>
          </>)})}/>
          <Stack.Screen name='Agendar' component={telaMedicos} options={({navigation})=>({headerLeft: ()=>(<>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
        }}><AntDesign name="back" size={24} color="black" /></TouchableOpacity>
          </>)})}></Stack.Screen>
          <Stack.Screen name='Perfil' component={telaPerfil} options={({navigation})=>({headerLeft: ()=>(<>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
        }}><AntDesign name="back" size={24} color="black" /></TouchableOpacity>
          </>)})}></Stack.Screen>
        </Stack.Navigator>
        </MeuContextoProvidender>
      </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
