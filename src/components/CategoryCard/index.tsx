import React from 'react';
import { Container, Title, Amount } from './styles';

interface CategoryCardProps {
  color: string;
  title: string;
  amount: string;
}
export function CategoryCard({ color, title, amount }: CategoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
