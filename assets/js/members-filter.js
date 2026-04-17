// Filtrado de Miembros del Equipo
$(document).ready(function() {
  var $members = $('.team-item').parent('.col-lg-3');
  var nationalities = {};
  var statusCounts = { 'Todos': 0, 'Activo': 0, 'Inactivo': 0 };

  // Analizar cada miembro para obtener estado y nacionalidad
  $members.each(function() {
    var $this = $(this);
    var isRetired = $this.find('.stat-retired').length > 0;
    var statusCat = isRetired ? 'Inactivo' : 'Activo';
    
    // Agregar propiedades al elemento DOM para filtrado rapido
    $this.data('status', statusCat);
    statusCounts['Todos']++;
    statusCounts[statusCat]++;
    
    var $flagImg = $this.find('img[src*="flagcdn.com"]');
    if($flagImg.length > 0) {
      var nat = $flagImg.attr('alt');
      $this.data('nat', nat);
      if(!nationalities[nat]) {
        nationalities[nat] = 0;
      }
      nationalities[nat]++;
    }
  });

  // Generar HTML para los filtros
  var filterHtml = `
    <div class="filter-controls">
      <div class="btn-group mb-3" role="group" aria-label="Status Filter">
        <button type="button" class="btn btn-outline-light active filter-btn" data-filter-type="status" data-filter-value="Todos">Todos</button>
        <button type="button" class="btn btn-outline-light filter-btn" data-filter-type="status" data-filter-value="Activo">Activo (${statusCounts['Activo']})</button>
        <button type="button" class="btn btn-outline-light filter-btn" data-filter-type="status" data-filter-value="Inactivo">Inactivo (${statusCounts['Inactivo']})</button>
      </div>
      <br/>
      <div class="btn-group flex-wrap" role="group" aria-label="Nationality Filter">
        <button type="button" class="btn btn-outline-light active filter-btn" data-filter-type="nat" data-filter-value="Todos">🌍 Todas</button>
  `;

  for (var nat in nationalities) {
    // Encontrar la bandera correspondiente para el boton
    var flagCode = '';
    if(nat.toLowerCase() === 'venezuela') flagCode = 've';
    else if(nat.toLowerCase() === 'argentina') flagCode = 'ar';
    else if(nat.toLowerCase() === 'mexico') flagCode = 'mx';
    // si hay mas banderas, se determinan aca
    
    var flagStripe = '🏁';
    filterHtml += `<button type="button" class="btn btn-outline-light filter-btn" data-filter-type="nat" data-filter-value="${nat}">${flagStripe}${nat}(${nationalities[nat]})</button>`;
  }

  filterHtml += `
      </div>
    </div>
  `;

  $('#members-filter-container').html(filterHtml);

  // Logica de Filtrado
  var currentStatusFilter = 'Todos';
  var currentNatFilter = 'Todos';

  $('.filter-btn').on('click', function() {
    var $btn = $(this);
    var fType = $btn.data('filter-type');
    var fVal = $btn.data('filter-value');

    // Actualizar UI del boton
    $btn.siblings().removeClass('active');
    $btn.addClass('active');

    // Actualizar variables de estado
    if(fType === 'status') {
      currentStatusFilter = fVal;
    } else if(fType === 'nat') {
      currentNatFilter = fVal;
    }

    // Aplicar filtro
    $members.hide().filter(function() {
      var $item = $(this);
      var itemStatus = $item.data('status');
      var itemNat = $item.data('nat');

      var matchStatus = (currentStatusFilter === 'Todos' || itemStatus === currentStatusFilter);
      var matchNat = (currentNatFilter === 'Todos' || itemNat === currentNatFilter);

      return matchStatus && matchNat;
    }).fadeIn(300);
  });
  
  // Aplicar estilo extra a los botones
  $('.filter-btn').css({
    'border-color': 'rgba(250, 250, 250, 0.2)',
    'margin': '2px',
    'border-radius': '4px'
  });
  $('.filter-controls .btn.active').css({
    'background-color': 'var(--brand-orange, #f5a425)',
    'border-color': 'var(--brand-orange, #f5a425)',
    'color': '#fff'
  });
});
