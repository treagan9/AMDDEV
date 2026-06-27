// src/admin/pages/Images.jsx
import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  SimpleGrid,
  VStack,
  Text,
  Image,
  Button,
  Badge,
  useToast
} from '@chakra-ui/react';
import supabase from '../lib/supabase.jsx';

var PAGES = [
  {
    page: 'Home',
    path: 'home',
    images: [
      { name: 'Hero Desktop', file: 'hero-desktop.png', size: '2000 x 1100', publicPath: '/home/hero-desktop.png' },
      { name: 'Hero Tablet', file: 'hero-tablet.png', size: '1200 x 900', publicPath: '/home/hero-tablet.png' },
      { name: 'Hero Mobile', file: 'hero-mobile.png', size: '800 x 1200', publicPath: '/home/hero-mobile.png' },
      { name: 'Services Square', file: 'home-services-square.png', size: '1200 x 1200', publicPath: '/home/home-services-square.png' }
    ]
  },
  {
    page: 'Services',
    path: 'services',
    images: [
      { name: 'Hero Desktop', file: 'hero-desktop.png', size: '2000 x 1100', publicPath: '/services/hero-desktop.png' },
      { name: 'Hero Tablet', file: 'hero-tablet.png', size: '1200 x 900', publicPath: '/services/hero-tablet.png' },
      { name: 'Hero Mobile', file: 'hero-mobile.png', size: '800 x 1200', publicPath: '/services/hero-mobile.png' },
      { name: 'Direct Access', file: 'service-access.png', size: '1200 x 1200', publicPath: '/services/service-access.png' },
      { name: 'Preventive Care', file: 'service-preventive.png', size: '1200 x 1200', publicPath: '/services/service-preventive.png' },
      { name: 'House Calls', file: 'service-housecalls.png', size: '1200 x 1200', publicPath: '/services/service-housecalls.png' },
      { name: 'Executive Health', file: 'service-executive.png', size: '1200 x 1200', publicPath: '/services/service-executive.png' },
      { name: 'Specialist Coordination', file: 'service-coordination.png', size: '1200 x 1200', publicPath: '/services/service-coordination.png' },
      { name: 'Travel Medicine', file: 'service-travel.png', size: '1200 x 1200', publicPath: '/services/service-travel.png' }
    ]
  },
  {
    page: 'What to Expect',
    path: 'new-patients',
    images: [
      { name: 'Hero Desktop', file: 'hero-desktop.png', size: '2000 x 1100', publicPath: '/new-patients/hero-desktop.png' },
      { name: 'Hero Tablet', file: 'hero-tablet.png', size: '1200 x 900', publicPath: '/new-patients/hero-tablet.png' },
      { name: 'Hero Mobile', file: 'hero-mobile.png', size: '800 x 1200', publicPath: '/new-patients/hero-mobile.png' },
      { name: 'Deep Dive', file: 'deep-dive.png', size: '1200 x 900', publicPath: '/new-patients/deep-dive.png' },
      { name: 'Prepare Square', file: 'prepare-square.png', size: '1200 x 1200', publicPath: '/new-patients/prepare-square.png' }
    ]
  },
  {
    page: 'Team',
    path: 'team',
    images: [
      { name: 'Hero Desktop', file: 'hero-desktop.png', size: '2000 x 1100', publicPath: '/team/hero-desktop.png' },
      { name: 'Hero Tablet', file: 'hero-tablet.png', size: '1200 x 900', publicPath: '/team/hero-tablet.png' },
      { name: 'Hero Mobile', file: 'hero-mobile.png', size: '800 x 1200', publicPath: '/team/hero-mobile.png' },
      { name: 'Dr. Doug Shapiro', file: 'dr-doug-shapiro.png', size: '800 x 1040', publicPath: '/team/dr-doug-shapiro.png' },
      { name: 'Dr. Drew Meriwether', file: 'dr-drew-meriwether.png', size: '800 x 1040', publicPath: '/team/dr-drew-meriwether.png' },
      { name: 'Dr. Divino D\'Alessio', file: 'dr-divino-dalessio.png', size: '800 x 1040', publicPath: '/team/dr-divino-dalessio.png' },
      { name: 'Dr. Ellen Howard', file: 'dr-ellen-howard.png', size: '800 x 1040', publicPath: '/team/dr-ellen-howard.png' },
      { name: 'Lauren Shapiro', file: 'lauren-shapiro.png', size: '800 x 800', publicPath: '/team/lauren-shapiro.png' },
      { name: 'Jamie Barber', file: 'jamie-barber.png', size: '800 x 800', publicPath: '/team/jamie-barber.png' },
      { name: 'Emma Maddox', file: 'emma-maddox.png', size: '800 x 800', publicPath: '/team/emma-maddox.png' },
      { name: 'Laura Gore', file: 'laura-gore.png', size: '800 x 800', publicPath: '/team/laura-gore.png' },
      { name: 'Sarah Juarez', file: 'sarah-juarez.png', size: '800 x 800', publicPath: '/team/sarah-juarez.png' }
    ]
  },
  {
    page: 'Executive',
    path: 'executive',
    images: [
      { name: 'Hero Desktop', file: 'hero-desktop.png', size: '2000 x 1100', publicPath: '/executive/hero-desktop.png' },
      { name: 'Hero Tablet', file: 'hero-tablet.png', size: '1200 x 900', publicPath: '/executive/hero-tablet.png' },
      { name: 'Hero Mobile', file: 'hero-mobile.png', size: '800 x 1200', publicPath: '/executive/hero-mobile.png' }
    ]
  },
  {
    page: 'Locations',
    path: 'locations',
    images: [
      { name: 'Tampa Office', file: 'tampa-office-main.png', size: '1200 x 1200', publicPath: '/locations/tampa-office-main.png' },
      { name: 'St. Petersburg', file: 'st-pete.png', size: '1200 x 1200', publicPath: '/locations/st-pete.png' },
      { name: 'Boca Raton', file: 'boca-main.png', size: '1200 x 1200', publicPath: '/locations/boca-main.png' }
    ]
  }
];

