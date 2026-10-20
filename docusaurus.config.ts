import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeFootnotes from './plugins/rehype-footnotes.cjs';

export default {
  title: 'Digital4Better Open Methodology',
  tagline: 'Comprendre et évaluer les impacts environnementaux du numérique',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://digital4better.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/methodology/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'digital4better', // Usually your GitHub org/user name.
  projectName: 'methodology', // Usually your repo name.

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'fr',
    locales: ['en', 'fr'],
  },
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          lastVersion: 'v1',
          versions: {
            v1: {label: 'v1', path: '', banner: 'none'},
            current: {label: 'v2 beta', path: 'v2-beta', banner: 'none'},
          },
          editUrl: 'https://github.com/digital4better/methodology/tree/feature/v2',
          remarkPlugins: [remarkMath],
          rehypePlugins: [() => rehypeKatex({trust: true, strict: "ignore"}), rehypeFootnotes],
          routeBasePath: '/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-8BWD3G06FF',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    navbar: {
      title: 'Open Methodology',
      logo: {
        alt: 'Digital4Better',
        src: 'img/digital4better-wordmark.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://digital4better.github.io/data',
          label: 'Open Data',
          position: 'right',
        },
        {
          href: 'https://github.com/digital4better/methodology',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Digital4Better. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  themes: ['@docusaurus/theme-mermaid'],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
} satisfies Config;
