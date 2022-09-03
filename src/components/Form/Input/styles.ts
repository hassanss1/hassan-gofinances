import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  border-radius: 5px;
  margin-top: ${RFValue(8)}px;
`;
