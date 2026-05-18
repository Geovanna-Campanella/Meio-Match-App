import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';

const colors = {
  background: '#0B0220',
  card: '#1A0A3A',
  border: '#3BE8B0',
  title: '#5CF2C2',
  textPrimary: '#CFCBE6',
  textSecondary: '#9A94C8',
};

export default function DevsScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.seta}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Desenvolvedores</Text>

      <View style={styles.card}>
        <Image source={require('../assets/Bia.jpeg')} style={styles.foto} />
        <Text style={styles.nome}>Beatriz Pereira Moreira</Text>
        <Text style={styles.email}>beatrizPereiram2021@email.com</Text>
      </View>

      <View style={styles.card}>
        <Image source={require('../assets/Campanella.jpeg')} style={styles.foto} />
        <Text style={styles.nome}>Geovanna Campanella</Text>
        <Text style={styles.email}>geCampanella@email.com</Text>
      </View>

      <View style={styles.card}>
        <Image source={require('../assets/Geovany.jpeg')} style={styles.foto} />
        <Text style={styles.nome}>Geovany Aldere</Text>
        <Text style={styles.email}>aldere@email.com</Text>
      </View>

      <View style={styles.card}>
        <Image source={require('../assets/Emanuely.jpeg')} style={styles.foto} />
        <Text style={styles.nome}>Giovanna Emanuely</Text>
        <Text style={styles.email}>giEmanuely@email.com</Text>
      </View>

      <View style={styles.card}>
        <Image source={require('../assets/Lucas.jpeg')} style={styles.foto} />
        <Text style={styles.nome}>Lucas Rian Motta Santana</Text>
        <Text style={styles.email}>luRianMotta@email.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  botaoVoltar: {
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: 5,
    marginBottom: 10,
  },
  seta: {
    color: '#41bba0',
    fontSize: 50,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.title,
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});