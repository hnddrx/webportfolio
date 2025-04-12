'use client';

import { styled } from '@mui/system';
import { TextField, Button, Typography, Box } from '@mui/material';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80 },
  },
};

// Styled Components
const Section = styled('section')(({ theme }) => ({
  padding: '4rem 2rem',
  backgroundColor: '#f9f9f9',
  [theme.breakpoints.up('sm')]: { padding: '6rem 4rem' },
}));

const SectionHeading = styled(Typography)({
  fontWeight: 700,
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#333',
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

const ContactContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '2rem',
});

const CardBox = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: 500,
  background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const ContactItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1.5rem',
  fontSize: '1.1rem',
  color: '#555',
  '& a': {
    textDecoration: 'none',
    color: '#0073e6',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#005bb5',
    },
  },
});

const Input = styled(TextField)({
  marginBottom: '1.5rem',
  borderRadius: '8px',
  
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ddd',
    },
    '&:hover fieldset': {
      borderColor: '#0073e6',
    },
    '& label': {
      color: '#ffffff',
    },
    '& placeholder': {
      color: '#ffffff',
    },
    
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: '#0073e6',
  color: '#fff',
  padding: '0.8rem 1.5rem',
  borderRadius: '8px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#005bb5',
  },
});