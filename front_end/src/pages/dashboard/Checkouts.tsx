import { Container, Stack, styled, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CheckoutType } from '../../constants/type';
import CheckoutTable from '../../components/CheckoutTable';

const StyledContainer = styled(Container)({
    marginTop: '5rem',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  });
  
  const StyledTypography = styled(Typography)({
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    borderBottom: '2px solid #ddd',
    paddingBottom: '0.5rem',
  });

export default function Checkouts() {
  const [checkouts, setCheckouts] = useState<CheckoutType[]>([])

  const getCheckouts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/checkout`);
      setCheckouts(data.checkouts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCheckouts()
  }, []);
  console.log(checkouts)
  return (
    <>
    <StyledContainer>
      <Stack gap={2}>
        <StyledTypography variant="h3" textAlign={"center"}>
          Checkouts
        </StyledTypography>

        <CheckoutTable checkouts={checkouts} />
      </Stack>
    </StyledContainer>
  </>
  )
}
