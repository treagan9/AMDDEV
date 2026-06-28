// src/admin/pages/Images.jsx
import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
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
    page: 'Home', sections: [
      { title: 'Hero', type: 'hero', description: 'Full viewport, centered content, gradient overlays', images: [
        { name: 'Desktop', file: 'hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'hero-tablet.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'hero-mobile.png', size: '800x1200', path: '/home/' }
      ]},
      { title: 'Promo Banner', type: 'banner', description: 'Champagne strip', images: [] },
      { title: 'Team Arc', type: 'content', description: 'Circular portraits in arc formation', images: [] },
      { title: 'Services Split', type: 'split', description: '50/50 image left, content right', images: [
        { name: 'Square', file: 'home-services-square.png', size: '1200x1200', path: '/home/' }
      ]},
      { title: 'How It Works', type: 'bg-image', description: '4 steps over background image', images: [
        { name: 'Desktop', file: 'why-our-members-stay-desktop.png', size: '2000x1100', path: '/sections/' },
        { name: 'Tablet', file: 'why-our-members-stay-ipad.png', size: '1200x900', path: '/sections/' },
        { name: 'Mobile', file: 'why-our-members-stay-mobile.png', size: '800x1200', path: '/sections/' }
      ]},
      { title: 'Why Us', type: 'cards', description: '2x2 card grid', images: [] },
      { title: 'Testimonials', type: 'content', description: 'Horizontal scroll quotes', images: [] },
      { title: 'Locations', type: 'grid', description: '3 square cards with overlay', images: [
        { name: 'Tampa', file: 'tampa-office-main.png', size: '1200x1200', path: '/locations/' },
        { name: 'St. Pete', file: 'st-pete.png', size: '1200x1200', path: '/locations/' },
        { name: 'Boca', file: 'boca-main.png', size: '1200x1200', path: '/locations/' }
      ]},
      { title: 'CTA', type: 'cta', description: 'Global CTA banner', images: [
        { name: 'Banner', file: 'cta-inner-banner.png', size: '2000x800', path: '/sections/' }
      ]}
    ]
  },
  {
    page: 'Services', sections: [
      { title: 'Hero', type: 'hero', description: 'Left-aligned content, right image', images: [
        { name: 'Desktop', file: 'your-doctors-cell-hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'your-doctors-cell-hero-ipad.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'your-doctors-cell-hero-mobile.png', size: '800x1200', path: '/home/' }
      ]},
      { title: 'Stats', type: 'content', description: 'Mist pill with 4 numbers', images: [] },
      { title: 'Service Splits', type: 'alternating', description: '6 alternating 50/50 sections', images: [
        { name: 'Direct Access', file: 'service-access.png', size: '1200x1200', path: '/services/' },
        { name: 'Preventive', file: 'service-preventive.png', size: '1200x1200', path: '/services/' },
        { name: 'House Calls', file: 'service-housecalls.png', size: '1200x1200', path: '/services/' },
        { name: 'Executive', file: 'service-executive.png', size: '1200x1200', path: '/services/' },
        { name: 'Coordination', file: 'service-coordination.png', size: '1200x1200', path: '/services/' },
        { name: 'Travel', file: 'service-travel.png', size: '1200x1200', path: '/services/' }
      ]},
      { title: 'FAQ', type: 'content', description: 'Accordion', images: [] },
      { title: 'CTA', type: 'cta', description: 'Mist pill', images: [] }
    ]
  },
  {
    page: 'What to Expect', sections: [
      { title: 'Hero', type: 'hero', description: 'Bottom-aligned content', images: [
        { name: 'Desktop', file: 'what-to-expect-hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'what-to-expect-hero-ipad.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'what-to-expect-hero-mobile.png', size: '800x1200', path: '/home/' }
      ]}
    ]
  },
  {
    page: 'Team', sections: [
      { title: 'Hero', type: 'hero', description: 'Team group photo', images: [
        { name: 'Desktop', file: 'our-team-hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'our-team-hero-ipad.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'our-team-hero-mobile.png', size: '800x1200', path: '/home/' }
      ]},
      { title: 'Physicians', type: 'portraits', description: '4 editorial spreads', images: [
        { name: 'Dr. Shapiro', file: 'dr-doug-shapiro.png', size: '800x1040', path: '/team/' },
        { name: 'Dr. Meriwether', file: 'dr-drew-meriwether.png', size: '800x1040', path: '/team/' },
        { name: 'Dr. D\'Alessio', file: 'dr-divino-dalessio.png', size: '800x1040', path: '/team/' },
        { name: 'Dr. Howard', file: 'dr-ellen-howard.png', size: '800x1040', path: '/team/' }
      ]},
      { title: 'Staff', type: 'circles', description: 'Circular portraits', images: [
        { name: 'Lauren', file: 'lauren-shapiro.png', size: '800x800', path: '/team/' },
        { name: 'Jamie', file: 'jamie-barber.png', size: '800x800', path: '/team/' },
        { name: 'Emma', file: 'emma-maddox.png', size: '800x800', path: '/team/' },
        { name: 'Laura', file: 'laura-gore.png', size: '800x800', path: '/team/' },
        { name: 'Sarah', file: 'sarah-juarez.png', size: '800x800', path: '/team/' }
      ]}
    ]
  },
  {
    page: 'Executive', sections: [
      { title: 'Hero', type: 'hero', description: 'Executive health hero', images: [
        { name: 'Desktop', file: 'executive-hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'executive-hero-desktop-ipad.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'executive-hero-desktop-mobile.png', size: '800x1200', path: '/home/' }
      ]}
    ]
  },
  {
    page: 'Locations', sections: [
      { title: 'Tampa Gallery', type: 'gallery', description: 'Office photos', images: [
        { name: 'Main', file: 'tampa-office-main.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 1', file: 'tampa-office-1.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 2', file: 'tampa-office-2.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 3', file: 'tampa-office-3.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 4', file: 'tampa-office-4.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 5', file: 'tampa-office-5.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 6', file: 'tampa-office-6.png', size: '1200x1200', path: '/locations/' }
      ]},
      { title: 'St. Pete', type: 'content', description: 'Location page', images: [
        { name: 'Main', file: 'st-pete.png', size: '1200x1200', path: '/locations/' }
      ]},
      { title: 'Boca Raton', type: 'content', description: 'Location page', images: [
        { name: 'Main', file: 'boca-main.png', size: '1200x1200', path: '/locations/' }
      ]}
    ]
  }
];

