// src/admin/pages/ContentEditor.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  Badge,
  useToast,
  Collapse
} from '@chakra-ui/react';
import useAuth from '../lib/useAuth.jsx';
import supabase from '../lib/supabase.jsx';
import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineCheck, HiOutlinePencil } from 'react-icons/hi';

var inputStyles = {
  bg: '#FAFAF7', border: '1px solid', borderColor: '#D5D0C8', borderRadius: '8px',
  fontSize: 'md', color: '#2D2D2D', h: '48px', px: 4,
  _placeholder: { color: '#9B9488' }, _hover: { borderColor: '#C4A265' },
  _focus: { borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }
};

var PAGES = [
  {
    page: 'home', label: 'Home',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading line 1', type: 'text' },
        { key: 'headingAccent', label: 'Heading line 2 (champagne)', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' },
        { key: 'cta', label: 'Primary button', type: 'text' },
        { key: 'ctaLink', label: 'Primary button link', type: 'text' },
        { key: 'secondaryCta', label: 'Secondary link text', type: 'text' },
        { key: 'secondaryLink', label: 'Secondary link URL', type: 'text' }
      ]},
      { section: 'promo', label: 'Promo Banner', fields: [
        { key: 'text', label: 'Banner text', type: 'text' }
      ]},
      { section: 'about', label: 'About / Team Arc', fields: [
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' },
        { key: 'cta', label: 'Primary button', type: 'text' },
        { key: 'ctaLink', label: 'Primary button link', type: 'text' },
        { key: 'secondaryCta', label: 'Secondary button', type: 'text' },
        { key: 'secondaryLink', label: 'Secondary button link', type: 'text' }
      ]},
      { section: 'services', label: 'Services Split', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' },
        { key: 'cta', label: 'Button text', type: 'text' },
        { key: 'ctaLink', label: 'Button link', type: 'text' }
      ]},
      { section: 'howItWorks', label: 'How It Works', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' }
      ]},
      { section: 'whyUs', label: 'Why Our Members Stay', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' }
      ]},
      { section: 'testimonials', label: 'Testimonials', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' }
      ]},
      { section: 'locations', label: 'Locations', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading', type: 'text' }
      ]}
    ]
  },
  {
    page: 'services', label: 'Services',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading line 1', type: 'text' },
        { key: 'headingAccent', label: 'Heading line 2 (champagne)', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' },
        { key: 'cta', label: 'Primary button', type: 'text' },
        { key: 'ctaLink', label: 'Primary button link', type: 'text' },
        { key: 'secondaryCta', label: 'Secondary link text', type: 'text' },
        { key: 'secondaryLink', label: 'Secondary link URL', type: 'text' }
      ]},
      { section: 'stats', label: 'Stats', fields: [] }
    ]
  },
  {
    page: 'newPatients', label: 'What to Expect',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading line 1', type: 'text' },
        { key: 'headingAccent', label: 'Heading line 2 (champagne)', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' },
        { key: 'cta', label: 'Primary button', type: 'text' },
        { key: 'ctaLink', label: 'Primary button link', type: 'text' }
      ]}
    ]
  },
  {
    page: 'team', label: 'Team',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading line 1', type: 'text' },
        { key: 'headingAccent', label: 'Heading line 2 (champagne)', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' },
        { key: 'cta', label: 'Primary button', type: 'text' },
        { key: 'ctaLink', label: 'Primary button link', type: 'text' }
      ]}
    ]
  },
  {
    page: 'executive', label: 'Executive',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading line 1', type: 'text' },
        { key: 'headingAccent', label: 'Heading line 2 (champagne)', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' },
        { key: 'cta', label: 'Primary button', type: 'text' },
        { key: 'ctaLink', label: 'Primary button link', type: 'text' }
      ]}
    ]
  },
  {
    page: 'pricing', label: 'Pricing',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' }
      ]}
    ]
  },
  {
    page: 'faq', label: 'FAQ',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' }
      ]}
    ]
  },
  {
    page: 'insurance', label: 'Insurance',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' }
      ]}
    ]
  },
  {
    page: 'stories', label: 'Stories',
    sections: [
      { section: 'hero', label: 'Hero', fields: [
        { key: 'label', label: 'Top label', type: 'text' },
        { key: 'heading', label: 'Heading line 1', type: 'text' },
        { key: 'headingAccent', label: 'Heading line 2 (champagne)', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' }
      ]}
    ]
  },
  {
    page: 'contact', label: 'Contact',
    sections: [
      { section: 'info', label: 'Contact Info', fields: [
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'body', label: 'Body text', type: 'textarea' }
      ]}
    ]
  }
];

