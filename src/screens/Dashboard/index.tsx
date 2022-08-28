import React from 'react';
import {
  Container,
  Header,
  Welcome,
  Avatar,
  Message,
  Title,
  Username,
} from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Header>
        <Welcome>
          <Avatar></Avatar>
          <Message>
            <Title>Olá</Title>
            <Username>Hassan</Username>
          </Message>
        </Welcome>
      </Header>
    </Container>
  );
}