var typeColors = {
  hero: { bg: '#2D2D2D', color: 'white', h: '80px' },
  banner: { bg: '#C4A265', color: 'white', h: '28px' },
  split: { bg: '#F0EDE8', color: '#2D2D2D', h: '60px' },
  'bg-image': { bg: '#E8E2D8', color: '#2D2D2D', h: '60px' },
  cards: { bg: '#FAFAF7', color: '#2D2D2D', h: '50px' },
  content: { bg: 'white', color: '#6B6560', h: '40px' },
  grid: { bg: '#F0EDE8', color: '#2D2D2D', h: '50px' },
  cta: { bg: '#F0EDE8', color: '#2D2D2D', h: '40px' },
  alternating: { bg: '#FAFAF7', color: '#2D2D2D', h: '60px' },
  portraits: { bg: 'white', color: '#6B6560', h: '50px' },
  circles: { bg: '#FAFAF7', color: '#6B6560', h: '40px' },
  gallery: { bg: '#E8E2D8', color: '#2D2D2D', h: '50px' }
};

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
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      var r = await supabase.storage.from('site-images').upload(storagePath, file, { upsert: true });
      if (r.error) throw r.error;
      var u = supabase.storage.from('site-images').getPublicUrl(storagePath);
      setUploadedUrl(u.data.publicUrl + '?t=' + Date.now());
      setImgError(false);
      toast({ title: 'Uploaded', status: 'success', duration: 2000, position: 'top' });
    } catch (err) { toast({ title: 'Failed', description: err.message, status: 'error', duration: 3000, position: 'top' }); }
    setUploading(false);
  }

  return (
    <Box cursor="pointer" onClick={function () { fileRef.current.click(); }} role="group" position="relative">
      <Flex w="100%" h="56px" borderRadius="8px" overflow="hidden" bg="#E8E2D8" align="center" border="1px solid" borderColor="#E8E2D8" _groupHover={{ borderColor: '#C4A265' }} transition="border-color 0.2s ease">
        <Box w="56px" h="56px" flexShrink={0} overflow="hidden" bg="#D5D0C8">
          {!imgError ? <Image src={displayUrl} alt={image.name} objectFit="cover" w="100%" h="100%" onError={function () { setImgError(true); }} /> : <Flex w="100%" h="100%" align="center" justify="center"><HiOutlinePhotograph size={16} color="#9A9590" /></Flex>}
        </Box>
        <Flex flex={1} px={3} align="center" justify="space-between" bg="white" h="100%">
          <Box minW="0"><Text fontSize="xs" fontWeight={600} color="#2D2D2D" noOfLines={1}>{image.name}</Text><Text fontSize="10px" color="#9A9590">{image.size}</Text></Box>
          <Text fontSize="10px" color={uploading ? '#C4A265' : '#B5AD9E'} flexShrink={0}>{uploading ? 'Uploading...' : 'Click to replace'}</Text>
        </Flex>
      </Flex>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
    </Box>
  );
}

