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
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }) {

  //BUSCANDO OS PONTOS DE SCORE
  const [totalScore, setTotalScore] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadScore = async () => {
        const stored = await AsyncStorage.getItem('totalScore');
        if (stored !== null) {
          setTotalScore(parseInt(stored));
        }
      };

      loadScore();
    }, [])
  );

  //////////////

  const LEVELS = [
    { name: 'Bronze', min: 0, max: 20 },
    { name: 'Prata', min: 20, max: 40 },
    { name: 'Ouro', min: 40, max: 60 },
    { name: 'Diamante', min: 60, max: Infinity },
  ];

  // nível atual
  const level = LEVELS.find(l => totalScore >= l.min && totalScore < l.max);

  // progresso dentro do nível
  const xpAtual = totalScore - level.min;
  const xpMeta = level.max - level.min;

  // porcentagem da barra
  const porcentagemXP = level.max === Infinity ? 1 : xpAtual / xpMeta;

  /////////////////

  return (
    <LinearGradient
      colors={['#080018', '#12003b', '#080018']}
      style={styles.container}
    >

      <View style={styles.content}>

        {/* HEADER */}
        <View>
          <LinearGradient
            colors={['#0d002b', '#271252']}
            locations={[0, 0.9, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <Text style={styles.headerSub}>Bem vindo ao nucleo</Text>
            <Text style={styles.headerTitle}>
              Pronto para dividir{'\n'}
              <Text style={styles.headerHighlight}>células hoje?</Text>
            </Text>

            <Text style={styles.xpLabel}>
              XP até o {level.name === 'Diamante' ? 'máximo' : LEVELS[LEVELS.indexOf(level) + 1].name} {}
              <Text style={styles.xpNumbers}>
                {totalScore}/{level.max === Infinity ? 'MAX' : level.max}
              </Text>
            </Text>

            {/* BARRA XP (corrigida) */}
            <View style={styles.xpBarBackground}>
              <View
                style={[
                  styles.xpBarFill,
                  { width: `${porcentagemXP * 100}%` }
                ]}
              />
            </View>
          </LinearGradient>
        </View>

        {/* CONTINUAR */}
        <Text style={styles.sectionTitle}>CONTINUAR</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Game')}>
          <LinearGradient
            colors={['#46157b', '#2e0358']}
            locations={[0, 0.6, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardContinuar}
          >
            <Text style={styles.cardIcon}>🃏</Text>
            <View>
              <Text style={styles.cardTitle}>Meiose</Text>
              <Text style={styles.cardSubtitle}>
                Memorize os conceitos e relacione os pares
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* EXPLORE */}
        <Text style={styles.sectionTitle}>EXPLORE</Text>

        <View style={styles.exploreGrid}>
          <TouchableOpacity style={[styles.exploreCard, styles.cardRed]} onPress={() => navigation.navigate('Conteudo')}>
            <Text style={styles.exploreIcon}>📖</Text>
            <Text style={styles.exploreTitle}>Estude</Text>
            <Text style={styles.exploreSubtitle}>
              Aprenda sobre o conteúdo de meiose
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.exploreCard, styles.cardTeal]} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.exploreIcon}>🎯</Text>
            <Text style={styles.exploreTitle}>Progresso</Text>
            <Text style={styles.exploreSubtitle}>
              Veja o seu progresso para melhorar!
            </Text>
          </TouchableOpacity>
        </View>

        {/* ESPAÇO FINAL PRA SCROLL FUNCIONAR */}
        <View style={{ height: 120 }} />

      </View>

      {/* FOOTER */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Feather name="home" size={24} color="#6EE7B7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Conteudo')}>
          <Feather name="book-open" size={24} color="#A78BFA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Game')}>
          <Feather name="star" size={24} color="#A78BFA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={24} color="#A78BFA" />
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B2A',
  },

  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 90,
    justifyContent: 'space-between', // 💥 ESSA LINHA AJUDA MUITO
  },

  // HEADER
  header: {
    backgroundColor: '#1A1650',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  headerSub: {
    color: '#8B7EC8',
    fontSize: 14,
    marginBottom: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerHighlight: {
    color: '#4ECBA0',
  },

  xpLabel: {
    color: '#8B7EC8',
    fontSize: 13,
    marginBottom: 8,
  },
  xpNumbers: {
    color: '#4ECBA0',
    fontWeight: 'bold',
  },

  xpBarBackground: {
    height: 10,
    backgroundColor: '#2A2460',
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#4ECBA0',
  },

  // SEÇÕES
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    letterSpacing: 1,
  },

  // CARD CONTINUAR
  cardContinuar: {
    backgroundColor: '#2A1F6E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#7c32ce',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    marginTop: '-5%',
  },
  cardIcon: {
    fontSize: 40,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#8B7EC8',
    fontSize: 13,
    maxWidth: 200,
  },

  // GRID
  exploreGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: '-5%',
  },
  exploreCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 160,
    justifyContent: 'flex-end',
  },
  cardRed: {
    backgroundColor: '#3c0d42',
    borderWidth: 1,
    borderColor: '#c75088',
  },
  cardTeal: {
    backgroundColor: '#2e4055',
    borderWidth: 1,
    borderColor: '#3d967e',
  },

  exploreIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  exploreTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exploreSubtitle: {
    color: '#A0A0C0',
    fontSize: 12,
  },

  // BOTTOM BAR
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