// Coursework — shared front-end behavior (static demo, no backend)
document.addEventListener('DOMContentLoaded', () => {

  // Mobile sidebar toggle
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== hamburger) {
        sidebar.classList.remove('open');
      }
    });
  }

  // Password show/hide toggles
  document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.input-group').querySelector('input');
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      btn.textContent = showing ? 'SHOW' : 'HIDE';
    });
  });

  // Generic tab strips
  document.querySelectorAll('.tab-strip').forEach(strip => {
    const buttons = strip.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetSel = btn.dataset.target;
        if (!targetSel) return;
        const group = document.querySelectorAll('[data-tab-panel]');
        group.forEach(panel => {
          panel.style.display = ('#' + panel.id === targetSel) ? '' : 'none';
        });
      });
    });
  });

  // Demo form validation: show inline error, then continue to the next page
  document.querySelectorAll('form[data-demo-redirect]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const errorBox = form.querySelector('.form-error');
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach(f => { if (!f.value.trim()) ok = false; });
      if (!ok) {
        if (errorBox) { errorBox.textContent = 'Please fill in all required fields.'; errorBox.classList.add('show'); }
        return;
      }
      if (errorBox) errorBox.classList.remove('show');
      window.location.href = form.dataset.demoRedirect;
    });
  });

  // Animate progress bars on load
  document.querySelectorAll('.progress-fill[data-value]').forEach(bar => {
    const val = bar.dataset.value;
    requestAnimationFrame(() => { bar.style.width = val + '%'; });
  });

});
