import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// 🖼️ IMAGENS
const images = {
  'O que é': require('../assets/divisaoCelular.jpeg'),
  'Meiose 1 (Etapa Reducional)': require('../assets/meiose1.jpeg'),
  'Meiose 2 (Etapa Equacional)': require('../assets/meiose2.jpeg'),
  'Exceções': require('../assets/doencasGeneticas.jpeg'),
  'Diferenças para Mitose': require('../assets/diferenca.jpeg'),
};

export default function DetailScreen({ route, navigation }) {
  const { title, content } = route.params || {};

  if (!title || !content) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Erro ao carregar 😢</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#080018', '#12003b', '#080018']} style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* 🔙 VOLTAR */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={28} color="#A78BFA" />
        </TouchableOpacity>

        {/* 🟣 CARD PRINCIPAL */}
        <View style={styles.card}>

          {/* TÍTULO */}
          <Text style={styles.title}>{title}</Text>

          {/* TEXTO */}
          {content.split('\n').map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}

          {/* IMAGEM */}
          {images[title] && (
            <Image source={images[title]} style={styles.image} />
          )}

        </View>
      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080018',
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#1A0333',
    borderRadius: 24,
    padding: 20,

    borderWidth: 2,
    borderColor: '#4ECBA0',
  },

  title: {
    color: '#6EE7B7',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  paragraph: {
    color: '#CFCFEA',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 14,
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },


});