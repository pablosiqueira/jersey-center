import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from '../components/TopBar/TopBar';
import FooterInfo from '../components/Footer/FooterInfo';
import classes from '../styles/Home.module.css'
import SSRProvider from 'react-bootstrap/SSRProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <SSRProvider>
      <div className={classes.home} id='homeDiv'>
        <TopBar />

          <Component {...pageProps} /> 

        <FooterInfo />
      </div>
    </SSRProvider>
    </>
  )
}

export default MyApp
