import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 ADICIONADO

///////////////

const QUESTION_BANK = [
  { id: '1', concept: 'Permutação', description: 'Promove variabilidade genética', topic: 'bio' },
  { id: '2', concept: 'Metáfase', description: 'Cromossomos no meio da célula', topic: 'bio' },
  { id: '3', concept: 'Fase mais complexa', description: 'Prófase 1', topic: 'bio' },
  { id: '4', concept: 'Crossing-over', description: 'Inglês de permutação', topic: 'bio' },
  { id: '5', concept: 'Meiose', description: 'Forma gametas', topic: 'bio' },
  { id: '6', concept: 'Mitose', description: 'Divisão celular simples', topic: 'bio' },
  { id: '7', concept: 'Célula mãe', description: 'Origem de todas as outras células', topic: 'bio' },
  { id: '8', concept: 'Telófase', description: 'Cromossomos separados totalmente', topic: 'bio' },
  { id: '9', concept: 'Anáfase', description: 'Cromossomos separados parcialmente', topic: 'bio' },
  { id: '10', concept: 'Meiose 2', description: 'Etapa Equacional', topic: 'bio' },
  { id: '11', concept: 'Meiose 1', description: 'Etapa Reducional', topic: 'bio' },
  { id: '12', concept: 'Leptóteno', description: 'Início da condensação', topic: 'bio' },
  { id: '13', concept: 'Zigóteno', description: 'Pareamento dos homólogos', topic: 'bio' },
  { id: '14', concept: 'Paquíteno', description: 'Ocorrência do crossing-over', topic: 'bio' },
  { id: '15', concept: 'Diplóteno', description: 'Visualização dos quiasmas', topic: 'bio' },
  { id: '16', concept: 'Quiasmas', description: 'Cruzamento de dois cromossomos em forma de X', topic: 'bio' },
  { id: '17', concept: 'Diacinese', description: 'Afastamento final', topic: 'bio' },
  { id: '18', concept: 'Placa equatorial', description: 'Meio da célula', topic: 'bio' },
  { id: '19', concept: 'Falhas geram:', description: 'Zigotos com síndrome/aborto', topic: 'bio' },
  { id: '20', concept: 'Esporos', description: 'Reprodução nas plantas', topic: 'bio' },
  { id: '21', concept: 'Cromátides irmãs', description: 'Cópias idênticas de um cromossomo', topic: 'bio' },
  { id: '22', concept: 'Carioteca', description: 'Membrana do núcleo celular', topic: 'bio' },
  { id: '23', concept: 'Células-filhas', description: 'Resultado da divisão celular', topic: 'bio' },
  { id: '24', concept: 'Variabilidade genética', description: 'Diferenças entre indivíduos', topic: 'bio' },
  { id: '25', concept: 'Fecundação', description: 'União de dois gametas', topic: 'bio' },
  { id: '26', concept: 'Zigoto', description: 'Célula diploide formada pela fecundação', topic: 'bio' },
  { id: '27', concept: 'Gametas', description: 'Células sexuais haploides', topic: 'bio' },
];

///////////////

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/////////////

const generatePhases = (topic) => {
  const filtered = QUESTION_BANK.filter(q => q.topic === topic);
  const selected = shuffle(filtered).slice(0, 16);

  return [
    selected.slice(0, 4),
    selected.slice(4, 8),
    selected.slice(8, 12),
    selected.slice(12, 16),
  ];
};

