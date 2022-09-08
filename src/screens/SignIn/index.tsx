import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  Subtitle,
  Footer,
  FooterWrapper,
} from './styles';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta google');
      setIsLoading(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta google');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)}></LogoSvg>
          <Title>
            Controle suas {'\n'} finanças de forma{'\n'} muito simples
          </Title>
        </TitleWrapper>
        <Subtitle>Faça seu login com {'\n'}uma das contas abaixo</Subtitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title='Entrar com Apple'
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}

          {isLoading && (
            <ActivityIndicator
              style={{ marginTop: 25 }}
              color={theme.colors.shape}
            />
          )}
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
