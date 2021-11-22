import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function FileInput({ onChange }) {
  const ref = useRef();

  async function handleChange(e) {
    onChange(e.target.files[0]);
  }

  return (
    <Container>
      <label htmlFor="file">
        <input
          type="file"
          id="file"
          accept=".txt"
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

