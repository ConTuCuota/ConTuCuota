/**
 * Script para el menú mejorado y responsive
 */

document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del DOM
  const header = document.querySelector('.header');
  const menuToggle = document.createElement('button');
  const menuOverlay = document.createElement('div');
  const nav = document.querySelector('.header nav');
  
  // Configurar botón de menú móvil
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  header.appendChild(menuToggle);
  
  // Configurar overlay para menú móvil
  menuOverlay.className = 'menu-overlay';
  document.body.appendChild(menuOverlay);
  
  // Función para alternar el menú móvil
  function toggleMenu() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Gestionar accesibilidad y scroll
    if (menuToggle.classList.contains('active')) {
      menuToggle.setAttribute('aria-label', 'Cerrar menú');
      document.body.style.overflow = 'hidden'; // Prevenir scroll cuando el menú está abierto
    } else {
      menuToggle.setAttribute('aria-label', 'Abrir menú');
      document.body.style.overflow = ''; // Restaurar scroll
    }
  }
  
  // Eventos para abrir/cerrar menú
  menuToggle.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);
  
  // Cerrar menú al hacer clic en un enlace (en móvil)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768 && nav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
  
  // Efecto de scroll en el header
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Inicializar estado de scroll
  handleScroll();
  
  // Evento de scroll
  window.addEventListener('scroll', handleScroll);
  
  // Gestionar resize de ventana
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      toggleMenu(); // Cerrar menú si se cambia a vista desktop
    }
  });
  
  // Marcar enlace activo según la página actual
  const currentPage = window.location.pathname.split('/').pop();
  
  nav.querySelectorAll('a').forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (currentPage === '' && linkPage === 'index.html') {
      link.classList.add('active');
    } else if (currentPage === linkPage) {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && linkPage === 'index.html') {
      link.classList.add('active');
    }
  });
});
