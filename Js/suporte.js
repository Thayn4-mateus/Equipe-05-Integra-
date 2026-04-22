function selectTab(tab) {
  // Remove active de todos os cards
  document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
 
  const panelId = 'panel-' + tab.dataset.panel;
 
  // Abre o painel correspondente e fecha os demais
  document.querySelectorAll('.faq-panel').forEach(p => {
    p.classList.toggle('open', p.id === panelId);
  });
}
 