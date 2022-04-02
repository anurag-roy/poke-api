import lume from 'https://deno.land/x/lume@v1.7.2/mod.ts';
import codeHighlight from 'https://deno.land/x/lume@v1.7.2/plugins/code_highlight.ts';
import jsx from 'https://deno.land/x/lume@v1.7.2/plugins/jsx.ts';

const site = lume(
  {},
  {
    markdown: {
      options: {
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
      },
    },
  },
);

site.ignore('README.md');

site
  .copy('/assets/css/style.css')
  .copy('/assets/css/hljs.css')
  .copy('/assets/logo/favicon.ico')
  .copy('/assets/logo/logo.webp');

site.use(codeHighlight()).use(jsx());

// Seed README with metadata and create a temporary index.README
site.addEventListener('beforeBuild', async () => {
  const readMeFrontMatter = [
    '---',
    'layout: layout.tsx',
    'title: "Poké API"',
    '---',
  ];

  const readMe = await Deno.readTextFile('./README.md');
  const newReadMe = readMeFrontMatter.join('\n') + '\n' + readMe;
  await Deno.writeTextFile('./index.md', newReadMe);
});

site.addEventListener('afterBuild', async () => {
  await Deno.remove('./index.md');
});

export default site;
