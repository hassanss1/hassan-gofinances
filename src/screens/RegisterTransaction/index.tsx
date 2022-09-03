import React, { useState } from 'react';
import { Modal } from 'react-native';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import CategorySelect from '../CategorySelect';

export default function RegisterTransaction() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
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
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome'></Input>
          <Input placeholder='Preço'></Input>
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

        <Button title='Enviar'></Button>
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
