// src/admin/pages/Intake.jsx
import { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  Text,
  Input,
  Textarea,
  Button,
  Select,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';

var inputStyles = {
  bg: '#FAFAF7', border: '1px solid', borderColor: '#D5D0C8', borderRadius: '8px',
  fontSize: 'md', color: '#2D2D2D', h: '48px', px: 4,
  _placeholder: { color: '#9B9488' }, _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

var steps = ['Personal', 'Contact', 'Medical', 'Insurance', 'Membership'];

function Intake() {
  var [step, setStep] = useState(0);
  var [submitting, setSubmitting] = useState(false);
  var navigate = useNavigate();
  var toast = useToast();
  var { teamMember } = useAuth();

  var [form, setForm] = useState({
    first_name: '', last_name: '', date_of_birth: '', email: '', phone: '',
    address_line1: '', address_line2: '', city: '', state: 'FL', zip: '',
    location: '', allergies: '', current_medications: '', medical_conditions: '',
    emergency_contact_name: '', emergency_contact_phone: '', emergency_contact_relationship: '',
    insurance_type: '', insurance_carrier: '', insurance_policy_number: '',
    membership_tier: 'standard', physician_id: '', annual_fee: '', how_heard: '', notes: ''
  });

  var [physicians, setPhysicians] = useState([]);
  var [physLoaded, setPhysLoaded] = useState(false);
  if (!physLoaded) {
    supabase.from('physicians').select('*').eq('status', 'active').then(function (r) {
      setPhysicians(r.data || []);
      setPhysLoaded(true);
    });
  }

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    setForm(function (prev) { return Object.assign({}, prev, { [name]: value }); });
  }

  function nextStep() { if (step < steps.length - 1) setStep(step + 1); }
  function prevStep() { if (step > 0) setStep(step - 1); }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      var insertData = Object.assign({}, form, {
        status: 'active',
        membership_start: new Date().toISOString().split('T')[0],
        annual_fee: form.annual_fee ? parseFloat(form.annual_fee) : null,
        physician_id: form.physician_id || null
      });
      var result = await supabase.from('members').insert(insertData).select().single();
      if (result.error) throw result.error;
      await supabase.from('activity_log').insert({
        user_id: teamMember ? teamMember.id : null,
        action: 'member_created', entity_type: 'member', entity_id: result.data.id,
        details: { name: form.first_name + ' ' + form.last_name, created_by: teamMember ? teamMember.first_name + ' ' + teamMember.last_name : 'Unknown' }
      });
      toast({ title: 'Patient created', status: 'success', duration: 3000, position: 'top' });
      navigate('/answersmd-admin/members/' + result.data.id + '/');
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setSubmitting(false);
  }

  return (
    <Box>
      <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D" mb={2}>New patient intake</Text>
      <Text fontSize="md" color="#6B6560" mb={8}>Add a new patient to the practice.</Text>

      <Flex gap={2} mb={8}>
        {steps.map(function (s, i) {
          var isActive = step === i;
          var isComplete = step > i;
          return (
            <Flex key={s} align="center" gap={2} flex={1} cursor="pointer" onClick={function () { setStep(i); }}>
              <Flex w="28px" h="28px" borderRadius="full" bg={isActive ? '#1B3A34' : isComplete ? '#C4A265' : '#E8E2D8'} align="center" justify="center" flexShrink={0}>
                <Text fontSize="xs" fontWeight={600} color={isActive || isComplete ? 'white' : '#9A9590'}>{isComplete ? '✓' : i + 1}</Text>
              </Flex>
              <Text fontSize="sm" fontWeight={isActive ? 600 : 400} color={isActive ? '#2D2D2D' : '#6B6560'} display={{ base: 'none', md: 'block' }}>{s}</Text>
              {i < steps.length - 1 && <Box flex={1} h="1px" bg={isComplete ? '#C4A265' : '#E8E2D8'} display={{ base: 'none', md: 'block' }} />}
            </Flex>
          );
        })}
      </Flex>

      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" p={{ base: 6, md: 10 }}>
        {step === 0 && (
          <VStack spacing={5} align="stretch">
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={2}>Personal information</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>First name</Text><Input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Jane" {...inputStyles} /></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Last name</Text><Input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Smith" {...inputStyles} /></Box>
            </SimpleGrid>
            <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Date of birth</Text><Input name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} {...inputStyles} /></Box>
            <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>How did you hear about us?</Text><Input name="how_heard" value={form.how_heard} onChange={handleChange} placeholder="Referral, online search, etc." {...inputStyles} /></Box>
          </VStack>
        )}

        {step === 1 && (
          <VStack spacing={5} align="stretch">
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={2}>Contact details</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Email</Text><Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" {...inputStyles} /></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Phone</Text><Input name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" {...inputStyles} /></Box>
            </SimpleGrid>
            <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Address</Text><Input name="address_line1" value={form.address_line1} onChange={handleChange} placeholder="123 Main St" {...inputStyles} /></Box>
            <Input name="address_line2" value={form.address_line2} onChange={handleChange} placeholder="Apt, suite, unit (optional)" {...inputStyles} />
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>City</Text><Input name="city" value={form.city} onChange={handleChange} placeholder="Tampa" {...inputStyles} /></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>State</Text><Input name="state" value={form.state} onChange={handleChange} {...inputStyles} /></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>ZIP</Text><Input name="zip" value={form.zip} onChange={handleChange} placeholder="33609" {...inputStyles} /></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Location</Text><Select name="location" value={form.location} onChange={handleChange} {...inputStyles}><option value="">Select</option><option value="Tampa">Tampa</option><option value="St. Petersburg">St. Petersburg</option><option value="Boca Raton">Boca Raton</option></Select></Box>
            </SimpleGrid>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D" mt={4} mb={2}>Emergency contact</Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Name</Text><Input name="emergency_contact_name" value={form.emergency_contact_name} onChange={handleChange} {...inputStyles} /></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Phone</Text><Input name="emergency_contact_phone" value={form.emergency_contact_phone} onChange={handleChange} {...inputStyles} /></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Relationship</Text><Input name="emergency_contact_relationship" value={form.emergency_contact_relationship} onChange={handleChange} placeholder="Spouse, parent, etc." {...inputStyles} /></Box>
            </SimpleGrid>
          </VStack>
        )}

        {step === 2 && (
          <VStack spacing={5} align="stretch">
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={2}>Medical history</Text>
            <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Known allergies</Text><Textarea name="allergies" value={form.allergies} onChange={handleChange} placeholder="List any known allergies..." rows={3} resize="vertical" bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#9B9488' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} /></Box>
            <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Current medications</Text><Textarea name="current_medications" value={form.current_medications} onChange={handleChange} placeholder="List all current medications, supplements, vitamins..." rows={3} resize="vertical" bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#9B9488' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} /></Box>
            <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Medical conditions</Text><Textarea name="medical_conditions" value={form.medical_conditions} onChange={handleChange} placeholder="List any current or past medical conditions..." rows={3} resize="vertical" bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#9B9488' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} /></Box>
          </VStack>
        )}

        {step === 3 && (
          <VStack spacing={5} align="stretch">
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={2}>Insurance details</Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Insurance type</Text><Select name="insurance_type" value={form.insurance_type} onChange={handleChange} {...inputStyles}><option value="">Select</option><option value="PPO">PPO</option><option value="HMO">HMO</option><option value="EPO">EPO</option><option value="POS">POS</option><option value="None">None</option></Select></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Carrier</Text><Input name="insurance_carrier" value={form.insurance_carrier} onChange={handleChange} placeholder="Aetna, Blue Cross, etc." {...inputStyles} /></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Policy number</Text><Input name="insurance_policy_number" value={form.insurance_policy_number} onChange={handleChange} placeholder="Policy or member ID" {...inputStyles} /></Box>
            </SimpleGrid>
          </VStack>
        )}

        {step === 4 && (
          <VStack spacing={5} align="stretch">
            <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D" mb={2}>Membership setup</Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Membership tier</Text><Select name="membership_tier" value={form.membership_tier} onChange={handleChange} {...inputStyles}><option value="standard">Standard</option><option value="junior">Junior</option><option value="executive">Executive</option><option value="corporate">Corporate</option></Select></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Physician</Text><Select name="physician_id" value={form.physician_id} onChange={handleChange} {...inputStyles}><option value="">Select physician</option>{physicians.map(function (p) { return <option key={p.id} value={p.id}>{p.name}</option>; })}</Select></Box>
              <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Annual fee</Text><Input name="annual_fee" type="number" value={form.annual_fee} onChange={handleChange} placeholder="4500" {...inputStyles} /></Box>
            </SimpleGrid>
            <Box><Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>Notes</Text><Textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Anything else to note about this patient..." rows={4} resize="vertical" bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#9B9488' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} /></Box>
          </VStack>
        )}

        <Flex justify="space-between" mt={8} pt={6} borderTop="1px solid" borderColor="#E8E2D8">
          {step > 0 ? <Button onClick={prevStep} variant="outline" borderRadius="8px" borderColor="#E8E2D8" color="#6B6560" _hover={{ bg: '#F0EDE8' }}>Back</Button> : <Box />}
          {step < steps.length - 1 ? (
            <Button onClick={nextStep} bg="#1B3A34" color="white" borderRadius="8px" _hover={{ bg: '#234840' }}>Continue</Button>
          ) : (
            <Button onClick={handleSubmit} bg="#1B3A34" color="white" borderRadius="8px" isLoading={submitting} loadingText="Creating..." _hover={{ bg: '#234840' }}>Create patient</Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default Intake;
