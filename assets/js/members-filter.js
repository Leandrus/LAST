/**
 * members-filter.js
 * 
 * Gestiona el sistema de filtrado de los perfiles dinámicos de los pilotos del equipo:
 * - Lee la nacionalidad y estado (Activo/Retirado) del DOM de forma dinámica.
 * - Genera botones de filtro según los datos detectados.
 * - Aplica filtrado animado de los miembros mostrados en la grilla sin depender de librerías de terceros (Vanilla JS + jQuery simple).
 */
// Filtrado de Miembros del Equipo
$(document).ready(function () {
  var $members = $('.team-item').parent('.col-lg-3');
  var nationalities = {};
  var statusCounts = { 'Todos': 0, 'Activo': 0, 'Inactivo': 0 };

  // Analizar cada miembro para obtener estado y nacionalidad
  $members.each(function () {
    var $this = $(this);
    var isRetired = $this.find('.stat-retired').length > 0;
    var statusCat = isRetired ? 'Inactivo' : 'Activo';

    // Agregar propiedades al elemento DOM para filtrado rapido
    $this.data('status', statusCat);
    statusCounts['Todos']++;
    statusCounts[statusCat]++;

    var $flagImg = $this.find('img[src*="flagcdn.com"]');
    if ($flagImg.length > 0) {
      var nat = $flagImg.attr('alt');
      var natSrc = $flagImg.attr('src');
      $this.data('nat', nat);
      if (!nationalities[nat]) {
        nationalities[nat] = { count: 0, src: natSrc };
      }
      nationalities[nat].count++;
    }
  });

  // Generar HTML para los filtros
  var filterHtml = `
    <div class="filter-controls">
      <div class="btn-group mb-3" role="group" aria-label="Status Filter">
        <button type="button" class="btn btn-outline-light filter-active filter-btn status-btn" data-filter-type="status" data-filter-value="Todos">Todos</button>
        <button type="button" class="btn btn-outline-light filter-btn status-btn" data-filter-type="status" data-filter-value="Activo">Activo</button>
        <button type="button" class="btn btn-outline-light filter-btn status-btn" data-filter-type="status" data-filter-value="Inactivo">Inactivo</button>
      </div>
      <br/>
      <div class="btn-group flex-wrap" role="group" aria-label="Nationality Filter">
        <button type="button" class="btn btn-outline-light filter-active filter-btn" data-filter-type="nat" data-filter-value="Todos">🌍</button>
  `;

  for (var nat in nationalities) {
    var data = nationalities[nat];
    filterHtml += `<button type="button" class="btn btn-outline-light filter-btn" data-filter-type="nat" data-filter-value="${nat}"><img src="${data.src}" class="flag-icon" alt="${nat}"> (${data.count})</button>`;
  }

  filterHtml += `
      </div>
    </div>
  `;

  $('#members-filter-container').html(filterHtml);

  // Logica de Filtrado
  var currentStatusFilter = 'Todos';
  var currentNatFilter = 'Todos';

  $('.filter-btn').on('click', function () {
    var $btn = $(this);
    var fType = $btn.data('filter-type');
    var fVal = $btn.data('filter-value');

    // Actualizar UI del boton basado en su grupo
    $btn.siblings().removeClass('filter-active');
    $btn.addClass('filter-active');

    // Actualizar variables de estado
    if (fType === 'status') {
      currentStatusFilter = fVal;
    } else if (fType === 'nat') {
      currentNatFilter = fVal;
    }

    // Aplicar filtro
    $members.hide().filter(function () {
      var $item = $(this);
      var itemStatus = $item.data('status');
      var itemNat = $item.data('nat');

      var matchStatus = (currentStatusFilter === 'Todos' || itemStatus === currentStatusFilter);
      var matchNat = (currentNatFilter === 'Todos' || itemNat === currentNatFilter);

      return matchStatus && matchNat;
    }).fadeIn(300);
  });
});
