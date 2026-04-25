import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// 📚 TÓPICOS
const topics = [
  {
    title: 'O que é',
    content: `A meiose é definida como um processo de divisão celular em que uma célula mãe reduz seu conjunto de cromossomos pela metade. Por exemplo, na especie humana, uma célula com 46 cromossomos (23 pares) gera células com apenas 23 cromossomos. Esse processo ocorre nas gônadas (ovários e testículos) para a formação de gametas (espermatozóides e ovócitos) e, nas plantas, para a formação de esporos.`,
  },
  {
    title: 'Meiose 1 (Etapa Reducional)',
    content: `Nessa fase, a quantidade inicial de cromossomos é reduzida à metade através da separação dos cromossomos homólogos.
            Prófase 1  = fase mais complexa, o evento mais importante aqui é o crossing-over (ou permutação), que é a troca de material genético entre os cromossomos, garantindo a variabilidade genética entre os descendentes. É subdividida em 5 partes. Leptóteno (início da condensação), paquíteno (ocorrência do crossing-over), diplóteno (visualização dos quiasmas, pontos onde os cromossomos estão presos) e diacinese (afastamento final).
            Metáfase 1 = os pares de cromossomos homólogos se posicionam no meio da célula (placa equatorial)
            Anáfase 1 = os cromossomos homólogos se separam e migram para polis opostos.
            Telófase 1 = ocorre a formação de duas novas células haploides (com 23 cromossomos cada, no caso humano) após a citocinese.`,
  },
  {
    title: 'Meiose 2 (Etapa Equacional)',
    content: `Está etapa é muito similar a uma mitose comum, servindo para dividir as células formadas na fase anterior sem reduzir novamente o número de cromossomos. 
              Prófase 2 = os cromossomos se condensam novamente e a carioteca desaparece.
              Metáfase 2 = os cromossomos alinham-se individualmente no centro da célula
              Anáfase 2 = ocorre a separação das cromátides - irmãs
              Telófase 2 = o processo termina com a formação de quatro células-filha haploides, geneticamente diferentes entre si e com cromossomos não duplicados`,
  },
  {
    title: 'Exceções',
    content: `Eventuais falhas nesse processo de divisão celular podem resultar em zigotos com síndromes ou levar ao aborto espontâneo`,
  },
  {
    title: 'Diferenças para Mitose',
    content: `A principal diferença reside na função e no resultado: a mitose ocorre nas células do corpo (somáticas) para gerar células idênticas com o mesmo número de cromossomos. Já a meiose é um evento complexo voltado para a reprodução, que promove a diversidade através do crossing-over e gera células com metade da carga genética.`,
  },
];

// 🔹 CARD
function Card({ item, navigation }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Detail', {
          title: item.title,
          content: item.content,
        })
      }
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
    >
      {({ pressed }) => (
        <>
          <View style={styles.book} />

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.cardTitle,
                pressed && styles.cardTitlePressed
              ]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.cardSubtitle,
                pressed && styles.cardSubtitlePressed
              ]}
            >
              Toque para aprender
            </Text>
          </View>

          {/* 👉 SETINHA VOLTOU AQUI */}
          <Feather
            name="chevron-right"
            size={24}
            color={pressed ? '#064E3B' : '#A78BFA'}
          />
        </>
      )}
    </Pressable>
  );
}

// 🔹 FOOTER
function Footer({ navigation }) {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={24} color="#A78BFA" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Conteudo')}>
        <Feather name="book-open" size={24} color="#6EE7B7" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Game')}>
        <Feather name="star" size={24} color="#A78BFA" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
        <Feather name="user" size={24} color="#A78BFA" />
      </TouchableOpacity>
    </View>
  );
}

// 🔹 TELA PRINCIPAL
export default function ConteudoScreen({ navigation }) {
  return (
    <LinearGradient colors={['#080018', '#12003b', '#080018']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Estude sobre {'\n'}
          <Text style={styles.green}>meiose</Text>
        </Text>

        <Text style={styles.desc}>
          Aprenda os conceitos e como acontece o processo
        </Text>

        <Text style={styles.section}>APRENDA</Text>

        {topics.map((item, index) => (
          <Card key={index} item={item} navigation={navigation} />
        ))}
      </ScrollView>

      <Footer navigation={navigation} />
    </LinearGradient>
  );
}

// 🎨 ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0120',
  },

  scroll: {
    padding: 20,
    paddingBottom: 120, // evita sobrepor com footer
  },

  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  green: {
    color: '#6EE7B7',
  },

  desc: {
    color: '#9CA3AF',
    marginTop: 10,
    marginBottom: 20,
  },

  section: {
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#372857',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#6e6186',
  },

  cardPressed: {
    backgroundColor: '#6EE7B7',
    transform: [{ scale: 0.97 }],
    shadowColor: '#6EE7B7',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#1c604d',
  },

  cardTitlePressed: {
    color: '#1c604d', // mais escuro (combina com fundo claro)
  },

  cardSubtitlePressed: {
    color: '#065F46',
  },

  book: {
    width: 40,
    height: 50,
    backgroundColor: '#A78BFA',
    borderRadius: 6,
    marginRight: 12,
  },

  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  activeText: {
    color: '#064E3B',
  },

  cardSubtitle: {
    color: '#C4B5FD',
    fontSize: 14,
  },

  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#14052E',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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