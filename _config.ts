import type { Page } from 'lume/core/filesystem.ts';
import lume from 'lume/mod.ts';
import codeHighlight from 'lume/plugins/code_highlight.ts';
import jsx from 'lume/plugins/jsx.ts';

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
  }
);

site.preprocess(['.md'], (page: Page) => {
  page.data.layout = 'layout.tsx';
  page.data.title = 'Poké API | A fast, simple Pokédex API';
  page.data.description =
    'Get Pokémon data and images, single Pokémon by national pokédex index, Pokémon of the day - all served from the edge via Deno Deploy.';
  page.data.url = 'index.html';
});

site
  .copy('/assets/css/style.css')
  .copy('/assets/css/hljs.css')
  .copy('/assets/logo/favicon.ico')
  .copy('/assets/logo/logo.webp');

site.use(codeHighlight()).use(jsx());

export default site;
