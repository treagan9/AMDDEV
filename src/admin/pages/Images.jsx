// src/admin/pages/Images.jsx
import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Button,
  Badge,
  useToast,
  Collapse
} from '@chakra-ui/react';
import supabase from '../lib/supabase.jsx';
import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlinePhotograph } from 'react-icons/hi';

var PAGES = [
  {
    page: 'Home',
    sections: [
      { title: 'Hero', description: 'Full-screen centered hero with overlays', images: [
        { name: 'Desktop', file: 'hero-desktop.png', size: '2000 x 1100', path: '/home/' },
        { name: 'Tablet', file: 'hero-tablet.png', size: '1200 x 900', path: '/home/' },
        { name: 'Mobile', file: 'hero-mobile.png', size: '800 x 1200', path: '/home/' }
      ]},
      { title: 'Services Split', description: '50/50 image left, content right', images: [
        { name: 'Square image', file: 'home-services-square.png', size: '1200 x 1200', path: '/home/' }
      ]},
      { title: 'Locations', description: 'Three square cards with warm overlay', images: [
        { name: 'Tampa', file: 'tampa-office-main.png', size: '1200 x 1200', path: '/locations/' },
        { name: 'St. Petersburg', file: 'st-pete.png', size: '1200 x 1200', path: '/locations/' },
        { name: 'Boca Raton', file: 'boca-main.png', size: '1200 x 1200', path: '/locations/' }
      ]},
      { title: 'CTA Banner', description: 'Global CTA background image', images: [
        { name: 'Banner', file: 'cta-inner-banner.png', size: '2000 x 800', path: '/sections/' },
        { name: 'Banner (padded)', file: 'cta-inner-banner-pad.png', size: '2000 x 800', path: '/sections/' }
      ]}
    ]
  },
  {
    page: 'Services',
    sections: [
      { title: 'Hero', description: 'Left-aligned content with right image', images: [
        { name: 'Desktop', file: 'your-doctors-cell-hero-desktop.png', size: '2000 x 1100', path: '/home/' },
        { name: 'Tablet', file: 'your-doctors-cell-hero-ipad.png', size: '1200 x 900', path: '/home/' },
        { name: 'Mobile', file: 'your-doctors-cell-hero-mobile.png', size: '800 x 1200', path: '/home/' }
      ]},
      { title: 'Service Splits', description: '6 alternating 50/50 sections', images: [
        { name: 'Direct Access', file: 'service-access.png', size: '1200 x 1200', path: '/services/' },
        { name: 'Preventive Care', file: 'service-preventive.png', size: '1200 x 1200', path: '/services/' },
        { name: 'House Calls', file: 'service-housecalls.png', size: '1200 x 1200', path: '/services/' },
        { name: 'Executive Health', file: 'service-executive.png', size: '1200 x 1200', path: '/services/' },
        { name: 'Specialist Coordination', file: 'service-coordination.png', size: '1200 x 1200', path: '/services/' },
        { name: 'Travel Medicine', file: 'service-travel.png', size: '1200 x 1200', path: '/services/' }
      ]}
    ]
  },
  {
    page: 'What to Expect',
    sections: [
      { title: 'Hero', description: 'Bottom-aligned content with family image', images: [
        { name: 'Desktop', file: 'what-to-expect-hero-desktop.png', size: '2000 x 1100', path: '/home/' },
        { name: 'Tablet', file: 'what-to-expect-hero-ipad.png', size: '1200 x 900', path: '/home/' },
        { name: 'Mobile', file: 'what-to-expect-hero-mobile.png', size: '800 x 1200', path: '/home/' }
      ]}
    ]
  },
  {
    page: 'Team',
    sections: [
      { title: 'Hero', description: 'Full-screen team hero image', images: [
        { name: 'Desktop', file: 'our-team-hero-desktop.png', size: '2000 x 1100', path: '/home/' },
        { name: 'Tablet', file: 'our-team-hero-ipad.png', size: '1200 x 900', path: '/home/' },
        { name: 'Mobile', file: 'our-team-hero-mobile.png', size: '800 x 1200', path: '/home/' }
      ]},
      { title: 'Physicians', description: 'Alternating editorial spreads', images: [
        { name: 'Dr. Doug Shapiro', file: 'dr-doug-shapiro.png', size: '800 x 1040', path: '/team/' },
        { name: 'Dr. Drew Meriwether', file: 'dr-drew-meriwether.png', size: '800 x 1040', path: '/team/' },
        { name: 'Dr. Divino D\'Alessio', file: 'dr-divino-dalessio.png', size: '800 x 1040', path: '/team/' },
        { name: 'Dr. Ellen Howard', file: 'dr-ellen-howard.png', size: '800 x 1040', path: '/team/' }
      ]},
      { title: 'Staff', description: 'Circular portraits', images: [
        { name: 'Lauren Shapiro', file: 'lauren-shapiro.png', size: '800 x 800', path: '/team/' },
        { name: 'Jamie Barber', file: 'jamie-barber.png', size: '800 x 800', path: '/team/' },
        { name: 'Emma Maddox', file: 'emma-maddox.png', size: '800 x 800', path: '/team/' },
        { name: 'Laura Gore', file: 'laura-gore.png', size: '800 x 800', path: '/team/' },
        { name: 'Sarah Juarez', file: 'sarah-juarez.png', size: '800 x 800', path: '/team/' }
      ]}
    ]
  },
  {
    page: 'Executive',
    sections: [
      { title: 'Hero', description: 'Full-screen executive health hero', images: [
        { name: 'Desktop', file: 'executive-hero-desktop.png', size: '2000 x 1100', path: '/home/' },
        { name: 'Tablet', file: 'executive-hero-desktop-ipad.png', size: '1200 x 900', path: '/home/' },
        { name: 'Mobile', file: 'executive-hero-desktop-mobile.png', size: '800 x 1200', path: '/home/' }
      ]}
    ]
  },
  {
    page: 'Sections',
    sections: [
      { title: 'Why Our Members Stay', description: 'Used across multiple pages', images: [
        { name: 'Desktop', file: 'why-our-members-stay-desktop.png', size: '2000 x 1100', path: '/sections/' },
        { name: 'Tablet', file: 'why-our-members-stay-ipad.png', size: '1200 x 900', path: '/sections/' },
        { name: 'Mobile', file: 'why-our-members-stay-mobile.png', size: '800 x 1200', path: '/sections/' }
      ]}
    ]
  }
];

