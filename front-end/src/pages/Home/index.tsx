import React, { useCallback, useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { Container, Button, Content, Input } from './styles';

import { FaCheck } from 'react-icons/fa';

import { History } from 'history';

type Props = {
  history: History;
};

export const CREATE_OR_LOGIN_USER = gql`
  mutation($email: String!, $name: String!) {
    createOrLoginUser(data: { email: $email, name: $name }) {
      id
    }
  }
`;

const Home: React.FC<Props> = ({ history }) => {
  const [input, setInput] = useState<string>('');

  const [createOrLoginUser, { data }] = useMutation(CREATE_OR_LOGIN_USER);

  useEffect(() => {
    if (data) {
      const { createOrLoginUser } = data;
      const { id } = createOrLoginUser;

      history.push(`/dashboard?id=${id}`);
    }
  }, [data, history]);

  const handleRegister = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (input.length < 1) {
        alert('Insert a valid e-mail');
        return;
      }
      createOrLoginUser({ variables: { email: input, name: input } });
      setInput('');
    },
    [createOrLoginUser, input],
  );

  return (
    <Container>
      <Content>
        <form>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E-mail"
          />

          <Button onClick={handleRegister}>
            <FaCheck size={36} color="#fff" />
            <span>Login or Register</span>
          </Button>
        </form>
      </Content>
    </Container>
  );
};

export default Home;
