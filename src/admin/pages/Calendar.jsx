// src/admin/pages/Calendar.jsx
import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react';

function CalendarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D5D0C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function Calendar() {
  return (
    <Box>
      <Flex direction="column" align="center" justify="center" minH="40vh" gap={4}>
        <CalendarIcon />
        <Text fontSize="md" color="#9A9590" textAlign="center">Scheduling is coming soon.</Text>
        <Text fontSize="sm" color="#B5AD9E" textAlign="center" maxW="320px">Appointment management, physician availability and patient self-booking.</Text>
      </Flex>
    </Box>
  );
}

export default Calendar;
