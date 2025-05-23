import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Heading, 
  Box, 
  Alert, 
  AlertIcon, 
  useColorModeValue, 
  VStack, 
  Spinner, 
  Center, 
  useToast, 
  Button, 
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserForm from '../../components/UserForm';

const Profile = () => {
  const { profile, updateProfile, deleteAccount, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState('');
  const bgColor = useColorModeValue('linear-gradient(360deg,rgba(255, 255, 255, 1) 0%, rgba(180, 211, 222, 1) 48%, rgba(0, 88, 219, 1) 100%);');
  const cardBg = useColorModeValue('white', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!loading && !profile) {
      navigate('/login');
    }
  }, [profile, loading, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { success, error } = await updateProfile({
        nome: values.nome,
        idade: parseInt(values.idade),
        descricao: values.descricao
      });

      if (success) {
        toast({
          title: 'Perfil atualizado',
          description: 'Suas informações foram atualizadas com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setError(error || 'Erro ao atualizar perfil. Tente novamente.');
      }
    } catch (err) {
      setError(err.message || 'Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { success, error } = await deleteAccount();
      
      if (success) {
        toast({
          title: 'Conta excluída',
          description: 'Sua conta foi excluída com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
      } else {
        setError(error || 'Erro ao excluir conta. Tente novamente.');
      }
    } catch (err) {
      setError(err.message || 'Erro ao excluir conta. Tente novamente.');
    } finally {
      onClose();
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
        <Header />
        <Center flex="1">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Center>
        <Footer />
      </Box>
    );
  }

return (
  <Box minH="100vh" bg={bgColor} display="flex" flexDirection="column">
    <Header />

    <Box flex="1" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md" p={6} boxShadow="lg" bg={cardBg} borderRadius="lg">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={4}>
            Meu Perfil
          </Heading>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {profile && (
            <>
              <UserForm 
                initialValues={{
                  nome: profile.nome,
                  idade: profile.idade,
                  descricao: profile.descricao,
                  email: profile.email
                }}
                onSubmit={handleSubmit}
                isRegister={false}
              />

              <Box mt={8} p={6} borderWidth="1px" borderRadius="lg" color="gray">
                <VStack spacing={4} align="stretch">
                  <Heading as="h2" size="md" color="red.500">
                    Atenção: Exclusão de Conta
                  </Heading>
                  <Text>
                    Ao excluir sua conta, todos os seus dados serão permanentemente removidos e não poderão ser recuperados.
                  </Text>
                  <Button colorScheme="red" onClick={onOpen}>
                    Excluir Minha Conta !
                  </Button>
                </VStack>
              </Box>
            </>
          )}
        </VStack>
      </Container>
    </Box>

    <Footer />

    {/* Diálogo de confirmação para exclusão de conta */}
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir Minha Conta
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza? Ao continuar com a exclusão, não será possível reverter essa ação. Todos seus dados serão permanentemente removidos.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Voltar
            </Button>
            <Button colorScheme="red" onClick={handleDeleteAccount} ml={3}>
              Confirmar e Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </Box>
);

};

export default Profile;
