import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Header } from '../../global/RegisterPages/styles';
import {
  InputContainer,
  StyledButton,
} from '../../global/styles';
import FileInput from '../../components/FileInput';

import api from '../../services/api';
import history from '../../services/history';

export default function OperationsRegister() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  function handleChangeFile(file) {
    setFile(file);
    setFileName(file?.name);
  }

  async function handleSubmit() {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await api.post(`/files`, formData);

      toast.success('Archive imported!');
      history.push('/operations');
    } catch (error) {
      const { response } = error;

      if (response && response.data && response.data.error) {
        toast.error(response.data.error);
      } else
        toast.error(
          'Try again later'
        );
    }
  }

  return (
    <Container>
      <form >
        <Header>
          <strong>Import operations</strong>
          <aside>
            <StyledButton
              type="button"
              onClick={() => history.push('/operations')}
            >
              <MdKeyboardArrowLeft color="#fff" size={24} />
              BACK
            </StyledButton>
            <StyledButton type="button" colored onClick={handleSubmit}>
              <MdCheck color="#fff" size={24} />
              IMPORT
            </StyledButton>
          </aside>
        </Header>
        <InputContainer>
          <FileInput
            onChange={handleChangeFile}       
            fileName={fileName}     
          />         
          
        </InputContainer>
      </form>
    </Container>
  );
}