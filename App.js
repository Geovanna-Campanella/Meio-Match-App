import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

// telas
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import GameScreen from './screens/GameScreen';
import ConteudoScreen from './screens/ConteudoScreen';
import DetailScreen from './screens/DetailScreen';
import ProfileEditScreen from './screens/ProfileEditScreen'

const Stack = createStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(null); // 👈 null = carregando

  useEffect(() => {
    const checkLogin = async () => {
      const logged = await AsyncStorage.getItem('userLogado');
      setIsLogged(logged === 'true');
    };

    checkLogin();
  }, []);

  // ⏳ enquanto carrega
  if (isLogged === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#4ECBA0" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {isLogged ? (
          // 🔥 USUÁRIO LOGADO
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Conteudo" component={ConteudoScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
          </>
        ) : (
          // 🧬 USUÁRIO NÃO LOGADO
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}