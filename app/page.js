'use client';

import emailjs from '@emailjs/browser';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useTheme } from '../context/ThemeContext';
import projects from '../data/projects';
import skills from '../data/skills';
import experiences from '../data/experiences';

import WorkExperience from '@/components/WorkExperience/WorkExperiance';
import styles from '../styles/Home.module.css';
import '../styles/global.css';

import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt
} from 'react-icons/fa';

import {
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
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
};

const Section = styled('section')(({ theme }) => ({
  padding: '4rem 2rem',
  backgroundColor: '#f9f9f9',
  [theme.breakpoints.up('sm')]: { padding: '6rem 4rem' },
}));

const SectionHeading = styled(Typography)({
  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
        textAlign: 'center',
        fontWeight: 700,
        letterSpacing: '-0.5px',
        color: 'var(--text-primary)',
        marginBottom: '3.5rem',
        lineHeight: 1.2,
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

const Input = styled(TextField)({
  marginBottom: '1.5rem',
  borderRadius: '8px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ddd' },
    '&:hover fieldset': { borderColor: '#0073e6' },
    '& label': { color: '#ffffff' },
    '& placeholder': { color: '#ffffff' },
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: '#0073e6',
  marginTop: '1rem',
  color: '#fff',
  padding: '0.8rem 1.5rem',
  borderRadius: '8px',
  width: '100%',
  '&:hover': { backgroundColor: '#005bb5' },
});

// Alert wrapper
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// Contact Info Component
function ContactInfo({ isDark }) {
  return (
    <CardBox
      sx={{
        backgroundColor: isDark ? '#121212' : '#fafafa',
        color: isDark ? '#bbb' : '#444',
  
        padding: '1.5rem 1.8rem',      // reduced padding
      }}
    >

      
      <Typography
        variant="h6"
        gutterBottom
        fontWeight={700}
        sx={{ letterSpacing: '0.05em', color: isDark ? '#eee' : '#222', mb: 1.5 }}  // smaller bottom margin
      >
         Contact Information:
      </Typography>

      {[{
        href: 'mailto:macayanwren@gmail.com',
        icon: <FaEnvelope style={{ marginRight: 8, fontSize: 18, color: '#0073e6' }} />,
        text: 'macayanwren@gmail.com'
      }, {
        href: 'tel:+639060063929',
        icon: <FaPhoneAlt style={{ marginRight: 8, fontSize: 18, color: '#0073e6' }} />,
        text: '+63 906 006 3929'
      }, {
        href: 'https://www.linkedin.com/in/wrenmcyn/',
        icon: <FaLinkedin style={{ marginRight: 8, fontSize: 18, color: '#0073e6' }} />,
        text: 'LinkedIn'
      }, {
        href: 'https://github.com/hnddrx',
        icon: <FaGithub style={{ marginRight: 8, fontSize: 18, color: '#0073e6' }} />,
        text: 'GitHub'
      }].map(({ href, icon, text }) => (
        <ContactItem
          key={text}
          sx={{ 
            fontWeight: 300,
            marginBottom: '0.8rem',     // tighter vertical spacing
            fontSize: '0.95rem',
          }}
        >
          <Link
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              color: isDark ? '#bbb' : '#0073e6',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.3s ease',
              '&:hover': { color: isDark ? '#fff' : '#005bb5' },
              fontSize: 'inherit',
            }}
          >
            {icon}
            {text}
          </Link>
        </ContactItem>
      ))}
    </CardBox>
  );
}