function SectionEditor({ pageKey, sectionConfig, teamMember }) {
  var [open, setOpen] = useState(false);
  var [content, setContent] = useState(null);
  var [saving, setSaving] = useState(false);
  var [saved, setSaved] = useState(false);
  var [dirty, setDirty] = useState(false);
  var toast = useToast();

  useEffect(function () {
    supabase.from('page_content').select('*').eq('page', pageKey).eq('section', sectionConfig.section).single().then(function (result) {
      setContent(result.data ? result.data.content : {});
    });
  }, [pageKey, sectionConfig.section]);

  function handleChange(key, value) {
    setContent(function (prev) { var u = Object.assign({}, prev); u[key] = value; return u; });
    setDirty(true);
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    var result = await supabase.from('page_content').upsert({ page: pageKey, section: sectionConfig.section, content: content, updated_by: teamMember ? teamMember.id : null }, { onConflict: 'page,section' });
    if (result.error) {
      toast({ title: 'Save failed', description: result.error.message, status: 'error', duration: 4000, position: 'top' });
    } else {
      setSaved(true);
      setDirty(false);
    }
    setSaving(false);
    setTimeout(function () { setSaved(false); }, 3000);
  }

  if (sectionConfig.fields.length === 0 || !content) return null;

  return (
    <Box mb={2}>
      <Flex align="center" justify="space-between" px={5} py={3} cursor="pointer" onClick={function () { setOpen(!open); }} borderRadius="8px" _hover={{ bg: '#F0EDE8' }} transition="background 0.15s ease">
        <Flex align="center" gap={3}>
          <Text fontSize="md" fontWeight={600} color="#2D2D2D">{sectionConfig.label}</Text>
          <Badge bg="#F0EDE8" color="#9A9590" borderRadius="full" px={2} py={0.5} fontSize="10px">{sectionConfig.fields.length}</Badge>
          {dirty && <Flex w="6px" h="6px" borderRadius="full" bg="#C4A265" flexShrink={0} />}
          {saved && <HiOutlineCheck size={14} color="#22C55E" />}
        </Flex>
        <Box color="#9A9590">{open ? <HiOutlineChevronUp size={16} /> : <HiOutlineChevronDown size={16} />}</Box>
      </Flex>
      <Collapse in={open}>
        <Box px={5} pt={2} pb={4}>
          <VStack spacing={4} align="stretch">
            {sectionConfig.fields.map(function (field) {
              var value = content[field.key] || '';
              return (
                <Box key={field.key}>
                  <Text fontSize="sm" fontWeight={500} color="#2D2D2D" mb={2}>{field.label}</Text>
                  {field.type === 'textarea' ? (
                    <Textarea value={value} onChange={function (e) { handleChange(field.key, e.target.value); }} rows={3} resize="vertical" bg="#FAFAF7" border="1px solid" borderColor="#D5D0C8" borderRadius="8px" fontSize="md" color="#2D2D2D" px={4} py={3} _placeholder={{ color: '#9B9488' }} _focus={{ borderColor: '#C4A265', boxShadow: '0 0 0 1px #C4A265' }} />
                  ) : (
                    <Input value={value} onChange={function (e) { handleChange(field.key, e.target.value); }} {...inputStyles} />
                  )}
                </Box>
              );
            })}
            <Flex justify="flex-end" pt={2}>
              <Button onClick={save} size="sm" bg={dirty ? '#1B3A34' : '#E8E2D8'} color={dirty ? 'white' : '#9A9590'} borderRadius="8px" _hover={dirty ? { bg: '#234840' } : {}} isLoading={saving} loadingText="Saving..." leftIcon={dirty ? <HiOutlinePencil size={14} /> : <HiOutlineCheck size={14} />} isDisabled={!dirty}>{saved ? 'Saved' : 'Save changes'}</Button>
            </Flex>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}

function ContentEditor() {
  var [activePage, setActivePage] = useState(0);
  var { teamMember } = useAuth();
  var currentPage = PAGES[activePage];

  return (
    <Box>
      <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700} color="#2D2D2D" mb={2}>Content</Text>
      <Text fontSize="md" color="#6B6560" mb={6}>Edit text across the site. Changes appear on the next page load.</Text>
      <Flex gap={2} mb={6} flexWrap="wrap">
        {PAGES.map(function (p, i) {
          var isActive = activePage === i;
          return (
            <Button key={p.page} size="sm" borderRadius="8px" bg={isActive ? '#2D2D2D' : 'white'} color={isActive ? 'white' : '#6B6560'} border="1px solid" borderColor={isActive ? '#2D2D2D' : '#E8E2D8'} onClick={function () { setActivePage(i); }} _hover={{ bg: isActive ? '#2D2D2D' : '#F0EDE8' }} fontSize="sm" px={4}>{p.label}</Button>
          );
        })}
      </Flex>
      <Box bg="white" borderRadius="18px" border="1px solid" borderColor="#E8E2D8" overflow="hidden">
        <Flex px={6} py={4} borderBottom="1px solid" borderColor="#E8E2D8" align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Text fontFamily="heading" fontSize="lg" fontWeight={700} color="#2D2D2D">{currentPage.label}</Text>
            <Badge bg="#F0EDE8" color="#6B6560" borderRadius="full" px={2} py={0.5} fontSize="xs">{currentPage.sections.length} sections</Badge>
          </Flex>
        </Flex>
        <Box px={{ base: 1, md: 2 }} py={2}>
          {currentPage.sections.map(function (section) {
            return <SectionEditor key={section.section} pageKey={currentPage.page} sectionConfig={section} teamMember={teamMember} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ContentEditor;
