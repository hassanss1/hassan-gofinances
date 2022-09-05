import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import Dashboard from '../screens/Dashboard';
import RegisterTransaction from '../screens/RegisterTransaction';
import Resume from '../screens/Resume';
import { RFValue } from 'react-native-responsive-fontsize';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontSize: RFValue(14),
          fontFamily: theme.fonts.regular,
        },
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
          paddingHorizontal: 16,
        },
        tabBarIconStyle: {
          marginRight: -2,
        },
      }}
    >
      <Screen
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name='Cadastrar'
        component={RegisterTransaction}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='attach-money' size={size} color={color} />
          ),
        }}
      />
      <Screen
        name='Resumo'
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='pie-chart' size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
