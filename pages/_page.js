import { ThemeProvider } from '../context/ThemeContext';  // Make sure this import is correct
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  console.log('Components', Component, pageProps)
  return (
    <ThemeProvider>  {/* Wrap the Component with ThemeProvider */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
