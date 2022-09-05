import { FlatList, FlatListProps } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { CagetoryProps } from './index';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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
export const CategoryList = styled(
  FlatList as new (
    props: FlatListProps<CagetoryProps>
  ) => FlatList<CagetoryProps>
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Content = styled.View`
  flex: 1;
  padding-bottom: 20px;
  padding: 0 24px;
`;

export const ChartPie = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 41px;
`;

export const MonthButtonSelect = styled.TouchableOpacity``;

export const MonthButtonIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const LoadingContainer = styled.View`
  flex: 1;
  /* color: ${({ theme }) => theme.colors.primary}; */
  align-items: center;
  justify-content: center;
`;
