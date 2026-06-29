// src/admin/lib/emailTemplates.js

var TEMPLATES = [
  {
    slug: 'welcome',
    name: 'Welcome Series',
    category: 'Automated',
    description: 'Sent automatically when someone subscribes.',
    icon: 'wave',
    color: '#22C55E'
  },
  {
    slug: 'accepting-members',
    name: 'Now Accepting',
    category: 'Acquisition',
    description: 'Core enrollment campaign across all locations.',
    icon: 'door',
    color: '#C4A265'
  },
  {
    slug: 'service-spotlight',
    name: 'Service Spotlight',
    category: 'Educational',
    description: 'Deep dive into a single service offering.',
    icon: 'spotlight',
    color: '#6B6560'
  },
  {
    slug: 'patient-story',
    name: 'Patient Story',
    category: 'Social Proof',
    description: 'Feature a member testimonial.',
    icon: 'quote',
    color: '#1B3A34'
  },
  {
    slug: 'health-tip',
    name: 'Health Tip',
    category: 'Educational',
    description: 'Seasonal wellness advice with optional PDF.',
    icon: 'heart',
    color: '#E85D5D'
  },
  {
    slug: 'limited-availability',
    name: 'Limited Spots',
    category: 'Urgency',
    description: 'Enrollment closing or waitlist opening.',
    icon: 'clock',
    color: '#D97706'
  },
  {
    slug: 'meet-team',
    name: 'Meet the Team',
    category: 'Relationship',
    description: 'Physician spotlight with photo and bio.',
    icon: 'person',
    color: '#2D2D2D'
  },
  {
    slug: 'newsletter',
    name: 'Newsletter',
    category: 'Digest',
    description: 'Monthly update with multiple sections.',
    icon: 'paper',
    color: '#4A4540'
  },
  {
    slug: 'event-invite',
    name: 'Event Invite',
    category: 'Event',
    description: 'Open house, health talk or community event.',
    icon: 'calendar',
    color: '#7C3AED'
  }
];

export default TEMPLATES;
