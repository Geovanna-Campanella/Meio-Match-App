import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#080018', '#12003b', '#080018']}
        style={styles.container}
      >
        <Image
          source={require('../assets/background-dna.png')} // usa essa imagem que você mandou
          style={styles.backgroundImage}
        />

        {/* Ícone / logo area */}
        <View style={styles.logoArea}>
          <Image
            source={require('../assets/logo-meio-match.png')}
            style={styles.logo}
          />
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
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B2A',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backgroundImage: {
    position: 'absolute',
    left: "-50%",
    top: "-28%",
    width: "100%",
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.3, // deixa suave no fundo

    transform: [{ rotate: '25deg' }]
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 80,
    zIndex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
    resizeMode: 'contain',
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
    gap: 16,
    zIndex: 1,
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
