// Import Chakra UI components
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';

// Import Formik and Field for form handling
import { Formik, Form, Field } from 'formik';

// Import Yup for validation
import * as Yup from 'yup';

// Import auth context
import { useAuth } from '../context/AuthContext';

// Import navigation
import { useNavigate, Link } from 'react-router-dom';

// Signup page component
const Signup = () => {
  // Get signup function from context
  const { signup } = useAuth();
  
  // Get navigate function
  const navigate = useNavigate();

  // Validation schema with strong password rules
  const validationSchema = Yup.object({
    username: Yup.string().min(3, 'Min 3 chars').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string()
      .min(8, 'Min 8 chars')
      .matches(/[0-9]/, 'Needs a number')
      .matches(/[A-Z]/, 'Needs uppercase')
      .matches(/[!@#$%^&*]/, 'Needs a symbol')
      .required('Required'),
  });

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading mb="6" color="brown.500">☕ Join the Club</Heading>
      
      <Formik
        initialValues={{ username: '', email: '', phone: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            // Call signup function with form data
            await signup(values);
            // Redirect to menu on success
            navigate('/menu');
          } catch (err) {
            // Show error if signup fails
            setErrors({ email: 'User might already exist' });
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <VStack spacing="4">
              <Input name="username" as={Field} placeholder="Username" isInvalid={errors.username && touched.username} />
              <Input name="email" as={Field} placeholder="Email" isInvalid={errors.email && touched.email} />
              <Input name="phone" as={Field} placeholder="Phone" isInvalid={errors.phone && touched.phone} />
              <Input name="password" type="password" as={Field} placeholder="Strong Password" isInvalid={errors.password && touched.password} />
              <Button type="submit" colorScheme="green" width="full">Sign Up</Button>
            </VStack>
          </Form>
        )}
      </Formik>
      
      <Text mt="4">
        Have an account? <Link to="/login" style={{color: 'blue'}}>Login</Link>
      </Text>
    </Box>
  );
};

export default Signup;