import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ScreenLojaComponent from 'srcComponent/screens/loja/ScreenLojaComponent.js';

const TabNavigator = createMaterialBottomTabNavigator();

const TabNavigatorComponent = () => {
  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      activeColor="#E63946"
      barStyle={{backgroundColor: '#ededed'}}>
      <TabNavigator.Screen
        name="ScreenLojaComponent"
        component={ScreenLojaComponent}
        options={{
          tabBarLabel: 'Lojas',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="store" color={color} size={26} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Lojas2Component"
        component={Lojas2Component}
        options={{
          tabBarLabel: 'Médicos',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="mother-heart"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
};

const Lojas2Component = () => {
  return <Text>BBB</Text>;
};

export default TabNavigatorComponent;
