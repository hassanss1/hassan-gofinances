import { Category, Icon, Name, Separator } from './styles';
import { Button } from '../../components/Form/Button';
import React from 'react';
import { Container, Header, Title } from '../RegisterTransaction/styles';
import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';
import { Footer } from '../../components/HighlightCard/styles';

interface Category {
  key: string;
  name: string;
}
interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export default function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(category: Category) {
    setCategory(category);
    closeSelectCategory();
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        // from utils
        data={categories}
        style={{ flex: 1, width: `100%` }}
        keyExtractor={(item) => item.key}
        // render from utils or with status change
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => handleCategorySelect(item)}
          >
            <Icon name={item.icon}></Icon>
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      ></FlatList>
      <Footer>
        <Button onPress={closeSelectCategory} title='Selecionar'></Button>
      </Footer>
    </Container>
  );
}
