import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';
import { TransactionCardProps } from '../../components/TransactionCard';

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
  TransactionList,
  TitleList,
  LoadingContainer,
  IconWrapper,
} from './styles';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
  id: string;
}
interface HighlightProps {
  total: string;
  date?: string;
}
interface HighlightData {
  income: HighlightProps;
  expense: HighlightProps;
  balance: HighlightProps;
}

function getLastTransaction(collection: DataListProps[], type: 'up' | 'down') {
  const filteredCollection = collection.filter(
    (transactions) => transactions.transactionType === type
  );

  if (filteredCollection.length === 0) {
    return 0;
  }

  // Get last transaction
  const lastTransaction = new Date(
    Math.max.apply(
      Math,
      filteredCollection.map((transactions) =>
        new Date(transactions.date).getTime()
      )
    )
  );
  // Return formatted date
  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
    'pt-BR',
    { month: 'long' }
  )}`;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const theme = useTheme();
  const { signOut, user } = useAuth();
  const [highlightData, setHightlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  // get all transactions from asyncstorage using key

  async function loadTransactions() {
    // load all previous transactions
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    // Counter for incomes and expenses
    let totalIncome = 0;
    let totalExpense = 0;

    // Formats each transaction from all transactions
    const formattedTransactions: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        item.transactionType === 'up'
          ? (totalIncome += Number(item.amount))
          : (totalExpense += Number(item.amount));

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));
        return {
          id: item.id,
          date,
          amount,
          category: item.category,
          name: item.name,
          transactionType: item.transactionType,
        };
      }
    );

    // Calculates balance
    const balance = totalIncome - totalExpense;

    const lastIncomeDate = getLastTransaction(transactions, 'up');
    const lastExpenseDate = getLastTransaction(transactions, 'down');
    const intervalDate =
      getLastTransaction(transactions, 'down') === 0
        ? `Não houveram saídas`
        : `01 a ${lastExpenseDate}`;

    // Defines highlight data to show on highlight cards
    setHightlightData({
      income: {
        total: totalIncome.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date:
          lastIncomeDate === 0
            ? `Não houve entradas neste período`
            : `Última entrada dia ${lastIncomeDate}`,
      },
      expense: {
        total: totalExpense.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date:
          lastExpenseDate === 0
            ? `Não houve saídas neste período`
            : `Última saída dia ${lastExpenseDate}`,
      },
      balance: {
        total: balance.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        date: intervalDate,
      },
    });

    // Put to state transactions the formatted transactions
    setTransactions(formattedTransactions);
    // Clear loading state - set it to false, not loading anymore
    setIsLoading(false);
  }

  // Load transactions when app opens
  useEffect(() => {
    loadTransactions();
  }, []);

  // Load transactions when this Dashboard screen opens
  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <Wrapper>
              <Welcome>
                <Avatar source={{ uri: user.photo }}></Avatar>
                <Message>
                  <Title>Olá,</Title>
                  <Username>{user.name}</Username>
                </Message>
              </Welcome>
              <IconWrapper onPress={signOut}>
                <Icon name='power'></Icon>
              </IconWrapper>
            </Wrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type='up'
              title='Entradas'
              amount={highlightData?.income?.total}
              lastTransaction={highlightData?.income?.date}
            />
            <HighlightCard
              type='down'
              title='Saídas'
              amount={highlightData?.expense?.total}
              lastTransaction={highlightData?.expense?.date}
            />
            <HighlightCard
              type='total'
              title='Total'
              amount={highlightData?.balance?.total}
              lastTransaction={highlightData?.balance?.date}
            />
          </HighlightCards>

          <Transactions>
            <TitleList>Listagem</TitleList>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
