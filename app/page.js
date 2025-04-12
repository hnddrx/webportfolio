'use client';
import emailjs from '@emailjs/browser';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useTheme } from '../context/ThemeContext';
import projects from '../data/projects';
import skills from '../data/skills';

import styles from '../styles/Home.module.css';
import '../styles/global.css';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Folder, ExternalLink } from 'lucide-react';

import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt
} from 'react-icons/fa';

import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link
} from '@mui/material';

import { styled } from '@mui/system';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80 },
  },
};

// Styled Components
const Section = styled('section')(({ theme }) => ({
  padding: '4rem 2rem',
  backgroundColor: '#f9f9f9',
  [theme.breakpoints.up('sm')]: { padding: '6rem 4rem' },
}));

const SectionHeading = styled(Typography)({
  fontWeight: 700,
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#333',
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

const ContactContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '2rem',
});

const CardBox = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: 500,
  background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const ContactItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1.5rem',
  fontSize: '1.1rem',
  color: '#555',
  '& a': {
    textDecoration: 'none',
    color: '#0073e6',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#005bb5',
    },
  },
});

const Input = styled(TextField)(({
  marginBottom: '1.5rem',
  borderRadius: '8px',
  
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ddd',
    },
    '&:hover fieldset': {
      borderColor: '#0073e6',
    },
    '& label': {
      color: '#ffffff',
    },
    '& placeholder': {
      color: '#ffffff',
    },
  },
}));

const SubmitButton = styled(Button)(({
  backgroundColor: '#0073e6',
  marginTop: '1rem',
  color: '#fff',
  padding: '0.8rem 1.5rem',
  borderRadius: '8px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#005bb5',
  },
}));

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs.send(
      'service_p9rwddi', // Replace with your actual EmailJS Service ID
      'template_3g1xdci', // Replace with your EmailJS Template ID
      formData,
      'er57-VUb-cWBsMCcf' // Replace with your EmailJS Public Key
    )
    .then((result) => {
      setSnackbarSeverity('success');
      setSnackbarMessage('Message sent successfully!');
      setSnackbarOpen(true);
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      setSnackbarSeverity('error');
      setSnackbarMessage('Something went wrong. Please try again later.');
      setSnackbarOpen(true);
      console.error('EmailJS Error:', error);
    });
  };

  return (
    
   /*  <body style={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}> */
    <main className={`${styles.page} ${isDark ? styles.dark : styles.light}`}>
      {/* HERO SECTION */}
      <motion.section
        id="hero"
        className={styles.hero}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.heroTitle} variants={childVariants}>
          Hey, I&apos;m Wren Macayan
        </motion.h1>
        <motion.p className={styles.heroSubtitle} variants={childVariants}>
          Building smart solutions with <strong>Odoo</strong>, crafting dynamic apps with <strong>MERN</strong>, and engineering with <strong>Python</strong>.
        </motion.p>

        <motion.a
          href="#contact"
          className={styles.ctaButton}
          variants={childVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let&apos;s Connect
        </motion.a>
      </motion.section>

      {/* ABOUT */}
      <section id="about" className={styles.section} data-aos="fade-up">
        <h2 className={styles.sectionHeading}>About Me</h2>
        <div className={styles.glassCard}>
          <p className={`${isDark ? styles.text : styles.textlight}`}>
            Hello, I&apos;m Wren – a seasoned full-stack developer with expertise in PostgreSQL, Python, XML, Odoo, MongoDB, ReactJS, ExpressJS, and NodeJS. Let’s collaborate and turn your innovative ideas into cutting-edge solutions!
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={styles.section} data-aos="fade-up">
        <h2 className={styles.sectionHeading}>Skills</h2>
        <div className={styles.skillGrid}>
          {skills.map((skill, i) => (
            <div key={i} className={styles.skillCard}>
              <span className={`${styles.skillIcon} ${isDark ? styles.iconDark : ''}`}>{skill.icon}</span>
            </div>
          ))}
        </div>
      </section>
      {/* PROJECTS */}
      <section id="projects" className={styles.section} data-aos="fade-up">
        <h2 className={styles.sectionHeading}>Projects</h2>
        <div className={styles.projectGrid}>
          {projects.map((project, i) => (
            <div key={i} className={styles.projectCard}>
              <h3>{project.icon} {project.title}</h3>
              <p className={`${isDark ? styles.text : styles.textlight}`}>{project.description}</p>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                  marginTop: 2,
                  alignItems: { xs: 'stretch', sm: 'center' },
                  flexWrap: 'wrap',
                }}
              >
                {project.url && (
                  <Tooltip title="View Live">
                    <Button
                      variant="outlined"
                      color="primary"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ flexShrink: 0, minWidth: '36px', padding: '6px' }}
                    >
                      <LaunchIcon fontSize="small" />
                    </Button>
                  </Tooltip>
                )}

                {project.repo && (
                  <Tooltip title="GitHub Repo">
                    <Button
                      variant="outlined"
                      color="primary"
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ flexShrink: 0, minWidth: '36px', padding: '6px' }}
                    >
                      <GitHubIcon fontSize="small" />
                    </Button>
                  </Tooltip>
                )}

                <Box
                  className={styles.toolsWrapper}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    marginTop: { xs: 1, sm: 0 },
                  }}
                >
                  {project.tools?.map((tool, j) => (
                    <span key={j} className={styles.projectTool}>
                      {tool}
                    </span>
                  ))}
                </Box>
              </Box>

            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <Section id="contact" data-aos="fade-up" sx={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
        <SectionHeading variant="h4" sx={{ color: isDark ? '#f9f9f9' : '#0a0a0a' }}>
          Contact
        </SectionHeading>
        <ContactContainer >
          {/* Contact Links */}
          <CardBox sx={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Reach out to me:
            </Typography>
            <ContactItem>
              <Link href="mailto:wren@hris.com">
                <FaEnvelope style={{ marginRight: '8px' }} />
                macayanwren@gmail.com
              </Link>
            </ContactItem>
            <ContactItem>
              <Link href="tel:+1234567890">
                <FaPhoneAlt style={{ marginRight: '8px' }} />
                +63 906 006 3929
              </Link>
            </ContactItem>
            <ContactItem>
              <Link href="https://www.linkedin.com/in/wrenmcyn/" target="_blank">
                <FaLinkedin style={{ marginRight: '8px' }} />
                LinkedIn
              </Link>
            </ContactItem>
            <ContactItem>
              <Link href="https://github.com/hnddrx" target="_blank">
                <FaGithub style={{ marginRight: '8px' }} />
                GitHub
              </Link>
            </ContactItem>
          </CardBox>
          {/* Form */}
          <CardBox sx={{ backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Get In Touch:
            </Typography>
            <form onSubmit={handleSubmit}>
              <Input
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
              <Input
                label="Message"
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
              <SubmitButton type="submit">Send Message</SubmitButton>
            </form>
          </CardBox>
        </ContactContainer>
      </Section>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
    /* </body> */
  );
}
