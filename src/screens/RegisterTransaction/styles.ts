import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(16)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  flex-direction: row;
  align-items: flex-end;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-bottom: ${RFValue(18)}px;
`;

export const Form = styled.View`
  padding: 24px;
  width: 100%;
  flex: 1;
  justify-content: space-between;
`;

export const Fields = styled.View`
  justify-content: space-between;
`;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