function ImageSlot({ image, pagePath }) {
  var [imgError, setImgError] = useState(false);
  var [uploading, setUploading] = useState(false);
  var [uploadedUrl, setUploadedUrl] = useState(null);
  var fileRef = useRef(null);
  var toast = useToast();

  var storagePath = pagePath + '/' + image.file;
  var displayUrl = uploadedUrl || image.publicPath;

  async function handleUpload(e) {
    var file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please select an image file', status: 'error', duration: 3000, position: 'top' });
      return;
    }
    setUploading(true);
    try {
      var result = await supabase.storage.from('site-images').upload(storagePath, file, { upsert: true });
      if (result.error) throw result.error;
      var urlResult = supabase.storage.from('site-images').getPublicUrl(storagePath);
      setUploadedUrl(urlResult.data.publicUrl + '?t=' + Date.now());
      setImgError(false);
      toast({ title: 'Image uploaded', description: 'Deploy the site to see changes live.', status: 'success', duration: 4000, position: 'top' });
    } catch (err) {
      toast({ title: 'Upload failed', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setUploading(false);
  }

  return (
    <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
      <Box position="relative" pb="66%" bg="#F0EDE8" overflow="hidden">
        {!imgError ? (
          <Image src={displayUrl} alt={image.name} objectFit="cover" position="absolute" top={0} left={0} w="100%" h="100%" onError={function () { setImgError(true); }} />
        ) : (
          <Flex position="absolute" top={0} left={0} w="100%" h="100%" align="center" justify="center" direction="column" gap={2}>
            <Text fontSize="sm" color="#9A9590">No image</Text>
            <Text fontSize="xs" color="#B5AD9E">{image.file}</Text>
          </Flex>
        )}
      </Box>
      <Box p={5}>
        <Flex justify="space-between" align="flex-start" mb={3}>
          <Box>
            <Text fontSize="md" fontWeight={600} color="#2D2D2D" mb={1}>{image.name}</Text>
            <Text fontSize="sm" color="#9A9590">{image.file}</Text>
          </Box>
          <Badge bg="#F0EDE8" color="#6B6560" borderRadius="full" px={3} py={1} fontSize="xs" fontWeight={500}>{image.size}</Badge>
        </Flex>
        <Button onClick={function () { fileRef.current.click(); }} size="sm" w="100%" bg="#F0EDE8" color="#2D2D2D" borderRadius="8px" _hover={{ bg: '#E8E2D8' }} isLoading={uploading} loadingText="Uploading..." fontSize="sm">{imgError ? 'Upload image' : 'Replace image'}</Button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
      </Box>
    </Box>
  );
}

function Images() {
  var [activePage, setActivePage] = useState(0);
  var currentPage = PAGES[activePage];

  return (
    <Box>
      <Text fontFamily="heading" fontSize="3xl" fontWeight={700} color="#2D2D2D" mb={2}>Design</Text>
      <Text fontSize="md" color="#6B6560" mb={8}>Manage images across the site. Upload replacements and they'll be stored in the image library.</Text>

      <Flex gap={3} mb={8} flexWrap="wrap">
        {PAGES.map(function (p, i) {
          var isActive = activePage === i;
          return (
            <Button key={p.page} size="sm" borderRadius="8px" bg={isActive ? '#2D2D2D' : 'white'} color={isActive ? 'white' : '#6B6560'} border="1px solid" borderColor={isActive ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setActivePage(i); }} _hover={{ bg: isActive ? '#2D2D2D' : '#F0EDE8' }} fontSize="sm">{p.page}</Button>
          );
        })}
      </Flex>

      <Box mb={6}>
        <Flex align="center" gap={3} mb={2}>
          <Text fontFamily="heading" fontSize="xl" fontWeight={700} color="#2D2D2D">{currentPage.page}</Text>
          <Badge bg="#F0EDE8" color="#6B6560" borderRadius="full" px={3} py={1} fontSize="xs">{currentPage.images.length} images</Badge>
        </Flex>
        <Text fontSize="sm" color="#9A9590">/{currentPage.path}/</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {currentPage.images.map(function (image) {
          return <ImageSlot key={image.file} image={image} pagePath={currentPage.path} />;
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Images;
