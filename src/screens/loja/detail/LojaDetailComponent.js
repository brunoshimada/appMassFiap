import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      );

      setData(response.length >= 1 ? response[0] : []);
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
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#E63946" />
      ) : (
        <View>
          <LojaHeader
            loja={route.params.nomeDaLoja}
            tempoEntregaMin={route.params.tempoEntregaMin}
            tempoEntregaMax={route.params.tempoEntregaMax}
            frete={route.params.frete}
          />
          <View style={{height: 0.8, backgroundColor: '#A8DADC'}} />
          <View style={{padding: 10}}>
            <Text style={{fontSize: 30, fontWeight: '400', color: '#000000'}}>
              Produtos
            </Text>
            <FlatList
              style={{paddingVertical: 20}}
              data={getData.itens}
              renderItem={({item}) => {
                return (
                  <LojaItem
                    nomeProduto={item.nomeProduto}
                    fabricante={item.fabricante}
                    preco={item.preco}
                    descricao={item.descricao}
                  />
                );
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const LojaHeader = props => {
  return (
    <View
      style={{
        height: 100,
        padding: 10,
        elevation: 0,
      }}>
      <Text style={styles.heading}>{props.loja}</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="clock-time-two-outline"
            color={'#000000'}
            size={25}
          />
          <Text style={{paddingHorizontal: 5, fontSize: 20}}>
            {props.tempoEntregaMin} - {props.tempoEntregaMax} (mins)
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="motorbike"
            color={'#000000'}
            size={25}
          />
          <Text style={{paddingHorizontal: 5, fontSize: 20}}>
            R$ {props.frete}
          </Text>
        </View>
      </View>
    </View>
  );
};

const LojaItem = props => {
  return (
    <View
      style={{borderTopWidth: 1, borderTopColor: 'black', paddingVertical: 5}}>
      <Text style={styles.heading}>{props.nomeProduto}</Text>
      <Text style={{fontSize: 20}}>{props.descricao}</Text>
      <Text style={{fontSize: 20}}>
        Fabricante: {props.fabricante} - R$ {props.preco}
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

export default LojaDetailComponent;
