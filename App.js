import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'; // Importando componentes para uma tela de carregamento
import { useFonts } from 'expo-font';
import Routes from './Routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    // Tela de carregamento personalizada
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return <Routes />;
}
