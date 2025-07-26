document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(evt) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      evt.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});
