import React, { useState, useEffect } from 'react';
import { parseISO, format, addMilliseconds } from 'date-fns';
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
  const [stores, setStores] = useState([]);
  const [total, setTotal] = useState();
  const [store, setStore] = useState();

  useEffect(() => {
    async function loadOperations() {
      const { data } = await api.get('/operations', {
        params: {
          page,
          count: 10,
          store,
        },
      });
      setOperations(data.operations);
      setTotal(data.total)
    }

    loadOperations();
  }, [page, store]);

  useEffect(() => {
    async function loadStores() {
      const { data } = await api.get('/stores');
      setStores(data);
    }

    loadStores();
  }, []);

  const formatValue = (value) => {
    try {
      return parseFloat(value).toFixed(2);
    } catch (error) {
      return value;
    }
  }
  
  const formatDate = (date) => {
    return format(parseISO(date), 'dd/MM/yyyy');
  }

  const formatTime = (time) => {
    const helperDate = addMilliseconds(new Date(0), time);
    return format(helperDate, 'mm:ss');
  }

  return (
    <Container>
      <h2>Managing operations</h2>
      <Header>       
        <StyledButton
          colored
          onClick={() => history.push('/operations/register')}
        >
          <MdAdd color="#fff" size={24} />
          Import
        </StyledButton>
        <div >
          <strong>Select store</strong>
          <select name="store" value={store} onChange={(e) => setStore(e.target.value)}>
            <option ></option>
            {stores.map(storeItem => (
              <option value={storeItem.id}>{storeItem.store}</option>
            ))}
          </select>
        </div>
        <div>
          <span>Total: R$ {formatValue(total?.sum || 0)}</span>
        </div>
      </Header>

      <StyledTable>
        <thead>
          <tr>
            <th>Store</th>
            <th>Owner</th>
            <th>Type</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Value</th>
            <th>CPF</th>            
            <th>Card</th>
          </tr>
        </thead>

        <tbody>
          {operations.map((item, index) => (
            <tr key={index}>
              <StyledCell>{`#${item.store?.store}`}</StyledCell>              
              <StyledCell>{item.store?.owner}</StyledCell>              
              <StyledCell>{item?.typeDesc?.desc}</StyledCell>              
              <StyledCell>{formatDate(item.date)}</StyledCell>              
              <StyledCell>{formatTime(item.hour)}</StyledCell>           
              <StyledCell>{`R$ ${formatValue(item.value)}`}</StyledCell>              
              <StyledCell>{item.cpf}</StyledCell>             
              <StyledCell>{item.card}</StyledCell>      
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
