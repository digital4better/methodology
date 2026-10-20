// Translate native GFM footnotes at build time, keeping archived v1 output intact.
module.exports = function footnotes() {
  return (tree, file) => {
    const path = String(file.path || '').replaceAll('\\', '/');
    if (path.includes('/versioned_docs/') || path.includes('/version-v1/')) return;
    const french = !path.includes('/i18n/en/');
    const visit = (node) => {
      const props = node.properties || {};
      if (props.dataFootnotes !== undefined) {
        props.className = [...(props.className || []), 'd4b-footnotes'];
      }
      if (props.id === 'footnote-label') {
        node.children = [{ type: 'text', value: french ? 'Notes de bas de page' : 'Footnotes' }];
        // Keep the heading visible as well as usable by assistive technology.
        props.className = (props.className || []).filter(name => name !== 'sr-only');
      }
      if (french && props.dataFootnoteBackref !== undefined) {
        const number = String(props.ariaLabel || '').match(/\d+(?:-\d+)?/)?.[0];
        props.ariaLabel = `Retour à l’appel de note${number ? ` ${number}` : ''}`;
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
};
