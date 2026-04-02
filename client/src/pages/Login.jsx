// Import Chakra UI components for styling
import { Box, Button, Input, VStack, Text, Heading } from '@chakra-ui/react';

// Import Formik for form handling
import { Formik, Form, Field } from 'formik';

// Import Yup for validation schema
import * as Yup from 'yup';

// Import useAuth for login function
import { useAuth } from '../context/AuthContext';

// Import navigation hooks
import { useNavigate, Link } from 'react-router-dom';

// Login page component
const Login = () => {
  // Get login function from auth context
  const { login } = useAuth();
  
  // Get navigate function for redirecting after login
  const navigate = useNavigate();

  // Validation schema for login form
  const validationSchema = Yup.object({
    loginInput: Yup.string().required('Required'), // Email/username/phone required
    password: Yup.string().required('Required'), // Password required
  });

  return (
    // Centered container box
    <Box maxW="md" mx="auto" mt="10">
      {/* Page heading */}
      <Heading mb="6" color="brown.500">☕ Coffee House Login</Heading>
      
      {/* Formik form with validation */}
      <Formik
        initialValues={{ loginInput: '', password: '' }} // Empty initial values
        validationSchema={validationSchema} // Apply validation rules
        onSubmit={async (values, { setErrors }) => {
          try {
            // Call login function with form values
            await login(values.loginInput, values.password);
            // Redirect to menu on success
            navigate('/menu');
          } catch (err) {
            // Show error if login fails
            setErrors({ loginInput: 'Invalid credentials' });
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <VStack spacing="4">
              {/* Login input field (email/username/phone) */}
              <Input 
                name="loginInput" 
                as={Field} 
                placeholder="Email, Username or Phone"
                isInvalid={errors.loginInput && touched.loginInput}
              />
              
              {/* Password input field */}
              <Input 
                name="password" 
                as={Field} 
                type="password" 
                placeholder="Password"
                isInvalid={errors.password && touched.password}
              />
              
              {/* Submit button */}
              <Button type="submit" colorScheme="orange" width="full">Sign In</Button>
            </VStack>
          </Form>
        )}
      </Formik>
      
      {/* Link to signup page */}
      <Text mt="4">
        New here? <Link to="/signup" style={{color: 'blue'}}>Create Account</Link>
      </Text>
    </Box>
  );
};

// Export component
export default Login;