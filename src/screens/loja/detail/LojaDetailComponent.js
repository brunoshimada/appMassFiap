import {SCOPABLE_TYPES} from '@babel/types';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

const itensByLojaData = require('appmassfiap/assets/itensByLoja.json');

const LojaDetailComponent = ({navigation, route}) => {
  const [isLoading, setLoading] = useState(true);
  const [getData, setData] = useState({});
  const lojaId = route.params.lojaId;

  const buildLojaDetail = lojaId => {
    try {
      const response = Array.from(itensByLojaData.itensByLoja).filter(
        itensLoja => {
          return itensLoja.idLoja === lojaId;
        },
      )[0];
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buildLojaDetail(lojaId);
  }, [lojaId]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#E63946" />
      ) : (
        <FlatList
          data={getData.itens}
          renderItem={({item}) => {
            return <Text>{item.preco}</Text>;
          }}
        />
      )}
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

export default LojaDetailComponent;
