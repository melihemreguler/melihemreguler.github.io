import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect for critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font loading with font-display swap for faster LCP */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/profile-photo.webp" as="image" type="image/webp" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        <meta name="theme-color" content="#0f0f23" />
        <meta name="description" content="Melih Güler - Backend Developer Portfolio. Specialized in Golang, Java and PostgreSQL." />
        <meta property="og:title" content="Melih Güler - Backend Developer" />
        <meta property="og:description" content="Backend Developer specialized in Golang, Java and PostgreSQL." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Melih Güler - Backend Developer" />
        <meta name="twitter:description" content="Backend Developer specialized in Golang, Java and PostgreSQL." />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
