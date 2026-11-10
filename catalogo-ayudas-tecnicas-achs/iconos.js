// Íconos de línea (24x24) de cada familia y de la interfaz. Los usan los dos diseños.
window.IC = {
  silla: '<circle cx="10" cy="17" r="4.5"/><path d="M7 4h2.5l1.5 7h6l2 5"/><path d="M11 11l-1.5-5"/><circle cx="8.2" cy="2.6" r=".1"/><path d="M17 16h3"/>',
  ducha: '<path d="M4 21V7a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3"/><path d="M8 10h6"/><path d="M9 13v1M12 13v2M15 13v1M10.5 16v1M13.5 16v1"/><path d="M17 11v10M20 11v10M17 15h3"/>',
  cama: '<path d="M3 6v13M3 15h18v4"/><path d="M3 12h18"/><rect x="5" y="9" width="4" height="3" rx="1"/><path d="M21 12v-3"/>',
  cojin: '<path d="M5 8c2-2 12-2 14 0c1.5 2 1.5 6 0 8c-2 2-12 2-14 0c-1.5-2-1.5-6 0-8z"/><path d="M8 12h8"/>',
  sillon: '<path d="M6 11V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4"/><path d="M4 11a2 2 0 0 1 2 2v2h12v-2a2 2 0 1 1 2 2v3H4v-3a2 2 0 0 1 0-4z"/><path d="M6 18v2M18 18v2"/>',
  postura: '<circle cx="12" cy="4" r="2"/><path d="M12 6v8M8 9l4 1l4-1M12 14l-3 6M12 14l3 6"/><path d="M6 21h12"/>',
  pie: '<path d="M8 3v9c0 2-2 3-2 5a3 3 0 0 0 3 3h8c1.5 0 2-1 2-2c0-2-4-2-6-4V3"/><path d="M8 7h5"/>',
  pulmon: '<path d="M12 3v8M12 11l-3 2M12 11l3 2"/><path d="M8 7c-3 1-5 5-5 10c0 2 1 3 3 3c2 0 3-1 3-3V8z"/><path d="M16 7c3 1 5 5 5 10c0 2-1 3-3 3c-2 0-3-1-3-3V8z"/>',
  ojo: '<path d="M2 12s3.5-6 10-6s10 6 10 6s-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  habla: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  lupa: '<circle cx="10" cy="10" r="6"/><path d="M15 15l5 5"/><circle cx="8" cy="9" r=".6"/><circle cx="12" cy="9" r=".6"/><circle cx="8" cy="12" r=".6"/>',
  pulsador: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
  notebook: '<rect x="4" y="5" width="16" height="11" rx="1"/><path d="M2 19h20"/>',
  buscar: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  prev: '<path d="M15 6l-6 6l6 6"/>',
  next: '<path d="M9 6l6 6l-6 6"/>',
  check: '<path d="M5 12l5 5l10-10"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 12v6M9.5 15.5L12 18l2.5-2.5"/>',
  copiar: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'
};
window.svg = function (k, w) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.8) +
    '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[k] || '') + '</svg>';
};
window.clp = function (n) { return '$' + Math.round(n).toLocaleString('es-CL').replace(/,/g, '.'); };
window.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
