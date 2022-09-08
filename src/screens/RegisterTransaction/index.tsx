import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import CategorySelect from '../CategorySelect';
import { useAuth } from '../../hooks/auth';

interface FormData {
  name: string;
  amount: number;
}
// Validation schema
const schema = Yup.object().shape({
  name: Yup.string().required('Insira um nome'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Insira um valor'),
});

export default function RegisterTransaction() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  //
  const navigation = useNavigation();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    // capturing errors
    formState: { errors },
  } = useForm({
    // Using yup as validator
    resolver: yupResolver<any>(schema),
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  async function handleRegister(form: Partial<FormData>) {
    const dataKey = `@gofinances:transactions_user:${user.id}`;

    if (!transactionType) return Alert.alert('Selecione o tipo da transação.');

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria.');

    const newData = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date(),
    };

    const data = await AsyncStorage.getItem(dataKey);
    const existingData = data ? JSON.parse(data) : [];

    const formattedData = [...existingData, newData];

    try {
      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));
      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });
      navigation.navigate('Listagem');
    } catch (err) {
      console.log(err);
      Alert.alert('Nao foi possivel salvar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name={'name'}
              placeholder='Nome'
              // autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name={'amount'}
              placeholder='Preço'
              keyboardType='number-pad'
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                title='Income'
                type='up'
                // Handle who is selected
                onPress={() => handleTransactionTypeSelect('up')}
                // Sends info about if this is the one selected
                isActive={transactionType === 'up'}
              ></TransactionTypeButton>
              <TransactionTypeButton
                title='Outcome'
                type='down'
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              ></TransactionTypeButton>
            </TransactionTypes>
            <CategorySelectButton
              onPress={handleOpenSelectCategoryModal}
              title={category.name}
              icon='arrow-down'
            ></CategorySelectButton>
          </Fields>
          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
