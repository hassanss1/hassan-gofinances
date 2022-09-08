import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Header = styled.View`
  height: ${RFPercentage((567 / (567 + 245)) * 100)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  /* padding: ${RFPercentage(10)}px ${RFValue(48)}px; */
  /* padding-bottom: ${RFValue(67)}px; */
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 30px;
  margin-top: 40px;
`;
export const Subtitle = styled.Text`
  padding: 0 ${RFValue(93 - 65)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  margin-bottom: 67px;
  margin-top: 80px;
`;
export const FooterWrapper = styled.View`
  width: 100%;
  padding: 0 32px;
  margin-top: ${RFPercentage(-4)}px;
  justify-content: space-between;
`;

export const Footer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: space-between;
`;
