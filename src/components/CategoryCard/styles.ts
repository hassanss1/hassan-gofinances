import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface CategoryProps {
  color: string;
}
export const Container = styled.View<CategoryProps>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(13)}px ${RFValue(24)}px;
  margin-bottom: 8px;
  border-radius: 5px;
  border-left-color: ${({ color }) => color};
  border-left-width: 5px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;
