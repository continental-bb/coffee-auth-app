// Import React library
import React from 'react';

// Import ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client';

// Import Chakra UI provider (enables Chakra components globally)
import { ChakraProvider } from '@chakra-ui/react';

// Import the main App component
import App from './App.jsx';

// Import BrowserRouter for React Router (enables navigation)
import { BrowserRouter } from 'react-router-dom';

// Find the root div in index.html and render the React app into it
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps catch bugs in development
  <React.StrictMode>
    {/* BrowserRouter enables URL routing without page reloads */}
    <BrowserRouter>
      {/* ChakraProvider enables all Chakra UI components */}
      <ChakraProvider>
        {/* Main App component with all routes */}
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);