// Contact Form Component
function ContactForm({ formData, handleChange, handleSubmit, isDark }) {
  return (
    <CardBox
      sx={{
        backgroundColor: isDark ? '#121212' : '#fafafa',
        color: isDark ? '#bbb' : '#444',
        
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        fontWeight={400}
        sx={{ letterSpacing: '0.05em', color: isDark ? '#eee' : '#222', mb: 3 }}
      >
        Get In Touch:
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          sx={{
            '& label': { color: isDark ? '#aaa' : '#666' },
            '& .MuiOutlinedInput-root': {
              color: isDark ? '#ddd' : '#333',
              '& fieldset': {
                borderColor: isDark ? '#444' : '#ccc',
                borderRadius: 3,
              },
              '&:hover fieldset': {
                borderColor: '#0073e6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0073e6',
                borderWidth: 2,
              },
            },
          }}
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
          sx={{
            '& label': { color: isDark ? '#aaa' : '#666' },
            '& .MuiOutlinedInput-root': {
              color: isDark ? '#ddd' : '#333',
              '& fieldset': {
                borderColor: isDark ? '#444' : '#ccc',
                borderRadius: 3,
              },
              '&:hover fieldset': {
                borderColor: '#0073e6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0073e6',
                borderWidth: 2,
              },
            },
          }}
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
          sx={{
            '& label': { color: isDark ? '#aaa' : '#666' },
            '& .MuiOutlinedInput-root': {
              color: isDark ? '#ddd' : '#333',
              '& fieldset': {
                borderColor: isDark ? '#444' : '#ccc',
                borderRadius: 3,
              },
              '&:hover fieldset': {
                borderColor: '#0073e6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0073e6',
                borderWidth: 2,
              },
            },
          }}
        />

        <SubmitButton
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#0073e6',
            '&:hover': { bgcolor: '#005bb5' },
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 3,
            py: 1.5,
            mt: 2,
          }}
        >
          Send Message
        </SubmitButton>
      </form>
    </CardBox>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_p9rwddi', // Your EmailJS Service ID
        'template_3g1xdci', // Your EmailJS Template ID
        formData,
        'er57-VUb-cWBsMCcf' // Your EmailJS Public Key
      )
      .then(() => {
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
          Building smart solutions with <strong>Odoo</strong>, crafting dynamic apps with{' '}
          <strong>MERN</strong>, and engineering with <strong>Python</strong>.
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
      <section id="about" className={styles.section} data-aos="fade">
        <h2 className={styles.sectionHeading}>About Me</h2>

        <div className={styles.glassCard}>
          <p className={isDark ? styles.text : styles.textlight}>
            Hi, I’m <strong>Wren</strong> — a full-stack developer fluent in turning caffeine into code. From elegant front-ends with <strong>React</strong> to robust back-ends with <strong>Node</strong>, <strong>Python</strong>, and <strong>PostgreSQL</strong>, I build solutions that are as scalable as they are sleek. <br /><br />
            Need an Odoo wizard or a Mongo whisperer? I speak both. Let’s make something brilliant — and ship it.
          </p>
        </div>
      </section>

      <Section id="work-experience" data-aos="fade" sx={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
        <SectionHeading variant="h4">
          Work Experience
        </SectionHeading>
        <WorkExperience experiences={experiences} isDark={isDark} />
      </Section>


      {/* SKILLS */}
      <section id="skills" className={styles.section} data-aos="fade">
        <h2 className={styles.sectionHeading}>Skills</h2>
        <div className={styles.skillGrid}>
          {skills.map((skill, i) => (
            <Tooltip key={i} title={skill.title} arrow>
              <div className={styles.skillCard} data-aos="fade-up">
                <span className={`${styles.skillIcon} ${isDark ? styles.iconDark : ''}`}>{skill.icon}</span>
              </div>
            </Tooltip>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={styles.section} data-aos="fade">
        <h2 className={styles.sectionHeading}>Past Project Experience</h2>
        <h3 className={styles.sectionSubHeading}>
          Explore the projects I&apos;ve worked on so far
        </h3>

        <div className={styles.projectGrid}>
          {projects.map((project, i) => (
            <div
              key={i}
              className={styles.projectCard}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              data-aos-duration="800"
            >
              {/* PREVIEW */}
                {project.url ? (
                  <div className={styles.previewWrapper}>
                    <div className={styles.previewInner}>
                      <iframe
                        src={project.url}
                        title={project.title}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                        className={styles.previewIframe}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.previewFallback}>
                    <span>🚧</span>
                    <p>Demo is shy.<br />Ask it nicely.</p>
                  </div>
                )}
                
              {/* TITLE */}
              <h3 className={styles.projectTitle}>{project.title}</h3>

              {/* DESCRIPTION */}
              <p className={isDark ? styles.text : styles.textlight}>
                {project.description}
              </p>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'flex-start',
                  gap: 2,
                  mt: 2,
                  flexWrap: 'wrap',
                }}
              >
                {/* ACTION BUTTONS */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {project.url && (
                    <Tooltip title="View Live" arrow>
                      <Button
                        variant="outlined"
                        color="primary"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          minWidth: 36,
                          p: '6px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <LaunchIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  )}

                  {project.repo && (
                    <Tooltip title="GitHub Repo" arrow>
                      <Button
                        variant="outlined"
                        color="primary"
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          minWidth: 36,
                          p: '6px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <GitHubIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  )}
                </Box>

                {/* TOOLS */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.tools?.map((tool, index) => (
                    <Tooltip key={index} title={tool} arrow>
                      <Box
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '16px',
                          backgroundColor: isDark
                            ? 'rgba(255,255,255,0.06)'
                            : 'rgba(0,0,0,0.03)',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: isDark ? '#ddd' : '#444',
                          transition: 'background 0.3s ease',
                        }}
                      >
                        {tool}
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </div>
          ))}
        </div>
      </section>



      {/* CONTACT */}
      <Section
      id="contact"
      data-aos="fade"
      sx={{
        backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
        py: 8, // optional: adds vertical padding
        px: 2, // optional: adds horizontal padding
      }}
    >
      <SectionHeading variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Contact
      </SectionHeading>

      <ContactContainer
        data-aos="fade-up"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <ContactInfo isDark={isDark} />
        <ContactForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isDark={isDark}
        />
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
  );
}