function ImageSlot({ image }) {
  var [imgError, setImgError] = useState(false);
  var [uploading, setUploading] = useState(false);
  var [uploadedUrl, setUploadedUrl] = useState(null);
  var fileRef = useRef(null);
  var toast = useToast();

  var displayUrl = uploadedUrl || (image.path + image.file);
  var storagePath = image.path.replace(/^\//, '').replace(/\/$/, '') + '/' + image.file;

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
      toast({ title: 'Image uploaded', description: 'Deploy to see changes live.', status: 'success', duration: 3000, position: 'top' });
    } catch (err) {
      toast({ title: 'Upload failed', description: err.message, status: 'error', duration: 4000, position: 'top' });
    }
    setUploading(false);
  }

  return (
    <Flex bg="#FAFAF7" borderRadius="10px" border="1px solid" borderColor="#E8E2D8" overflow="hidden" align="center">
      <Box w="72px" h="72px" flexShrink={0} position="relative" bg="#E8E2D8" overflow="hidden">
        {!imgError ? (
          <Image src={displayUrl} alt={image.name} objectFit="cover" w="100%" h="100%" onError={function () { setImgError(true); }} />
        ) : (
          <Flex w="100%" h="100%" align="center" justify="center"><HiOutlinePhotograph size={18} color="#9A9590" /></Flex>
        )}
      </Box>
      <Flex flex={1} justify="space-between" align="center" px={4} py={2} gap={3} minW="0">
        <Box minW="0">
          <Text fontSize="sm" fontWeight={600} color="#2D2D2D" noOfLines={1}>{image.name}</Text>
          <Text fontSize="xs" color="#9A9590">{image.size} &middot; {image.path}{image.file}</Text>
        </Box>
        <Button onClick={function () { fileRef.current.click(); }} size="xs" bg="white" color="#6B6560" border="1px solid" borderColor="#D5D0C8" borderRadius="6px" _hover={{ bg: '#F0EDE8', borderColor: '#C4A265' }} isLoading={uploading} loadingText="..." flexShrink={0} fontSize="xs" h="28px" px={3}>{imgError ? 'Upload' : 'Replace'}</Button>
      </Flex>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
    </Flex>
  );
}

function PageSection({ section }) {
  var [open, setOpen] = useState(false);
  return (
    <Box mb={1}>
      <Flex align="center" justify="space-between" px={5} py={3} cursor="pointer" onClick={function () { setOpen(!open); }} borderRadius="8px" _hover={{ bg: '#F0EDE8' }} transition="background 0.15s ease">
        <Flex align="center" gap={3}>
          <Text fontSize="md" fontWeight={600} color="#2D2D2D">{section.title}</Text>
          <Badge bg="#F0EDE8" color="#9A9590" borderRadius="full" px={2} py={0.5} fontSize="10px">{section.images.length}</Badge>
        </Flex>
        <Flex align="center" gap={3}>
          <Text fontSize="xs" color="#9A9590" display={{ base: 'none', md: 'block' }}>{section.description}</Text>
          <Box color="#9A9590">{open ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}</Box>
        </Flex>
      </Flex>
      <Collapse in={open}>
        <Box pl={{ base: 2, md: 5 }} pr={{ base: 2, md: 3 }} pt={1} pb={3}>
          <VStack spacing={2} align="stretch">
            {section.images.map(function (image) {
              return <ImageSlot key={image.file} image={image} />;
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
              <Badge ml={2} bg={isActive ? 'whiteAlpha.300' : '#F0EDE8'} color={isActive ? 'white' : '#9A9590'} borderRadius="full" px={1.5} fontSize="xs" minW="18px" textAlign="center">{count}</Badge>
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
        <Box px={{ base: 1, md: 2 }} py={2}>
          {currentPage.sections.map(function (section) {
            return <PageSection key={section.title} section={section} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Images;
