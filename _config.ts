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

site.preprocess(['.md'], (page) => {
    page.data.layout = 'layout.tsx';
    page.data.title = 'Poké API | A fast, simple Pokédex API';
    page.data.description =
        'Get Pokémon data and images, single Pokémon by national pokédex index, Pokémon of the day - all served from the edge via Deno Deploy.';
    page.dest.path = 'index';
    page.dest.ext = '.html';
});

site
    .copy('/assets/css/style.css')
    .copy('/assets/css/hljs.css')
    .copy('/assets/logo/favicon.ico')
    .copy('/assets/logo/logo.webp');

site.use(codeHighlight()).use(jsx());

export default site;
