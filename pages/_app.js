import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default App;