function PageVisual({ page }) {
  var [expandedSection, setExpandedSection] = useState(null);

  return (
    <Box>
      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        <Box px={6} py={4} borderBottom="1px solid" borderColor="#E8E2D8">
          <Flex align="center" justify="space-between">
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">{page.page}</Text>
            <Text fontSize="xs" color="#9A9590">{page.sections.length} sections</Text>
          </Flex>
        </Box>

        <Box px={4} py={3}>
          <VStack spacing={1} align="stretch">
            {page.sections.map(function (section, i) {
              var style = typeColors[section.type] || typeColors.content;
              var isExpanded = expandedSection === i;
              var hasImages = section.images && section.images.length > 0;

              return (
                <Box key={section.title}>
                  <Flex align="center" h={style.h} bg={style.bg} borderRadius="8px" px={4} cursor={hasImages ? 'pointer' : 'default'} onClick={hasImages ? function () { setExpandedSection(isExpanded ? null : i); } : undefined} _hover={hasImages ? { opacity: 0.9 } : {}} transition="opacity 0.15s ease" position="relative" overflow="hidden">
                    <Flex align="center" gap={2} flex={1}>
                      <Text fontSize="xs" fontWeight={600} color={style.color} opacity={0.8}>{section.title}</Text>
                      {hasImages && (
                        <Badge bg={section.type === 'hero' ? 'whiteAlpha.200' : '#E8E2D8'} color={section.type === 'hero' ? 'white' : '#6B6560'} borderRadius="full" px={1.5} fontSize="9px">{section.images.length}</Badge>
                      )}
                    </Flex>
                    <Flex align="center" gap={2}>
                      <Text fontSize="10px" color={style.color} opacity={0.5}>{section.description}</Text>
                      {hasImages && <Box color={style.color} opacity={0.5}>{isExpanded ? <HiOutlineChevronUp size={14} /> : <HiOutlineChevronDown size={14} />}</Box>}
                    </Flex>
                  </Flex>
                  {hasImages && (
                    <Collapse in={isExpanded}>
                      <Box py={2} pl={2} pr={1}>
                        <SimpleGrid columns={{ base: 1, md: section.images.length <= 3 ? section.images.length : 3 }} spacing={2}>
                          {section.images.map(function (image) {
                            return <ImageSlot key={image.file} image={image} />;
                          })}
                        </SimpleGrid>
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

function Images() {
  var [activePage, setActivePage] = useState(0);

  return (
    <Box>
      <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={2}>Design</Text>
      <Text fontSize="md" color="#6B6560" mb={6}>Visual page layouts with image management. Click a section to manage its images.</Text>

      <Flex gap={2} mb={6} flexWrap="wrap">
        {PAGES.map(function (p, i) {
          var isActive = activePage === i;
          var imgCount = 0;
          p.sections.forEach(function (s) { imgCount += (s.images || []).length; });
          return (
            <Button key={p.page} size="sm" borderRadius="8px" bg={isActive ? '#2D2D2D' : 'white'} color={isActive ? 'white' : '#6B6560'} border="1px solid" borderColor={isActive ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setActivePage(i); }} _hover={{ bg: isActive ? '#2D2D2D' : '#F0EDE8' }} fontSize="sm" px={4}>
              {p.page}
              {imgCount > 0 && <Badge ml={2} bg={isActive ? 'whiteAlpha.300' : '#F0EDE8'} color={isActive ? 'white' : '#9A9590'} borderRadius="full" px={1.5} fontSize="xs">{imgCount}</Badge>}
            </Button>
          );
        })}
      </Flex>

      <PageVisual page={PAGES[activePage]} />
    </Box>
  );
}

export default Images;
EOFcat > src/admin/pages/Images.jsx << 'EOF'
// src/admin/pages/Images.jsx
import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  SimpleGrid,
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
    page: 'Home', sections: [
      { title: 'Hero', type: 'hero', description: 'Full viewport, centered content, gradient overlays', images: [
        { name: 'Desktop', file: 'hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'hero-tablet.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'hero-mobile.png', size: '800x1200', path: '/home/' }
      ]},
      { title: 'Promo Banner', type: 'banner', description: 'Champagne strip', images: [] },
      { title: 'Team Arc', type: 'content', description: 'Circular portraits in arc formation', images: [] },
      { title: 'Services Split', type: 'split', description: '50/50 image left, content right', images: [
        { name: 'Square', file: 'home-services-square.png', size: '1200x1200', path: '/home/' }
      ]},
      { title: 'How It Works', type: 'bg-image', description: '4 steps over background image', images: [
        { name: 'Desktop', file: 'why-our-members-stay-desktop.png', size: '2000x1100', path: '/sections/' },
        { name: 'Tablet', file: 'why-our-members-stay-ipad.png', size: '1200x900', path: '/sections/' },
        { name: 'Mobile', file: 'why-our-members-stay-mobile.png', size: '800x1200', path: '/sections/' }
      ]},
      { title: 'Why Us', type: 'cards', description: '2x2 card grid', images: [] },
      { title: 'Testimonials', type: 'content', description: 'Horizontal scroll quotes', images: [] },
      { title: 'Locations', type: 'grid', description: '3 square cards with overlay', images: [
        { name: 'Tampa', file: 'tampa-office-main.png', size: '1200x1200', path: '/locations/' },
        { name: 'St. Pete', file: 'st-pete.png', size: '1200x1200', path: '/locations/' },
        { name: 'Boca', file: 'boca-main.png', size: '1200x1200', path: '/locations/' }
      ]},
      { title: 'CTA', type: 'cta', description: 'Global CTA banner', images: [
        { name: 'Banner', file: 'cta-inner-banner.png', size: '2000x800', path: '/sections/' }
      ]}
    ]
  },
  {
    page: 'Services', sections: [
      { title: 'Hero', type: 'hero', description: 'Left-aligned content, right image', images: [
        { name: 'Desktop', file: 'your-doctors-cell-hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'your-doctors-cell-hero-ipad.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'your-doctors-cell-hero-mobile.png', size: '800x1200', path: '/home/' }
      ]},
      { title: 'Stats', type: 'content', description: 'Mist pill with 4 numbers', images: [] },
      { title: 'Service Splits', type: 'alternating', description: '6 alternating 50/50 sections', images: [
        { name: 'Direct Access', file: 'service-access.png', size: '1200x1200', path: '/services/' },
        { name: 'Preventive', file: 'service-preventive.png', size: '1200x1200', path: '/services/' },
        { name: 'House Calls', file: 'service-housecalls.png', size: '1200x1200', path: '/services/' },
        { name: 'Executive', file: 'service-executive.png', size: '1200x1200', path: '/services/' },
        { name: 'Coordination', file: 'service-coordination.png', size: '1200x1200', path: '/services/' },
        { name: 'Travel', file: 'service-travel.png', size: '1200x1200', path: '/services/' }
      ]},
      { title: 'FAQ', type: 'content', description: 'Accordion', images: [] },
      { title: 'CTA', type: 'cta', description: 'Mist pill', images: [] }
    ]
  },
  {
    page: 'What to Expect', sections: [
      { title: 'Hero', type: 'hero', description: 'Bottom-aligned content', images: [
        { name: 'Desktop', file: 'what-to-expect-hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'what-to-expect-hero-ipad.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'what-to-expect-hero-mobile.png', size: '800x1200', path: '/home/' }
      ]}
    ]
  },
  {
    page: 'Team', sections: [
      { title: 'Hero', type: 'hero', description: 'Team group photo', images: [
        { name: 'Desktop', file: 'our-team-hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'our-team-hero-ipad.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'our-team-hero-mobile.png', size: '800x1200', path: '/home/' }
      ]},
      { title: 'Physicians', type: 'portraits', description: '4 editorial spreads', images: [
        { name: 'Dr. Shapiro', file: 'dr-doug-shapiro.png', size: '800x1040', path: '/team/' },
        { name: 'Dr. Meriwether', file: 'dr-drew-meriwether.png', size: '800x1040', path: '/team/' },
        { name: 'Dr. D\'Alessio', file: 'dr-divino-dalessio.png', size: '800x1040', path: '/team/' },
        { name: 'Dr. Howard', file: 'dr-ellen-howard.png', size: '800x1040', path: '/team/' }
      ]},
      { title: 'Staff', type: 'circles', description: 'Circular portraits', images: [
        { name: 'Lauren', file: 'lauren-shapiro.png', size: '800x800', path: '/team/' },
        { name: 'Jamie', file: 'jamie-barber.png', size: '800x800', path: '/team/' },
        { name: 'Emma', file: 'emma-maddox.png', size: '800x800', path: '/team/' },
        { name: 'Laura', file: 'laura-gore.png', size: '800x800', path: '/team/' },
        { name: 'Sarah', file: 'sarah-juarez.png', size: '800x800', path: '/team/' }
      ]}
    ]
  },
  {
    page: 'Executive', sections: [
      { title: 'Hero', type: 'hero', description: 'Executive health hero', images: [
        { name: 'Desktop', file: 'executive-hero-desktop.png', size: '2000x1100', path: '/home/' },
        { name: 'Tablet', file: 'executive-hero-desktop-ipad.png', size: '1200x900', path: '/home/' },
        { name: 'Mobile', file: 'executive-hero-desktop-mobile.png', size: '800x1200', path: '/home/' }
      ]}
    ]
  },
  {
    page: 'Locations', sections: [
      { title: 'Tampa Gallery', type: 'gallery', description: 'Office photos', images: [
        { name: 'Main', file: 'tampa-office-main.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 1', file: 'tampa-office-1.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 2', file: 'tampa-office-2.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 3', file: 'tampa-office-3.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 4', file: 'tampa-office-4.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 5', file: 'tampa-office-5.png', size: '1200x1200', path: '/locations/' },
        { name: 'Photo 6', file: 'tampa-office-6.png', size: '1200x1200', path: '/locations/' }
      ]},
      { title: 'St. Pete', type: 'content', description: 'Location page', images: [
        { name: 'Main', file: 'st-pete.png', size: '1200x1200', path: '/locations/' }
      ]},
      { title: 'Boca Raton', type: 'content', description: 'Location page', images: [
        { name: 'Main', file: 'boca-main.png', size: '1200x1200', path: '/locations/' }
      ]}
    ]
  }
];

var typeColors = {
  hero: { bg: '#2D2D2D', color: 'white', h: '80px' },
  banner: { bg: '#C4A265', color: 'white', h: '28px' },
  split: { bg: '#F0EDE8', color: '#2D2D2D', h: '60px' },
  'bg-image': { bg: '#E8E2D8', color: '#2D2D2D', h: '60px' },
  cards: { bg: '#FAFAF7', color: '#2D2D2D', h: '50px' },
  content: { bg: 'white', color: '#6B6560', h: '40px' },
  grid: { bg: '#F0EDE8', color: '#2D2D2D', h: '50px' },
  cta: { bg: '#F0EDE8', color: '#2D2D2D', h: '40px' },
  alternating: { bg: '#FAFAF7', color: '#2D2D2D', h: '60px' },
  portraits: { bg: 'white', color: '#6B6560', h: '50px' },
  circles: { bg: '#FAFAF7', color: '#6B6560', h: '40px' },
  gallery: { bg: '#E8E2D8', color: '#2D2D2D', h: '50px' }
};

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
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      var r = await supabase.storage.from('site-images').upload(storagePath, file, { upsert: true });
      if (r.error) throw r.error;
      var u = supabase.storage.from('site-images').getPublicUrl(storagePath);
      setUploadedUrl(u.data.publicUrl + '?t=' + Date.now());
      setImgError(false);
      toast({ title: 'Uploaded', status: 'success', duration: 2000, position: 'top' });
    } catch (err) { toast({ title: 'Failed', description: err.message, status: 'error', duration: 3000, position: 'top' }); }
    setUploading(false);
  }

  return (
    <Box cursor="pointer" onClick={function () { fileRef.current.click(); }} role="group" position="relative">
      <Flex w="100%" h="56px" borderRadius="8px" overflow="hidden" bg="#E8E2D8" align="center" border="1px solid" borderColor="#E8E2D8" _groupHover={{ borderColor: '#C4A265' }} transition="border-color 0.2s ease">
        <Box w="56px" h="56px" flexShrink={0} overflow="hidden" bg="#D5D0C8">
          {!imgError ? <Image src={displayUrl} alt={image.name} objectFit="cover" w="100%" h="100%" onError={function () { setImgError(true); }} /> : <Flex w="100%" h="100%" align="center" justify="center"><HiOutlinePhotograph size={16} color="#9A9590" /></Flex>}
        </Box>
        <Flex flex={1} px={3} align="center" justify="space-between" bg="white" h="100%">
          <Box minW="0"><Text fontSize="xs" fontWeight={600} color="#2D2D2D" noOfLines={1}>{image.name}</Text><Text fontSize="10px" color="#9A9590">{image.size}</Text></Box>
          <Text fontSize="10px" color={uploading ? '#C4A265' : '#B5AD9E'} flexShrink={0}>{uploading ? 'Uploading...' : 'Click to replace'}</Text>
        </Flex>
      </Flex>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
    </Box>
  );
}

function PageVisual({ page }) {
  var [expandedSection, setExpandedSection] = useState(null);

  return (
    <Box>
      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        <Box px={6} py={4} borderBottom="1px solid" borderColor="#E8E2D8">
          <Flex align="center" justify="space-between">
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">{page.page}</Text>
            <Text fontSize="xs" color="#9A9590">{page.sections.length} sections</Text>
          </Flex>
        </Box>

        <Box px={4} py={3}>
          <VStack spacing={1} align="stretch">
            {page.sections.map(function (section, i) {
              var style = typeColors[section.type] || typeColors.content;
              var isExpanded = expandedSection === i;
              var hasImages = section.images && section.images.length > 0;

              return (
                <Box key={section.title}>
                  <Flex align="center" h={style.h} bg={style.bg} borderRadius="8px" px={4} cursor={hasImages ? 'pointer' : 'default'} onClick={hasImages ? function () { setExpandedSection(isExpanded ? null : i); } : undefined} _hover={hasImages ? { opacity: 0.9 } : {}} transition="opacity 0.15s ease" position="relative" overflow="hidden">
                    <Flex align="center" gap={2} flex={1}>
                      <Text fontSize="xs" fontWeight={600} color={style.color} opacity={0.8}>{section.title}</Text>
                      {hasImages && (
                        <Badge bg={section.type === 'hero' ? 'whiteAlpha.200' : '#E8E2D8'} color={section.type === 'hero' ? 'white' : '#6B6560'} borderRadius="full" px={1.5} fontSize="9px">{section.images.length}</Badge>
                      )}
                    </Flex>
                    <Flex align="center" gap={2}>
                      <Text fontSize="10px" color={style.color} opacity={0.5}>{section.description}</Text>
                      {hasImages && <Box color={style.color} opacity={0.5}>{isExpanded ? <HiOutlineChevronUp size={14} /> : <HiOutlineChevronDown size={14} />}</Box>}
                    </Flex>
                  </Flex>
                  {hasImages && (
                    <Collapse in={isExpanded}>
                      <Box py={2} pl={2} pr={1}>
                        <SimpleGrid columns={{ base: 1, md: section.images.length <= 3 ? section.images.length : 3 }} spacing={2}>
                          {section.images.map(function (image) {
                            return <ImageSlot key={image.file} image={image} />;
                          })}
                        </SimpleGrid>
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

function Images() {
  var [activePage, setActivePage] = useState(0);

  return (
    <Box>
      <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={2}>Design</Text>
      <Text fontSize="md" color="#6B6560" mb={6}>Visual page layouts with image management. Click a section to manage its images.</Text>

      <Flex gap={2} mb={6} flexWrap="wrap">
        {PAGES.map(function (p, i) {
          var isActive = activePage === i;
          var imgCount = 0;
          p.sections.forEach(function (s) { imgCount += (s.images || []).length; });
          return (
            <Button key={p.page} size="sm" borderRadius="8px" bg={isActive ? '#2D2D2D' : 'white'} color={isActive ? 'white' : '#6B6560'} border="1px solid" borderColor={isActive ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setActivePage(i); }} _hover={{ bg: isActive ? '#2D2D2D' : '#F0EDE8' }} fontSize="sm" px={4}>
              {p.page}
              {imgCount > 0 && <Badge ml={2} bg={isActive ? 'whiteAlpha.300' : '#F0EDE8'} color={isActive ? 'white' : '#9A9590'} borderRadius="full" px={1.5} fontSize="xs">{imgCount}</Badge>}
            </Button>
          );
        })}
      </Flex>

      <PageVisual page={PAGES[activePage]} />
    </Box>
  );
}

export default Images;
