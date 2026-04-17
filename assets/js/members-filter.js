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

  // Inyectar CSS para botones
  var styleHtml = `
    <style>
      .filter-btn {
        border-color: rgba(250, 250, 250, 0.2);
        margin: 2px;
        border-radius: 4px;
        color: #fff;
        background: transparent;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .filter-btn:hover {
        background-color: var(--brand-blue);
        border-color: var(--brand-orange);
        color: var(--brand-orange);
      }
      .filter-btn.filter-active {
        background-color: var(--brand-orange) !important;
        border-color: var(--brand-orange) !important;
        color: #fff !important;
      }
      .status-btn {
        min-width: 80px; /* Asegurar ancho igual para los 3 de estado */
      }
      .flag-icon {
        width: 24px;
        height: auto;
        border-radius: 2px;
      }
    </style>
  `;

  // Generar HTML para los filtros
  var filterHtml = styleHtml + `
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
