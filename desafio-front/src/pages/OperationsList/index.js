import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import {
  Container,
  Header,
  StyledTable,
  StyledCell,
} from '../../global/QueryPages/styles';
import { StyledButton } from '../../global/styles';
import Pagination from '../../components/Pagination';

import history from '../../services/history';
import api from '../../services/api';

export default function OperationsList() {
  const [page, setPage] = useState(1);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    async function loadOperations() {
      const { data } = await api.get('/operations', {
        params: {
          page,
          count: 10,
        },
      });
      setOperations(data);
    }

    loadOperations();
  }, [page]);

  return (
    <Container>
      <h2>Managing operations</h2>
      <Header>       
        <StyledButton
          colored
          onClick={() => history.push('/operations/register')}
        >
          <MdAdd color="#fff" size={24} />
          Register
        </StyledButton>
      </Header>

      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            
          </tr>
        </thead>

        <tbody>
          {operations.map(item => (
            <tr key={item.id}>
              <StyledCell width="15%">{`#${item.id}`}</StyledCell>              
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Pagination
        page={page}
        onPageChange={increase => setPage(page + increase)}
      />
    </Container>
  );
}
