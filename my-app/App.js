import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TelaCadastro from './src/pages/telaCadastro'
import TelaLogin from './src/pages/telaLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaAgenda from './src/pages/telaAgenda';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='TelaLogin' screenOptions={{headerShown: false}}>
          <Stack.Screen name="TelaLogin" component={TelaLogin} ></Stack.Screen>


          <Stack.Screen name='Cadastro' component={TelaCadastro}
          options={{title: 'Cadastro de usuários'}}/>
          <Stack.Screen name='Agenda' component={TelaAgenda}/>
        </Stack.Navigator>
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
