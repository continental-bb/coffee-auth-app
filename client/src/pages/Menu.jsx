// Import Chakra UI components
import { Box, SimpleGrid, Card, CardBody, Heading, Text, Button, VStack } from '@chakra-ui/react';

// Import auth context for logout
import { useAuth } from '../context/AuthContext';

// Import navigation
import { useNavigate } from 'react-router-dom';

// Coffee drink data array
const drinks = [
  { id: 1, name: 'Caramel Latte', type: 'Hot', price: '$5.50', desc: 'Sweet & Warm' },
  { id: 2, name: 'Iced Mocha', type: 'Cold', price: '$6.00', desc: 'Chocolatey Chill' },
  { id: 3, name: 'Vanilla Cappuccino', type: 'Hot', price: '$5.00', desc: 'Foamy Goodness' },
  { id: 4, name: 'Cold Brew', type: 'Cold', price: '$4.50', desc: 'Strong & Smooth' },
];

// Menu page component
const Menu = () => {
  // Get logout function from context
  const { logout } = useAuth();
  
  // Get navigate function
  const navigate = useNavigate();

  // Handle logout click
  const handleLogout = () => {
    // Clear auth state
    logout();
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Box p="10">
      {/* Header with title and logout button */}
      <VStack mb="10">
        <Heading color="brown.600">☕ Coffee House Menu</Heading>
        <Button onClick={handleLogout} colorScheme="red" size="sm">Logout</Button>
      </VStack>
      
      {/* Grid layout for drink cards */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
        {/* Map through drinks array and create a card for each */}
        {drinks.map((drink) => (
          <Card key={drink.id} direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
            <CardBody>
              <Heading size="md">{drink.name}</Heading>
              <Text py="2">{drink.desc}</Text>
              {/* Color-code Hot vs Cold drinks */}
              <Text fontWeight="bold" color={drink.type === 'Hot' ? 'orange.500' : 'blue.500'}>
                {drink.type} - {drink.price}
              </Text>
              <Button mt="4" colorScheme="brown" size="sm">Order Now</Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Menu;