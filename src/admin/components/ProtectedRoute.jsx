// src/admin/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import useAuth from '../lib/useAuth';
import { Box, Flex, Text } from '@chakra-ui/react';

function ProtectedRoute({ children }) {
  var { user, loading } = useAuth();

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="#FAFAF7">
        <Text fontSize="md" color="#6B6560">Loading...</Text>
      </Flex>
    );
  }

  if (!user) return <Navigate to="/answersmd-admin/" replace />;

  return children;
}

export default ProtectedRoute;
