import {useEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';
import NavbarMobileSidebar from '@theme-original/Navbar/MobileSidebar';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';

/** Preserve Docusaurus navigation while adding the drawer's Escape shortcut. */
export default function MobileSidebar() {
  const {shown, toggle} = useNavbarMobileSidebar();
  const {pathname} = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (shown) toggle();
  }, [pathname, shown, toggle]);

  useEffect(() => {
    if (!shown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      event.preventDefault();
      toggle();
      requestAnimationFrame(() => {
        document.querySelector<HTMLButtonElement>('.navbar__toggle')?.focus();
      });
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shown, toggle]);

  return <NavbarMobileSidebar />;
}
