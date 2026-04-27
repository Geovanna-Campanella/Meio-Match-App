import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

export default function ProfileEditScreen({ navigation, setIsLogged }) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const savedName = await AsyncStorage.getItem('userNome');
    if (savedName) setNome(savedName);
  };

  // 💾 salvar nome
  const saveName = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio');
      return;
    }

    await AsyncStorage.setItem('userNome', nome);

    navigation.goBack();
  };

    // 🗑️ excluir conta (única ação agora)
    const deleteAccount = async () => {
        try {
            await AsyncStorage.removeItem('userNome');
            await AsyncStorage.removeItem('userSenha');
            await AsyncStorage.removeItem('userLogado');
            await AsyncStorage.removeItem('totalScore');
            await AsyncStorage.removeItem('lastResult');
            await AsyncStorage.removeItem('userLogado');

            setIsLogged(false);

            navigation.replace('Welcome');

        } catch (error) {
            console.log('Erro ao excluir conta:', error);
        }
    };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#4ECBA0" />
        </TouchableOpacity>

        <Text style={styles.title}>Configurações</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* CARD */}
      <View style={styles.card}>

        <Text style={styles.label}>Nome</Text>

        <TextInput
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#6B5FA0"
        />

        <TouchableOpacity style={styles.buttonSave} onPress={saveName}>
          <Text style={styles.buttonText}>Salvar alterações</Text>
        </TouchableOpacity>

      </View>

      {/* DELETE ONLY */}
      <TouchableOpacity style={styles.deleteBtn} onPress={deleteAccount}>
        <Feather name="trash-2" size={18} color="#fff" />
        <Text style={styles.deleteText}>Excluir conta</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B2A',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#1A1650',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2D2870',
    marginBottom: 20,
  },

  label: {
    color: '#8B7EC8',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#2A2460',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    marginBottom: 16,
  },

  buttonSave: {
    backgroundColor: '#4ECBA0',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#0D0B2A',
    fontWeight: 'bold',
  },

  deleteBtn: {
    flexDirection: 'row',
    backgroundColor: '#E74C3C',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});