import React from 'react';
import {
  Container,
  Title,
  Amount,
  Footer,
  Icon,
  Category,
  CategoryName,
  Date,
} from './styles';
interface Category {
  name: string;
  icon: string;
}
interface Props {
  title: string;
  amount: string;
  category: Category;
  transactionType: 'up' | 'down';
  date: string;
}
export default function TransactionCard({
  title,
  amount,
  category,
  transactionType,
  date,
}: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={transactionType}>
        {transactionType === 'up' ? amount : `-${amount}`}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon}></Icon>
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
