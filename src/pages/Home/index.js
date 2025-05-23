import React from 'react';
import { Container, Heading, Text, VStack, Button, Box, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = () => {
  const { isAuthenticated, profile } = useAuth();
  const bgColor = useColorModeValue('gray', 'white');
  const cardBg = useColorModeValue('white');

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
  flex="1" 
  display="flex" 
  alignItems="center" 
  justifyContent="center"
>
  <VStack spacing={9} textAlign="center" color="black" width="100%">
    <Heading as="h1" size="2xl">
      Alugue com Facilidade e Segurança!
    </Heading>

    {isAuthenticated ? (
      <Box 
        p={8} 
        borderRadius="lg" 
        bg={cardBg} 
        boxShadow="md" 
        width="100%"
        textAlign="center"
      >
        <Heading as="h2" size="lg" mb={4}>
          Bem-vindo, {profile?.nome || 'Usuário'}!
        </Heading>
        <Text mb={6}>
          Bem vindo ao seu novo sistema de Aluguel de Casas.
        </Text>
        <VStack spacing={4}>
          <Button as={RouterLink} to="/profile" color="black" size="lg" width="full">
            Meu Perfil
          </Button>
          <Button as={RouterLink} to="/users" color="black" size="lg" width="full">
            Ver Usuários
          </Button>
        </VStack>
      </Box>
    ) : (
      <Box 
        p={8} 
        borderRadius="lg" 
        bg={cardBg} 
        boxShadow="md" 
        width="100%"
        textAlign="center"
      >
        <Heading as="h3" size="lg" mb={4}>
          Conheça nosso sistema por completo!
        </Heading>
        <Text mb={6}>
          Faça login ou registre-se para ver nosso catálogo.
        </Text>
        <VStack spacing={4}>
          <Button as={RouterLink} to="/login" color="black" size="lg" width="50%">
            Login
          </Button>
          <Button as={RouterLink} to="/register" color="black" size="lg" width="50%">
            Registrar
          </Button>
        </VStack>
      </Box>
    )}
  </VStack>
</Container>
      
      <Footer />
    </Box>
  );
};

export default Home;
