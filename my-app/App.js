import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import TelaCadastro from './src/pages/telaCadastro'
import TelaLogin from './src/pages/telaLogin';

export default function App() {
  return (
    <SafeAreaView>
      <TelaCadastro></TelaCadastro>
    </SafeAreaView>
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
