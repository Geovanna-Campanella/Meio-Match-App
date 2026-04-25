import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* Ícone / logo area */}
      <View style={styles.logoArea}>
        <Text style={styles.logoEmoji}>🧬</Text>
        <Text style={styles.title}>Meio Match</Text>
        <Text style={styles.subtitle}>Descobrindo a divisão celular</Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonArea}>

        <TouchableOpacity
          style={styles.buttonGreen}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonTitleDark}>Criar Célula</Text>
          <Text style={styles.buttonSubtitleDark}>cadastre-se</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B2A',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logoArea: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4ECBA0', // verde-teal
  },
  buttonArea: {
    gap: 16, // espaço entre os botões
  },
  buttonGreen: {
    backgroundColor: '#4ECBA0', // verde
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonPurple: {
    backgroundColor: '#3D2F6E', // roxo escuro
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#7B5FC4',
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonTitleDark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1040', // texto escuro no botão verde
  },
  buttonSubtitleDark: {
    fontSize: 13,
    color: '#1A1040',
    marginTop: 2,
  },
  buttonTitleLight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A78BFA', // roxo claro
  },
  buttonSubtitleLight: {
    fontSize: 13,
    color: '#8B7EC8',
    marginTop: 2,
  },
});
