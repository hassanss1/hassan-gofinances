import React from 'react';
import { Container, Icon, Text } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  icon: string;
}

export function CategorySelectButton({ title, icon, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Text>{title}</Text>
      <Icon name={icon}></Icon>
    </Container>
  );
}
