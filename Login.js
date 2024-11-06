// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert, Image } from 'react-native';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        Alert.alert('Login realizado com sucesso!');
        
        // Navegar para Tela Inicial passando os dados do usuário
        navigation.navigate('TelaInicial', {
          user: {
            uid: user.uid,
            email: user.email,
          },
        });
      } catch (error) {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  const handleResetPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert('E-mail de redefinição enviado! Verifique sua caixa de entrada.');
      } catch (error) {
        Alert.alert('Erro', 'E-mail não encontrado ou inválido.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Image 
        source={require('./assets/black_4 2.png')}
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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

      <TouchableOpacity onPress={handleResetPassword}>
        <Text style={styles.link}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.textAcesso}>
        <Text style={styles.textAcessoText}>Primeiro Acesso? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.textAcessoLink}>Clique Aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos mantidos como estavam
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute', 
    bottom: 0,
    top: 390,
    width: '400%',
    resizeMode: 'contain',
    zIndex: -1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Raleway-Bold',
    marginBottom: 40,
    color: 'white',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Raleway-Regular'
  },
  button: {
    backgroundColor: '#9F3EFC',
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
  },
  link: {
    marginTop: 10,
    color: '#9F3EFC',
    fontSize: 14,
    alignSelf: 'flex-end',
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
    fontSize: 15
  },
  textAcessoLink: {
    color: '#9F3EFC',
    fontFamily: 'Raleway-Regular',
    fontSize: 15
  },
});

export default Login;
