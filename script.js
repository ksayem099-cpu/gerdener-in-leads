// Mobile menu
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

// Footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// Scroll reveal
const targets = document.querySelectorAll('.card, .steps li, .map, .form, .hero-copy');
targets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
targets.forEach(el => io.observe(el));

// Contact form (frontend only): opens the visitor's email app with the details filled in.
// Later, replace this with a fetch() call to your backend or a form service.
const form = document.getElementById('form');
const note = document.getElementById('note');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (!d.name?.trim() || !d.contact?.trim() || !d.consent) {
    note.textContent = 'Please fill in the required fields and tick the consent box.';
    note.className = 'note err';
    return;
  }
  const body = `Name: ${d.name}\nContact: ${d.contact}\n\n${d.message || ''}`;
  location.href = 'mailto:gardenerinleeds@hotmail.com?subject=' +
    encodeURIComponent('Estimate request from ' + d.name) + '&body=' + encodeURIComponent(body);
  note.textContent = 'Thanks! Your email app should open. Please attach any photos.';
  note.className = 'note';
  form.reset();
});

// Respect "reduce motion": stop the leaf flutter too
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('#flutter animate').forEach(a => a.remove());
}
