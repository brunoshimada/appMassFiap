import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ScreenLojaComponent from 'srcComponent/screens/loja/ScreenLojaComponent.js';
import ScreenMedicoComponent from 'srcComponent/screens/medico/ScreenMedicoComponent.js';
import ScreenRemediosComponent from 'srcComponent/screens/remedios/ScreenRemediosComponent.js';

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
        name="ScreenRemediosComponent"
        component={ScreenRemediosComponent}
        options={{
          tabBarLabel: 'Medicamentos',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="pill" color={color} size={26} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="ScreenMedicoComponent"
        component={ScreenMedicoComponent}
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

export default TabNavigatorComponent;