export default function GameScreen({navigation}) {
  const [screen, setScreen] = useState('intro');
  const [phases, setPhases] = useState(generatePhases('bio'));
  const [phaseIndex, setPhaseIndex] = useState(0);

  const [selectedConcept, setSelectedConcept] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [matches, setMatches] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [score, setScore] = useState(0);
  const [wrongPair, setWrongPair] = useState(null);

  const currentPhase = phases[phaseIndex];

  const shuffledDescriptions = useMemo(() => {
    return shuffle(currentPhase);
  }, [currentPhase]);

  // SALVA O SCORE TOTALL
  const saveScore = async (newScore) => {
    try {
      const stored = await AsyncStorage.getItem('totalScore');
      const previous = stored ? parseInt(stored) : 0;
      const updated = previous + newScore;
      await AsyncStorage.setItem('totalScore', updated.toString());
    } catch (e) {
      console.log('Erro ao salvar score', e);
    }
  };

  // SALVA A ULTIMA SEQUENCIA
  const saveLastResult = async (score, total) => {
    try {
      const result = `${score}/${total}`;
      await AsyncStorage.setItem('lastResult', result);
    } catch (e) {
      console.log('Erro ao salvar último resultado', e);
    }
  };

  const check = (c, d) => {
    if (c.id === d.id) {
      if (!mistakes.includes(c.id)) {
        setScore(prev => prev + 1);
      }
      setMatches(prev => [...prev, c.id]);
    } else {
      if (!mistakes.includes(c.id)) {
        setMistakes(prev => [...prev, c.id]);
      }
      setWrongPair({ c: c.id, d: d.id });
      setTimeout(() => setWrongPair(null), 600);
    }

    setSelectedConcept(null);
    setSelectedDescription(null);
  };

  useEffect(() => {
    if (selectedConcept && selectedDescription) {
      check(selectedConcept, selectedDescription);
    }
  }, [selectedConcept, selectedDescription]);

  useEffect(() => {
    if (matches.length === 4) {
      setTimeout(() => nextPhase(), 700);
    }
  }, [matches]);

  const nextPhase = () => {
    if (phaseIndex < 3) {
      setPhaseIndex(prev => prev + 1);
      setMatches([]);
    } else {
      saveScore(score); // 👈 SALVA O ULTIMO SCORE
      saveLastResult(score, total); // 👈 SALVA A ULTIMA SEQUENCIA
      setScreen('result');
    }
  };

  const handleSkip = () => {
    setMatches([]);
    nextPhase();
  };

  const reset = () => {
    setPhases(generatePhases('bio'));
    setPhaseIndex(0);
    setScore(0);
    setMatches([]);
    setMistakes([]);
    setScreen('quiz');
  };

  const goToIntro = () => {
    setPhases(generatePhases('bio'));
    setPhaseIndex(0);
    setScore(0);
    setMatches([]);
    setMistakes([]);
    setScreen('intro');
  };

  const total = 16;
  const progress =
    ((phaseIndex * 4 + matches.length) / total) * 100;

  if (screen === 'intro') {
    return (
      <LinearGradient colors={['#080018', '#12003b', '#080018']} style={styles.container}>
        <Image
          source={require('../assets/background-dna2.png')} // usa essa imagem que você mandou
          style={styles.backgroundImage}
        />
        <View style={[styles.content, { justifyContent: 'center' }]}>
          <View>
            <View style={styles.logoArea}>
              <Image
                source={require('../assets/logo-meio-match.png')}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>
              Interligue os conceitos{"\n"}
              <Text style={{ color: '#7ef9c6' }}>sobre meiose</Text>
            </Text>

            <TouchableOpacity
              style={styles.glowButton}
              onPress={() => setScreen('quiz')}
            >
              <Text style={styles.glowText}>Começar Divisão</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>como funciona?</Text>
              <Text style={styles.infoText}>
                Leia as colunas e interligue corretamente.
                Cada acerto gera pontos.
              </Text>
            </View>
          </View>

          <Footer navigation={navigation} active="star" />
        </View>
      </LinearGradient>
    );
  }

  if (screen === 'result') {
    return (
      <LinearGradient colors={['#080018', '#12003b', '#080018']} style={styles.container}>
        <Image
          source={require('../assets/background-dna2.png')} // usa essa imagem que você mandou
          style={styles.backgroundImage}
        />
        <View style={[styles.content, { justifyContent: 'center' }]}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Parabéns!</Text>
            <Text style={styles.resultScore}>
              Você acertou {score}/16
            </Text>
          </View>

          <TouchableOpacity style={styles.glowButton} onPress={reset}>
            <Text style={styles.glowText}>Continue Dividindo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToIntro}>
            <Text style={styles.backText}>Voltar ao início</Text>
          </TouchableOpacity>

          <Footer navigation={navigation} active="star" />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#080018', '#12003b', '#080018']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.phaseText}>{phaseIndex + 1}/4</Text>

          <Text style={styles.subtitle}>Relacione os conceitos</Text>
        </View>
        <View style={styles.gameArea}>
          <View style={styles.row}>
            <View style={styles.column}>
              {currentPhase.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.card,
                    matches.includes(item.id) && styles.correct,
                    wrongPair?.c === item.id && styles.wrong,
                  ]}
                  onPress={() => setSelectedConcept(item)}
                >
                  <Text style={styles.text}>{item.concept}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.column}>
              {shuffledDescriptions.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.card,
                    matches.includes(item.id) && styles.correct,
                    wrongPair?.d === item.id && styles.wrong,
                  ]}
                  onPress={() => setSelectedDescription(item)}
                >
                  <Text style={styles.text}>{item.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.skip} onPress={handleSkip}>
          <Text style={{ color: '#000', fontWeight: "bolder" }}>Pular</Text>
        </TouchableOpacity>

        <Footer navigation={navigation} active="star" />
      </View>
    </LinearGradient>
  );
}

