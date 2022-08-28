import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Dashboard from './src/screens/Dashboard';
import theme from './src/global/styles';
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
