import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {View, ImageBackground, Text, FlatList, StyleSheet} from 'react-native';
import {useState} from 'react/cjs/react.development';

import medicos from 'appmassfiap/assets/medicos.js';

const ScreenMedicoComponentStack = createNativeStackNavigator();

const ScreenMedicoComponent = () => {
  return (
    <ScreenMedicoComponentStack.Navigator>
      <ScreenMedicoComponentStack.Screen
        name="ScreenMedicoComponentMain"
        component={ScreenMedicoComponentMain}
        options={{
          title: 'Especialidades',
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
    </ScreenMedicoComponentStack.Navigator>
  );
};

const ScreenMedicoComponentMain = ({navigation}) => {
  return (
    <View>
      <FlatList
        data={medicos}
        numColumns={2}
        keyExtractor={item => item.especialidade}
        renderItem={({item}) => {
          return (
            <ScreeMedicoCategoriaComponent
              especialidade={item.especialidade}
              srcImage={item.src}
            />
          );
        }}
      />
    </View>
  );
};

const ScreeMedicoCategoriaComponent = props => {
  const [getPath, setPath] = useState(props.srcImage);

  const imagePath = props.srcImage;

  return (
    <View style={styles.item}>
      <ImageBackground
        source={props.srcImage}
        style={{
          width: 150,
          height: 100,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            textAlign: 'center',
            fontSize: 15,
          }}>
          {props.especialidade}
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexGrow: 1,
    margin: 4,
    padding: 20,
    flexBasis: 0,
  },
});

export default ScreenMedicoComponent;
