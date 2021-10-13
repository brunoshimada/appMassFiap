import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';

import {useState} from 'react/cjs/react.development';

const data = require('appmassfiap/assets/itensByLoja.json');
const lojas = require('appmassfiap/assets/mockData.json');

const ScreenRemediosComponentStack = createNativeStackNavigator();

const ScreenRemediosComponent = () => {
  return (
    <ScreenRemediosComponentStack.Navigator>
      <ScreenRemediosComponentStack.Screen
        name="ScreenRemediosComponentMain"
        component={ScreenRemediosComponentMain}
        options={{
          title: 'Comparador de Preços',
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
    </ScreenRemediosComponentStack.Navigator>
  );
};

const ScreenRemediosComponentMain = ({navigator}) => {
  const allItensByLoja = data.itensByLoja;
  const [resultadoBusca, setResultadoBusca] = useState([]);

  const buscaMelhorPrecoPorProduto = input => {
    if (input === '') {
      setResultadoBusca([]);
      return;
    }

    const findNomeLoja = idLoja => {
      const nomeLojaOptional = Array.from(lojas.lojas)
        .filter(loja => {
          return loja.id === idLoja;
        })
        .map(loja => loja.nomeLoja);

      return nomeLojaOptional.length === 1
        ? nomeLojaOptional[0]
        : 'Erro ao identificar loja';
    };

    setResultadoBusca(
      Array.from(allItensByLoja)
        .filter(itemByLoja => {
          const itemSearchedPosition = Array.from(itemByLoja.itens).findIndex(
            item => {
              return String(item.nomeProduto)
                .toLowerCase()
                .includes(input.toLowerCase());
            },
          );

          return itemSearchedPosition >= 0;
        })
        .map(itensByLojaComProduto => {
          const itemSearchedPosition = Array.from(
            itensByLojaComProduto.itens,
          ).findIndex(item => {
            return String(item.nomeProduto)
              .toLowerCase()
              .includes(input.toLowerCase());
          });

          return {
            idLoja: itensByLojaComProduto.idLoja,
            nomeLoja: findNomeLoja(itensByLojaComProduto.idLoja),
            ...itensByLojaComProduto.itens[itemSearchedPosition],
          };
        })
        .sort((a, b) => {
          return a.preco - b.preco;
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
        placeholder="Nome do medicamento"
        onChangeText={textEntered => buscaMelhorPrecoPorProduto(textEntered)}
      />
      <FlatList
        data={resultadoBusca}
        renderItem={({item}) => {
          return (
            <ScreenRemediosComponentItem
              nomeLoja={item.nomeLoja}
              nomeProduto={item.nomeProduto}
              fabricante={item.fabricante}
              preco={item.preco}
              descricao={item.descricao}
            />
          );
        }}
      />
    </View>
  );
};

const ScreenRemediosComponentItem = props => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Text style={styles.heading}>{props.nomeLoja}</Text>
      <Text>
        <Text style={{fontSize: 25, fontWeight: '500', color: '#000000'}}>
          {props.nomeProduto}
        </Text>
        <Text style={{fontSize: 25, fontWeight: '500', color: '#457b9d'}}>
          {' '}
          R$ {props.preco}
        </Text>
      </Text>

      <Text>{props.descricao}</Text>
      <Text>Fabricante: {props.fabricante}</Text>
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

export default ScreenRemediosComponent;
