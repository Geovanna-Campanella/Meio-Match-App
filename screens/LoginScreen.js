import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {

    // Validação: campos vazios
    if (!email || !senha) {
      Alert.alert('Ops!', 'Preencha o e-mail e a senha.');
      return;
    }

    // Validação: e-mail simples
    if (!email.includes('@')) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
      return;
    }

    // Aqui você conectaria com um backend real.
    // Por enquanto, apenas navegamos para a Home.
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Botão voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        {/* Card do formulário */}
        <View style={styles.card}>

          {/* Linha decorativa roxa */}
          <View style={styles.purpleLine} />

          <Text style={styles.title}>Iniciar Divisão</Text>
          <Text style={styles.subtitle}>Bem vindo de volta ao laboratório</Text>

          {/* Campo Email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#6B5FA0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campo Senha */}
          <TextInput
            style={styles.input}
            placeholder="Código genético (senha)"
            placeholderTextColor="#6B5FA0"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />

          {/* Botão de login */}
          <TouchableOpacity style={styles.buttonPurple} onPress={handleLogin}>
            <Text style={styles.buttonTitle}>Entrar no núcleo</Text>
          </TouchableOpacity>

          {/* Separador */}
          <View style={styles.separatorArea}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>ou</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Botão para ir ao cadastro */}
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonOutlineText}>Criar nova célula</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B2A',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 16,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 36,
    color: '#A78BFA', // roxo claro
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1A1650',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2D2870',
  },
  purpleLine: {
    width: 40,
    height: 4,
    backgroundColor: '#7B5FC4',
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
    color: '#8B7EC8',
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
  buttonPurple: {
    backgroundColor: '#A78BFA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A0A40',
  },
  separatorArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2D2870',
  },
  separatorText: {
    color: '#6B5FA0',
    marginHorizontal: 12,
    fontSize: 13,
  },
  buttonOutline: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4ECBA0',
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#4ECBA0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
