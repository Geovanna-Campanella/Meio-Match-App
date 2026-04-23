import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  function handleCadastro() {

    if (senha == confirmarSenha){
      navigation.navigate('Home');
    }
     
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
  
        <View style={styles.card}>
    
          <View style={styles.greenLine} />

          <Text style={styles.title}>Criar Célula</Text>
          <Text style={styles.subtitle}>registre seu material genético</Text>

          
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#6B5FA0"
            value={nome}
            onChangeText={setNome} 
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#6B5FA0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" 
            autoCapitalize="none" 
          />
          
          <TextInput
            style={styles.input}
            placeholder="Código genético (senha)"
            placeholderTextColor="#6B5FA0"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true} 
          />
          
          <TextInput
            style={styles.input}
            placeholder="Confirme o código genético"
            placeholderTextColor="#6B5FA0"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={true}
          />
          
          <TouchableOpacity style={styles.buttonGreen} onPress={handleCadastro}>
            <Text style={styles.buttonTitle}>Replicar DNA</Text>
            <Text style={styles.buttonSubtitle}>cadastre-se</Text>
          </TouchableOpacity>
          
          <View style={styles.linkArea}>
            <Text style={styles.linkText}>Já tem um célula? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkHighlight}>Inicie Divisão</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B2A',
  },
  scroll: {
    padding: 24,
    paddingTop: 16,
  },
  backArrow: {
    fontSize: 36,
    color: '#4ECBA0',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1A1650',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2D2870',
  },
  greenLine: {
    width: 40,
    height: 4,
    backgroundColor: '#4ECBA0',
    borderRadius: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#4ECBA0',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#2A2460',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3D3580',
  },
  buttonGreen: {
    backgroundColor: '#4ECBA0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0D0B2A',
  },
  buttonSubtitle: {
    fontSize: 12,
    color: '#0D0B2A',
    marginTop: 2,
  },
  linkArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#8B7EC8',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#4ECBA0',
    fontSize: 14,
    fontWeight: 'bold',
  },
});