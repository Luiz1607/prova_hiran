import React, { useState } from 'react';
import { Container, Heading, Box, Alert, AlertIcon, useColorModeValue, VStack, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { success, error } = await login(email, password);

      if (success) {
        navigate('/profile');
      } else {
        setError(error || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      setError(err.message || 'Erro ao entrar, verifique se suas informções foram adicionadas corretamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
  minH="100vh"
  display="flex"
  flexDirection="column"
  bg="linear-gradient(360deg,rgba(255, 255, 255, 1) 0%, rgba(180, 211, 222, 1) 48%, rgba(0, 88, 219, 1) 100%);"
>
      <Header />
      
      <Container
  maxW="container.md"
  py={10}
  flex="1"
  display="flex"
  alignItems="center"
  justifyContent="center"
>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={4}>
            Login
          </Heading>
          
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            p={6} 
            bg={cardBg}
            boxShadow="md"
            width="100%"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                  />
                </FormControl>
                
                <FormControl id="password" isRequired>
                  <FormLabel>Senha</FormLabel>
                  <Input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                  />
                </FormControl>
                
                <Button 
                  type="submit" 
                  width="full" 
                  mt={4}
                  isLoading={isLoading}
                  loadingText="Entrando"
                >
                  Entrar
                </Button>
              </VStack>
            </form>
            
            <Text mt={6} textAlign="center">
              Não tem uma conta?{' '}
              <RouterLink to="/register" style={{ color: '#3182CE' }}>
                Registre-se
              </RouterLink>
            </Text>
          </Box>
        </VStack>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Login;
