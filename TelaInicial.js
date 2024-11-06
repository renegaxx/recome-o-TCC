import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const TelaInicial = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
    loadEvents();
  }, []);

  const loadEvents = () => {
    const dummyEvents = [
      { id: '1', name: 'Concerto de Rock', date: '2024-11-15', image: 'https://via.placeholder.com/150' },
      { id: '2', name: 'Festival de Música', date: '2024-11-20', image: 'https://via.placeholder.com/150' },
      { id: '3', name: 'Teatro ao Ar Livre', date: '2024-11-25', image: 'https://via.placeholder.com/150' },
    ];
    setEvents(dummyEvents);
  };

  const handleQRCodeScan = async () => {
    if (hasPermission) {
      const { type, data } = await BarCodeScanner.scanAsync();
      if (type === 'QR_CODE') {
        Alert.alert('Presença Registrada', `Você escaneou o QR Code: ${data}`);
      } else {
        Alert.alert('Erro', 'QR Code inválido ou não escaneado.');
      }
    } else {
      Alert.alert('Erro', 'Permissão para acessar a câmera não foi concedida.');
    }
  };

  if (hasPermission === null) {
    return <Text style={styles.message}>Solicitando permissão para acessar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.message}>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PutHype</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>{item.name}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.qrButton} onPress={handleQRCodeScan}>
        <Text style={styles.qrButtonText}>Marcar Presença por QR Code</Text>
      </TouchableOpacity>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Eventos')}>
          <Text style={styles.navText}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Videos')}>
          <Text style={styles.navText}>Vídeos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Ingressos')}>
          <Text style={styles.navText}>Ingressos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Raleway-Bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  eventName: {
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
    color: '#000',
  },
  eventDate: {
    color: '#555',
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
  },
  qrButton: {
    backgroundColor: '#9F3EFC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  navText: {
    color: '#9F3EFC',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  message: {
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TelaInicial;
