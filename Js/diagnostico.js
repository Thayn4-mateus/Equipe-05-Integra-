function toggleMenu() {
    const nl = document.querySelector('.nav-links');
    const open = nl.style.display === 'flex';
    nl.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:white;padding:20px 5%;border-bottom:1px solid rgba(0,0,0,.08);gap:18px;box-shadow:0 8px 24px rgba(0,0,0,.08);z-index:199;';
  }