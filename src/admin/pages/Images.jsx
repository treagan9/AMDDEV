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
  useToast,
  Collapse
} from '@chakra-ui/react';
import supabase from '../lib/supabase.jsx';
import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineUpload, HiOutlinePhotograph } from 'react-icons/hi';

var PAGES = [
  {
    page: 'Home',
    path: 'home',
    sections: [
      { title: 'Hero', description: 'Full-screen hero with transparent navigation', images: [
        { name: 'Desktop', file: 'hero-desktop.png', size: '2000 x 1100' },
        { name: 'Tablet', file: 'hero-tablet.png', size: '1200 x 900' },
        { name: 'Mobile', file: 'hero-mobile.png', size: '800 x 1200' }
      ]},
      { title: 'Services Split', description: '50/50 layout with image left, content right', images: [
        { name: 'Square image', file: 'home-services-square.png', size: '1200 x 1200' }
      ]}
    ]
  },
  {
    page: 'Services',
    path: 'home',
    sections: [
      { title: 'Hero', description: 'Full-screen hero with stats below', images: [
        { name: 'Desktop', file: 'your-doctors-cell-hero-desktop.png', size: '2000 x 1100' },
        { name: 'Tablet', file: 'your-doctors-cell-hero-ipad.png', size: '1200 x 900' },
        { name: 'Mobile', file: 'your-doctors-cell-hero-mobile.png', size: '800 x 1200' }
      ]},
      { title: 'Service Items', description: '6 alternating 50/50 splits with square images', images: [
        { name: 'Direct Access', file: 'service-access.png', size: '1200 x 1200' },
        { name: 'Preventive Care', file: 'service-preventive.png', size: '1200 x 1200' },
        { name: 'House Calls', file: 'service-housecalls.png', size: '1200 x 1200' },
        { name: 'Executive Health', file: 'service-executive.png', size: '1200 x 1200' },
        { name: 'Specialist Coordination', file: 'service-coordination.png', size: '1200 x 1200' },
        { name: 'Travel Medicine', file: 'service-travel.png', size: '1200 x 1200' }
      ]}
    ]
  },
  {
    page: 'What to Expect',
    path: 'home',
    sections: [
      { title: 'Hero', description: 'Full-screen hero with bottom-aligned content', images: [
        { name: 'Desktop', file: 'what-to-expect-hero-desktop.png', size: '2000 x 1100' },
        { name: 'Tablet', file: 'what-to-expect-hero-ipad.png', size: '1200 x 900' },
        { name: 'Mobile', file: 'what-to-expect-hero-mobile.png', size: '800 x 1200' }
      ]},
      { title: 'Deep Dive', description: '50/50 split with checkmark list', images: [
        { name: 'Landscape', file: 'deep-dive.png', size: '1200 x 900' }
      ]},
      { title: 'Prepare', description: '50/50 split reversed', images: [
        { name: 'Square image', file: 'prepare-square.png', size: '1200 x 1200' }
      ]}
    ]
  },
  {
    page: 'Team',
    path: 'home',
    sections: [
      { title: 'Hero', description: 'Full-screen team hero image', images: [
        { name: 'Desktop', file: 'our-team-hero-desktop.png', size: '2000 x 1100' },
        { name: 'Tablet', file: 'our-team-hero-ipad.png', size: '1200 x 900' },
        { name: 'Mobile', file: 'our-team-hero-mobile.png', size: '800 x 1200' }
      ]},
      { title: 'Physicians', description: 'Alternating editorial spreads at 70% width', images: [
        { name: 'Dr. Doug Shapiro', file: 'dr-doug-shapiro.png', size: '800 x 1040', publicPath: '/team/dr-doug-shapiro.png' },
        { name: 'Dr. Drew Meriwether', file: 'dr-drew-meriwether.png', size: '800 x 1040', publicPath: '/team/dr-drew-meriwether.png' },
        { name: 'Dr. Divino D\'Alessio', file: 'dr-divino-dalessio.png', size: '800 x 1040', publicPath: '/team/dr-divino-dalessio.png' },
        { name: 'Dr. Ellen Howard', file: 'dr-ellen-howard.png', size: '800 x 1040', publicPath: '/team/dr-ellen-howard.png' }
      ]},
      { title: 'Staff', description: 'Circular portraits with warm borders', images: [
        { name: 'Lauren Shapiro', file: 'lauren-shapiro.png', size: '800 x 800', publicPath: '/team/lauren-shapiro.png' },
        { name: 'Jamie Barber', file: 'jamie-barber.png', size: '800 x 800', publicPath: '/team/jamie-barber.png' },
        { name: 'Emma Maddox', file: 'emma-maddox.png', size: '800 x 800', publicPath: '/team/emma-maddox.png' },
        { name: 'Laura Gore', file: 'laura-gore.png', size: '800 x 800', publicPath: '/team/laura-gore.png' },
        { name: 'Sarah Juarez', file: 'sarah-juarez.png', size: '800 x 800', publicPath: '/team/sarah-juarez.png' }
      ]}
    ]
  },
  {
    page: 'Executive',
    path: 'home',
    sections: [
      { title: 'Hero', description: 'Full-screen executive health hero', images: [
        { name: 'Desktop', file: 'executive-hero-desktop.png', size: '2000 x 1100' },
        { name: 'Tablet', file: 'executive-hero-desktop-ipad.png', size: '1200 x 900' },
        { name: 'Mobile', file: 'executive-hero-desktop-mobile.png', size: '800 x 1200' }
      ]}
    ]
  },
  {
    page: 'Locations',
    path: 'locations',
    sections: [
      { title: 'Location Cards', description: 'Square images in the home page locations grid', images: [
        { name: 'Tampa Office', file: 'tampa-office-main.png', size: '1200 x 1200' },
        { name: 'St. Petersburg', file: 'st-pete.png', size: '1200 x 1200' },
        { name: 'Boca Raton', file: 'boca-main.png', size: '1200 x 1200' }
      ]}
    ]
  }
];

