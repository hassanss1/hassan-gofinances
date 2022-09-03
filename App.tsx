import React from 'react';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { ThemeProvider } from 'styled-components';
import RegisterTransaction from './src/screens/RegisterTransaction';
import theme from './src/global/styles';
export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  if (!fontsLoaded) return null;
  return (
    <ThemeProvider theme={theme}>
      <RegisterTransaction />
    </ThemeProvider>
  );
}
