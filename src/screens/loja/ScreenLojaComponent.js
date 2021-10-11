import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {View, Text, FlatList, StyleSheet} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import LojaDetailComponent from './detail/LojaDetailComponent.js';

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
        options={{
          showHeading: false,
        }}
      />
    </ScreenLojaComponentStack.Navigator>
  );
};

const ScreenLojaComponentMain = ({navigation}) => {
  return (
    <View style={{paddingHorizontal: 5}}>
      <FlatList
        data={data.lojas}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('LojaDetailComponent', {
                  lojaId: item.id,
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
      <Text>
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
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default ScreenLojaComponent;
