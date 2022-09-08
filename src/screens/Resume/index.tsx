import React, { useCallback, useEffect, useState } from 'react';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Container,
  Header,
  Title,
  Content,
  CategoryList,
  ChartPie,
  MonthContainer,
  MonthButtonSelect,
  MonthButtonIcon,
  Month,
  LoadingContainer,
} from './styles';

import { CategoryCard } from '../../components/CategoryCard';
import { categories } from '../../utils/categories';
import { useAuth } from '../../hooks/auth';

export interface TransactionData {
  name: string;
  amount: string;
  category: string;
  transactionType: 'up' | 'down';
  date: string;
}
export interface CagetoryProps {
  key: string;
  color: string;
  name: string;
  total: number;
  totalFormatted: string;
  percent: string;
}
export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const theme = useTheme();
  const { user } = useAuth();

  const [totalByCategories, setTotalByCategories] = useState<CagetoryProps[]>(
    []
  );
  function handleSelectedMonthChange(action: 'next' | 'prev') {
    setIsLoading(true);
    action === 'next'
      ? setSelectedMonth(addMonths(selectedMonth, 1))
      : setSelectedMonth(subMonths(selectedMonth, 1));
  }
  function calcTotalExpenses(expenses: TransactionData) {
    return expenses.reduce((accumulator: number, expense: TransactionData) => {
      return accumulator + Number(expense.amount);
    }, 0);
  }
  function filterAllExpenses(formattedResponse: any) {
    return formattedResponse.filter(
      (expense: TransactionData) =>
        expense.transactionType === 'down' &&
        new Date(expense.date).getMonth() === selectedMonth.getMonth() &&
        new Date(expense.date).getFullYear() === selectedMonth.getFullYear()
    );
  }
  async function loadData() {
    // Loading previous data
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    // Fetching all with transactionType as 'down', same month and year as selectedMonth
    const expenses = filterAllExpenses(formattedResponse);

    // Calculating totalExpenses
    const totalExpenses = calcTotalExpenses(expenses);
    const totalByCategory: CagetoryProps[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / totalExpenses) * 100).toFixed(0)}%`;
        totalByCategory.push({
          color: category.color,
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }
  // Load categoryCards when this Resume screen opens or selectedMonth changes
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedMonth])
  );
  return (
    <Container>
      <Header>
        <Title>Gastos por Categoria</Title>
      </Header>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </LoadingContainer>
      ) : (
        <Content>
          <MonthContainer>
            <MonthButtonSelect
              onPress={() => handleSelectedMonthChange('prev')}
            >
              <MonthButtonIcon name='chevron-left'></MonthButtonIcon>
            </MonthButtonSelect>

            <Month>
              {format(selectedMonth, 'MMMM, yyyy', { locale: ptBR })}
            </Month>

            <MonthButtonSelect
              onPress={() => handleSelectedMonthChange('next')}
            >
              <MonthButtonIcon name='chevron-right'></MonthButtonIcon>
            </MonthButtonSelect>
          </MonthContainer>

          <ChartPie>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              x='percent'
              y='total'
              height={RFPercentage(45)}
            />
          </ChartPie>

          <CategoryList
            data={totalByCategories}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <CategoryCard
                key={item.key}
                color={item.color}
                amount={item.totalFormatted}
                title={item.name}
              />
            )}
          ></CategoryList>
        </Content>
      )}
    </Container>
  );
}
