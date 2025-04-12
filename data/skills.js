import {
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaPython,
  FaNodeJs,
  FaGitAlt,
  FaLinux,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiOdoo,
  SiNextdotjs,
} from 'react-icons/si';

const skills = [
  {
    icon: <FaJs color="#f0db4f" />,
    title: 'JavaScript',
    description: 'Versatile programming language used for dynamic client-side interactions and backend development.',
  },
  {
    icon: <FaCss3Alt color="#264de4" />,
    title: 'CSS',
    description: 'Styling language used to create visually engaging, responsive web interfaces.',
  },
  {
    icon: <FaHtml5 color="#e34c26" />,
    title: 'HTML',
    description: 'Markup language forming the structure of all web pages.',
  },
  {
    icon: <SiMongodb color="#4DB33D" />,
    title: 'MongoDB',
    description: 'NoSQL database used for flexible, JSON-like document storage in modern web apps.',
  },
  {
    icon: <SiPostgresql color="#336791" />,
    title: 'PostgreSQL',
    description: 'Advanced open-source relational database system with powerful query features.',
  },
  {
    icon: <FaPython color="#306998" />,
    title: 'Python',
    description: 'High-level programming language known for readability, automation, and data processing.',
  },
  {
    icon: <SiExpress color="#000000" />,
    title: 'ExpressJS',
    description: 'Fast Node.js web framework used to build RESTful APIs and server-side apps.',
  },
  {
    icon: <FaNodeJs color="#3C873A" />,
    title: 'NodeJS',
    description: 'JavaScript runtime for building fast, scalable network applications.',
  },
  {
    icon: <SiOdoo color="#714B67" />,
    title: 'Odoo',
    description: 'Comprehensive open-source ERP platform used for building business applications.',
  },
  {
    icon: <SiNextdotjs color="#000000" />,
    title: 'NextJS',
    description: 'React-based framework for building SEO-friendly, server-rendered web applications.',
  },
  {
    icon: <FaGitAlt color="#F05032" />,
    title: 'Git',
    description: 'Distributed version control system for managing and tracking code changes.',
  },
  {
    icon: <FaLinux color="#FCC624" />,
    title: 'Ubuntu',
    description: 'Popular Linux-based OS used for development and server deployments.',
  },
];

export default skills;
