import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';

const Cadastro = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Define shared values for animation
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  const requestNotificationsPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  };

  useEffect(() => {
    requestNotificationsPermission();
  }, []);

  // Usar useFocusEffect para agendar notificação ao sair da tela
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('blur', async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Volte para a PutHype!",
            body: 'Você não terminou seu cadastro. Deseja continuar?',
            data: { screen: 'Cadastro' },
          },
          trigger: null, // Enviar imediatamente
        });
      });

      return unsubscribe;
    }, [navigation])
  );

  const handleNext = () => {
    // Validação dos campos antes de avançar
    if (step === 0 && !name) {
      Alert.alert('Erro', 'Por favor, preencha o nome.');
      return;
    } else if (step === 1 && !phone) {
      Alert.alert('Erro', 'Por favor, preencha o número.');
      return;
    } else if (step === 2 && !username) {
      Alert.alert('Erro', 'Por favor, preencha o usuário.');
      return;
    }

    // Avança para o próximo campo ou registra o usuário
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const email = `${username}@phype.com`;
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a conta.');
    }
  };

  // Animação ao renderizar o input
  const renderCurrentInput = () => {
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }));

    // Inicia a animação ao renderizar o novo input
    useEffect(() => {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    }, [step]);

    // Renderiza o input atual com animação
    return (
      <Animated.View style={[styles.inputContainer, animatedStyle]}>
        {step === 0 && (
          <TextInput
            style={styles.input}
            placeholder="Nome e Sobrenome"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />
        )}
        {step === 1 && (
          <TextInput
            style={styles.input}
            placeholder="Número"
            placeholderTextColor="#ccc"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        )}
        {step === 2 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              placeholderTextColor="#ccc"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>Cadastro</Text>

      {renderCurrentInput()}

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{step < 2 ? 'Avançar' : 'Finalizar Cadastro'}</Text>
      </TouchableOpacity>

      <View style={styles.textAcesso}>
        <Text style={styles.textAcessoText}>Deseja Logar? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textAcessoLink}>Clique Aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Raleway-Bold',
    marginBottom: 40,
    color: 'white',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'white',
    fontFamily: 'Raleway-Regular',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9F3EFC',
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
  },
  textAcesso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  textAcessoText: {
    color: 'white',
    marginRight: 5,
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
  },
  textAcessoLink: {
    color: '#9F3EFC',
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
  },
});

export default Cadastro;