function ImageSlot({ image, pagePath }) {
  var [imgError, setImgError] = useState(false);
  var [uploading, setUploading] = useState(false);
  var [uploadedUrl, setUploadedUrl] = useState(null);
  var fileRef = useRef(null);
  var toast = useToast();

  var displayUrl = uploadedUrl || image.publicPath || ('/' + pagePath + '/' + image.file);
  var storagePath = pagePath + '/' + image.file;

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
    <Flex bg="#FAFAF7" borderRadius="10px" border="1px solid" borderColor="#E8E2D8" overflow="hidden" align="center" gap={0}>
      <Box w="80px" h="80px" flexShrink={0} position="relative" bg="#E8E2D8" overflow="hidden">
        {!imgError ? (
          <Image src={displayUrl} alt={image.name} objectFit="cover" w="100%" h="100%" onError={function () { setImgError(true); }} />
        ) : (
          <Flex w="100%" h="100%" align="center" justify="center"><HiOutlinePhotograph size={20} color="#9A9590" /></Flex>
        )}
      </Box>
      <Flex flex={1} justify="space-between" align="center" px={4} py={3} gap={3} minW="0">
        <Box minW="0">
          <Text fontSize="sm" fontWeight={600} color="#2D2D2D" noOfLines={1}>{image.name}</Text>
          <Text fontSize="xs" color="#9A9590">{image.size}</Text>
        </Box>
        <Button onClick={function () { fileRef.current.click(); }} size="xs" bg="white" color="#6B6560" border="1px solid" borderColor="#D5D0C8" borderRadius="6px" _hover={{ bg: '#F0EDE8', borderColor: '#C4A265' }} isLoading={uploading} loadingText="..." flexShrink={0} fontSize="xs" h="30px" px={3}>{imgError ? 'Upload' : 'Replace'}</Button>
      </Flex>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
    </Flex>
  );
}

function PageSection({ section, pagePath }) {
  var [open, setOpen] = useState(false);
  return (
    <Box mb={3}>
      <Flex align="center" justify="space-between" px={4} py={3} cursor="pointer" onClick={function () { setOpen(!open); }} borderRadius="10px" _hover={{ bg: '#F0EDE8' }} transition="background 0.15s ease">
        <Flex align="center" gap={3}>
          <Text fontSize="md" fontWeight={600} color="#2D2D2D">{section.title}</Text>
          <Badge bg="#F0EDE8" color="#6B6560" borderRadius="full" px={2} py={0.5} fontSize="xs">{section.images.length}</Badge>
        </Flex>
        <Flex align="center" gap={3}>
          <Text fontSize="xs" color="#9A9590" display={{ base: 'none', md: 'block' }}>{section.description}</Text>
          <Box color="#9A9590">{open ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}</Box>
        </Flex>
      </Flex>
      <Collapse in={open}>
        <Box pl={{ base: 0, md: 4 }} pr={{ base: 0, md: 2 }} pt={2} pb={3}>
          <VStack spacing={2} align="stretch">
            {section.images.map(function (image) {
              return <ImageSlot key={image.file} image={image} pagePath={pagePath} />;
            })}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}

function Images() {
  var [activePage, setActivePage] = useState(0);
  var currentPage = PAGES[activePage];

  var totalImages = 0;
  currentPage.sections.forEach(function (s) { totalImages += s.images.length; });

  return (
    <Box>
      <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={2}>Design</Text>
      <Text fontSize="md" color="#6B6560" mb={6}>Manage images by page and section.</Text>

      <Flex gap={2} mb={6} flexWrap="wrap">
        {PAGES.map(function (p, i) {
          var isActive = activePage === i;
          var count = 0;
          p.sections.forEach(function (s) { count += s.images.length; });
          return (
            <Button key={p.page} size="sm" borderRadius="8px" bg={isActive ? '#2D2D2D' : 'white'} color={isActive ? 'white' : '#6B6560'} border="1px solid" borderColor={isActive ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setActivePage(i); }} _hover={{ bg: isActive ? '#2D2D2D' : '#F0EDE8' }} fontSize="sm" px={4}>
              {p.page}
              <Badge ml={2} bg={isActive ? 'whiteAlpha.300' : '#F0EDE8'} color={isActive ? 'white' : '#9A9590'} borderRadius="full" px={1.5} fontSize="xs" minW="20px" textAlign="center">{count}</Badge>
            </Button>
          );
        })}
      </Flex>

      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        <Flex px={6} py={4} borderBottom="1px solid" borderColor="#E8E2D8" align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">{currentPage.page}</Text>
            <Badge bg="#F0EDE8" color="#6B6560" borderRadius="full" px={2} py={0.5} fontSize="xs">{totalImages} images</Badge>
          </Flex>
          <Text fontSize="xs" color="#9A9590">{currentPage.sections.length} sections</Text>
        </Flex>
        <Box px={{ base: 2, md: 4 }} py={3}>
          {currentPage.sections.map(function (section) {
            return <PageSection key={section.title} section={section} pagePath={currentPage.path} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Images;