function Footer({ navigation }) {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={24} color="#A78BFA" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Conteudo')}>
        <Feather name="book-open" size={24} color="#A78BFA" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Game')}>
        <Feather name="star" size={24} color="#6EE7B7" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
        <Feather name="user" size={24} color="#A78BFA" />
      </TouchableOpacity>
    </View>
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
    gap: 15
  },

  backgroundImage: {
    position: 'absolute',
    left: "-20%",
    top: "-28%",
    width: "100%",
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.3, // deixa suave no fundo

    transform: [{ rotate: '55deg' }]
  },

  header: {
    marginTop: 40,
    gap: 8,
  },

  title: { color: '#fff', fontSize: 24, textAlign: 'center' },

  glowButton: {
    backgroundColor: '#7ef9c6',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#7ef9c6',
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 12,
    marginTop: 20,
  },

  glowText: { fontWeight: 'bold', fontSize: 16 },

  infoBox: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#7b1fa2',
    padding: 16,
    borderRadius: 16,
  },

  infoTitle: { color: '#b388ff', fontWeight: 'bold' },
  infoText: { color: '#ccc', marginTop: 8 },

  progressBg: { 
    height: 8, 
    backgroundColor: '#333', 
    borderRadius: 10, 
    
  },

  progressFill: { height: '100%', backgroundColor: '#7ef9c6' },

  phaseText: { color: '#7ef9c6', textAlign: 'right', marginTop: 5 },

  subtitle: { color: '#fff', fontSize: 20, marginVertical: 20 },

  gameArea: {
    maxHeight: '65%', // controla o espaço do jogo
  },

  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    flex: 1,
  },

  column: { 
    width: '48%',
    justifyContent: 'space-between',
  },

  card: { 
    backgroundColor: '#2a0a4a',
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
  },
  text: { 
    color: '#fff', 
    textAlign: 'center',
    fontSize: 12,
  },

  correct: { backgroundColor: '#7ef9c6' },
  wrong: { backgroundColor: '#ff4d6d' },

  skip: { alignSelf: 'flex-end', backgroundColor: '#7ef9c6', padding: 15, paddingHorizontal: 30, borderRadius: 20, marginTop: 30,},

  resultCard: { backgroundColor: '#1f8f7a', padding: 30, borderRadius: 20, alignItems: 'center' },
  resultTitle: { color: '#7ef9c6', fontSize: 22 },
  resultScore: { color: '#fff', fontSize: 20, marginTop: 10 },

  backText: { color: '#aaa', textAlign: 'center', marginTop: 15, textDecorationLine: 'underline' },

  footer: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, borderTopWidth: 1, borderColor: '#333' },
  icon: { fontSize: 22, color: '#777' },
  active: { color: '#7ef9c6' },

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

  logoArea: {
    alignItems: 'center',
    marginBottom: 0,
    zIndex: 1,
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 0,
    resizeMode: 'contain',
  },
});