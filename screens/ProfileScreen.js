import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

export default function ProfileScreen({ navigation }) {

  const [totalScore, setTotalScore] = useState(0);
  const [lastResult, setLastResult] = useState('0/0');
  const [nome, setNome] = useState('');

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const storedNome = await AsyncStorage.getItem('userNome');
          const storedScore = await AsyncStorage.getItem('totalScore');
          const storedLast = await AsyncStorage.getItem('lastResult');

          if (storedNome) setNome(storedNome);
          if (storedScore) setTotalScore(parseInt(storedScore));
          if (storedLast) setLastResult(storedLast);

        } catch (e) {
          console.log('Erro ao carregar dados', e);
        }
      };

      loadData();
    }, [])
  );

  // 🏆 SISTEMA DE NÍVEIS
  const LEVELS = [
    { name: 'Bronze', min: 0, max: 20, emoji: '🥉', message: 'Bom começo! Continue jogando 🌱' },
    { name: 'Prata', min: 20, max: 40, emoji: '🥈', message: 'Você está evoluindo! 👀' },
    { name: 'Ouro', min: 40, max: 60, emoji: '⭐', message: 'Você está indo muito bem! 🔥' },
    { name: 'Diamante', min: 60, max: Infinity, emoji: '💎', message: 'Nível máximo! 😳' },
  ];

  // 🔍 Descobre o nível atual
  const level = LEVELS.find(l => totalScore >= l.min && totalScore < l.max);

  // 📊 Progresso da barra
  const xpAtual = totalScore - level.min;
  const xpMeta = level.max - level.min;
  const progress = level.max === Infinity ? 1 : xpAtual / xpMeta;

  return (
    <LinearGradient
      colors={['#080018', '#12003b', '#080018']}
      style={styles.container}
    >
      <View style={styles.content}>

        {/* 👤 USER */}
        <View style={styles.cardUsuario}>
          <TouchableOpacity
            style={styles.iconeConfig}
            onPress={() => navigation.navigate('ProfileEdit')}
          >
            <Feather name="settings" size={22} color="#A78BFA" />
          </TouchableOpacity>

          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>
              {nome ? nome[0].toUpperCase() : 'U'}
            </Text>
          </View>

          <View>
            <Text style={styles.nomeUsuario}>
              {nome || 'Usuário'}
            </Text>
          </View>
        </View>

        {/* 🏆 NÍVEL */}
        <Text style={styles.tituloSecao}>SEU NÍVEL</Text>

        <View>
          <LinearGradient
            colors={['#46157b', '#27014d']}
            locations={[0, 0.9, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardNivel}
          >
            <Text style={styles.emojiNivel}>{level.emoji}</Text>
            <View>
              <Text style={styles.nomeNivel}>{level.name}</Text>
              <Text style={styles.msgNivel}>{level.message}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* 📊 XP */}
        <View style={styles.xpArea}>
          <Text style={styles.xpLabel}>XP</Text>
          <Text style={styles.xpNumeros}>
            {totalScore}/{level.max === Infinity ? 'MAX' : level.max}
          </Text>
        </View>

        <View style={styles.barraFundo}>
          <View style={[styles.barraPreenchida, { width: `${progress * 100}%` }]} />
        </View>

        <View style={styles.grid}>
          <TouchableOpacity style={[styles.cardAtalho, styles.cardVerde]}>
            <Image
              source={require('../assets/icon-progress.png')}
              style={styles.exploreIconImage}
            />
            <Text style={styles.tituloAtalho}>Última Meiose</Text>
            <Text style={styles.resultadoMeiose}>{lastResult}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cardAtalho, styles.cardRosa]} onPress={() => navigation.navigate('Conteudo')}>
            <Image
              source={require('../assets/icon-estudo.png')}
              style={styles.exploreIconImage}
            />
            <Text style={styles.tituloAtalho}>Estude</Text>
            <Text style={styles.subAtalho}>
              Aprenda sobre meiose
            </Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* NAV */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Feather name="home" size={24} color="#A78BFA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Conteudo')}>
          <Feather name="book-open" size={24} color="#A78BFA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Game')}>
          <Feather name="star" size={24} color="#A78BFA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={24} color="#6EE7B7" />
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

// -----------------------------------------------------------
// Estilos
// -----------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B2A',
  },

  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 90,
    justifyContent: 'flex-start',
    marginTop: 20, 
  },

  // ---- Card do usuário ----
  cardUsuario: {
    backgroundColor: '#1A1650',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',  // avatar e texto lado a lado
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2D2870',
  },
  iconeConfig: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    borderRadius: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,        // círculo
    backgroundColor: '#4ECBA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D0B2A',
  },
  nomeUsuario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emailUsuario: {
    fontSize: 14,
    color: '#8B7EC8',
    marginTop: 2,
  },

  // ---- Seção nível ----
  tituloSecao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  cardNivel: {
    backgroundColor: '#2A1F6E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#7c32ce',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  emojiNivel: {
    fontSize: 48,
  },
  nomeNivel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff'
  },
  msgNivel: {
    color: '#8B7EC8',
    fontSize: 13,
    maxWidth: 220,
  },

  // ---- Barra de XP ----
  xpArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpLabel: {
    color: '#8B7EC8',
    fontSize: 13,
  },
  xpNumeros: {
    color: '#4ECBA0',
    fontSize: 13,
    fontWeight: 'bold',
  },
  barraFundo: {
    height: 10,
    backgroundColor: '#2A2460',
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 28,
  },
  barraPreenchida: {
    backgroundColor: '#4ECBA0',
    borderRadius: 5,
  },

  // ---- Grid de atalhos ----
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  cardAtalho: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  cardVerde: {
    backgroundColor: '#2e4055',
    borderWidth: 1,
    borderColor: '#3d967e',
  },
  cardRosa: {
    backgroundColor: '#3c0d42',
    borderWidth: 1,
    borderColor: '#c75088',
  },
  exploreIconImage: {
    width: 70,
    height: 70,
    marginBottom: 0,
    resizeMode: 'contain',
  },
  tituloAtalho: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subAtalho: {
    color: '#A0A0C0',
    fontSize: 12,
    marginTop: 4,
  },
  resultadoMeiose: {
    color: '#4ECBA0',  // verde em destaque
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },

  //BOTTOM BAR
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#12103A',
    borderTopWidth: 1,
    borderTopColor: '#2D2870',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  navItem: {
    padding: 8,
  },
  navIconActive: {
    fontSize: 26,
    color: '#4ECBA0',
  },
  navIcon: {
    fontSize: 22,
    color: '#6B5FA0',
  },
});
