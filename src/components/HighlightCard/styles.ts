import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

interface TypeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};
  /* height: ${RFValue(200)}px; */
  width: ${RFValue(300)}px;
  border-radius: 5px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${RFValue(18)}px ${RFValue(23)}px;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;
  ${(props) =>
    props.type === 'up' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `};
  ${(props) =>
    props.type === 'down' &&
    css`
      color: ${({ theme }) => theme.colors.alert};
    `};
  ${(props) =>
    props.type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `};
`;

export const Title = styled.Text<TypeProps>`
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-weight: ${({ theme }) => theme.fonts.regular};
`;

export const Footer = styled.View`
  padding-top: ${RFValue(35)}px;
  padding-right: ${RFValue(22)}px;
  padding-left: ${RFValue(22)}px;
  padding-bottom: ${RFValue(42)}px;
`;

export const Amount = styled.Text<TypeProps>`
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
  font-size: ${RFValue(32)}px;
  font-weight: ${({ theme }) => theme.fonts.bold};
`;

export const LastTransaction = styled.Text<TypeProps>`
  margin-top: ${RFValue(6)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
  font-size: ${RFValue(12)}px;
  font-weight: ${({ theme }) => theme.fonts.regular};
`;
