import { Icon, Container, TransactionType } from './styles';
import { TouchableOpacityProps } from 'react-native';
import React from 'react';

interface Props extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}
const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};
export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icon[type]} type={type}></Icon>
      <TransactionType>{title}</TransactionType>
    </Container>
  );
}
