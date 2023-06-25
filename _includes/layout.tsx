interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactChildren;
}

export default ({ title, description, children }: LayoutProps) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <meta name='description' content={description} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content='https://pokepi.deno.dev/' />
      <meta property='og:site_name' content='Poké API' />
      <meta
        property='og:image'
        content='https://repository-images.githubusercontent.com/407828918/c9f248cb-02f5-4d1e-93f6-7ce002be6c8a'
      />
      <meta property='og:image:width' content='1280' />
      <meta property='og:image:height' content='640' />
      <meta property='og:image:type' content='image/png' />
      <meta
        name='twitter:image:src'
        content='https://repository-images.githubusercontent.com/407828918/c9f248cb-02f5-4d1e-93f6-7ce002be6c8a'
      />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@anurag__roy' />

      <title>{title}</title>
      <link rel='dns-prefetch' href='https://fonts.googleapis.com/' />
      <link rel='stylesheet' href='assets/css/style.css' />
      <link rel='stylesheet' href='assets/css/hljs.css' />
      <link rel='icon' href='assets/logo/favicon.ico' />
    </head>
    <body>
      <main>
        <>
          <a
            className='view-source'
            href='https://github.com/anurag-roy/poke-api'
            target='_blank'
            title='View source on GitHub'
          >
            <svg width='32' height='32' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z'
              />
            </svg>
          </a>
          {children}
        </>
      </main>
    </body>
  </html>
);
