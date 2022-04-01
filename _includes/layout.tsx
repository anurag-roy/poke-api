interface LayoutProps {
  title: string;
  children: React.ReactChildren;
}

export default ({ title, children }: LayoutProps) => (
  <html>
    <head>
      <title>{title}</title>
      <link rel="stylesheet" href="assets/css/style.css" />
      <link rel="stylesheet" href="assets/css/hljs.css" />
      <link rel="icon" href="assets/logo/favicon.ico" />
    </head>
    <body>
      <main>{children}</main>
    </body>
  </html>
);
