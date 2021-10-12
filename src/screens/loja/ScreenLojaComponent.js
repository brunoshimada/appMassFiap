import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import LojaDetailComponent from './detail/LojaDetailComponent.js';
import {useState} from 'react/cjs/react.development';

const data = require('appmassfiap/assets/mockData.json');

const ScreenLojaComponentStack = createNativeStackNavigator();

const ScreenLojaComponent = () => {
  return (
    <ScreenLojaComponentStack.Navigator>
      <ScreenLojaComponentStack.Screen
        name="ScreenLojaComponentMain"
        component={ScreenLojaComponentMain}
        options={{
          title: 'Lojas',
          headerStyle: {
            backgroundColor: '#A8DADC',
          },
          headerTintColor: '#1D3557',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeigth: 'bold',
          },
        }}
      />
      <ScreenLojaComponentStack.Screen
        name="LojaDetailComponent"
        component={LojaDetailComponent}
        options={({route}) => ({
          title: '',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeigth: 'bold',
          },
          headerStyle: {
            backgroundColor: '#A8DADC',
            elevation: 0,
          },
          headerTintColor: '#1D3557',
        })}
      />
    </ScreenLojaComponentStack.Navigator>
  );
};

const ScreenLojaComponentMain = ({navigation}) => {
  const [getLojasFiltradas, setLojasFiltradas] = useState([]);
  const lojasToFilter = data.lojas;

  const filtrarLojasComInput = input => {
    if (input === '') {
      setLojasFiltradas([]);
      return;
    }

    setLojasFiltradas(
      Array.from(lojasToFilter).filter(loja => {
        return String(loja.nomeLoja)
          .toLowerCase()
          .includes(input.toLowerCase());
      }),
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#FFFFFF',
      }}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Nome da loja"
        onChangeText={textEntered => filtrarLojasComInput(textEntered)}
      />
      <FlatList
        data={getLojasFiltradas}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('LojaDetailComponent', {
                  lojaId: item.id,
                  nomeDaLoja: item.nomeLoja,
                  tempoEntregaMin: item.tempoEntregaMin,
                  tempoEntregaMax: item.tempoEntregaMax,
                  frete: item.frete,
                });
              }}>
              <ScreenLojaComponentListItem
                nomeLoja={item.nomeLoja}
                tempoEntregaMin={item.tempoEntregaMin}
                tempoEntregaMax={item.tempoEntregaMax}
                frete={item.frete}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const ScreenLojaComponentListItem = props => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Text style={styles.heading}>{props.nomeLoja}</Text>
      <Text style={{fontSize: 16}}>
        Tempo de Entrega: {props.tempoEntregaMin} - {props.tempoEntregaMax}{' '}
        (min) | Frete: {props.frete > 0 ? `R$ ${props.frete}` : 'Grátis'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 13,
    color: '#1D3557',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textInputStyle: {
    height: 50,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: '#ededed',
  },
});

export default ScreenLojaComponent;
