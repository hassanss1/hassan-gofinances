import React from 'react';
import { categories } from '../../utils/categories';
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

export interface TransactionCardProps {
  name: string;
  amount: string;
  category: string;
  transactionType: 'up' | 'down';
  date: string;
}
interface Props {
  data: TransactionCardProps;
}
export default function TransactionCard({ data }: Props) {
  const [category] = categories.filter((item) => item.key === data.category);
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.transactionType}>
        {data.transactionType === 'up' ? data.amount : `-${data.amount}`}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon}></Icon>
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
