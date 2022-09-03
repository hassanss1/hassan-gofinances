import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface CategoryProps {
  isActive: boolean;
}
export const Category = styled.TouchableOpacity<CategoryProps>`
  flex-direction: row;
  padding: ${RFValue(15)}px;
  width: 100%;
  align-items: center;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.light_success : theme.colors.shape};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`;
