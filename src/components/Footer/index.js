import React from 'react';
import { Box, Text, Container, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('black');

  return (
    <Box as="footer" bg={bgColor} py={6} mt="auto">
      <Container maxW="container.xl">
        <Text textAlign="center" color={textColor} fontSize="sm">
          © {new Date().getFullYear()} | Descubra sua nova moradia conosco.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
