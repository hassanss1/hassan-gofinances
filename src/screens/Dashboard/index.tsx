import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';
import {
  Container,
  Header,
  Welcome,
  Avatar,
  Message,
  Title,
  Username,
  Icon,
  Wrapper,
  HighlightCards,
  Transactions,
  TitleList,
} from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Header>
        <Wrapper>
          <Welcome>
            <Avatar
              source={{ uri: 'https://github.com/hassanss1.png' }}
            ></Avatar>
            <Message>
              <Title>Olá,</Title>
              <Username>Hassan</Username>
            </Message>
          </Welcome>
          <Icon name='power'></Icon>
        </Wrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de Abril'
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última saída dia 03 de Abril'
        />
        <HighlightCard
          type='total'
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de abril'
        />
      </HighlightCards>

      <Transactions>
        <TitleList>Listagem</TitleList>
        <TransactionCard
          title='Desenvolvimento de site'
          amount='R$ 12.000,00'
          category={{ name: 'Vendas', icon: 'dollar-sign' }}
          transactionType='up'
          date='13/04/2022'
        />
        <TransactionCard
          title='Hamburgueria Pizzy'
          amount='R$ 59,00'
          category={{ name: 'Alimentação', icon: 'coffee' }}
          transactionType='down'
          date='16/03/2022'
        />
        <TransactionCard
          title='Aluguel do apartamento'
          amount='R$ 1.200,00'
          category={{ name: 'Casa', icon: 'home' }}
          transactionType='down'
          date='21/05/2022'
        />
      </Transactions>
    </Container>
  );
}
