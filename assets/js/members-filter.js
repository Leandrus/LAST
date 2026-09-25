/**
 * @file members-filter.js
 * @author Leandrus (Automovilismo Virtual - https://av.leandrus.net)
 * @description Manages the dynamic filtering system for team driver profiles:
 * - Scans member DOM nodes to extract nationality and activity status (Active vs. Retired/Inactive).
 * - Dynamically constructs interactive filter button groups with live count indicators and country flags.
 * - Handles dual-axis filtering (Status + Nationality) with smooth fade animations.
 */

$(document).ready(function () {
  // Select all member card containers in the team roster
  var $members = $('.team-item').parent('.col-lg-3');
  var nationalities = {};
  var statusCounts = { 'Todos': 0, 'Activo': 0, 'Inactivo': 0 };

  // Parse each member card to extract activity status and nationality metadata
  $members.each(function () {
    var $this = $(this);
    var isRetired = $this.find('.stat-retired').length > 0;
    var statusCat = isRetired ? 'Inactivo' : 'Activo';

    // Store attributes on jQuery data store for rapid filtering
    $this.data('status', statusCat);
    statusCounts['Todos']++;
    statusCounts[statusCat]++;

    // Detect nationality from flag image alt/src attributes
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

  // Dynamically generate HTML control buttons for filtering
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

  // Append nationality filter buttons with respective country flags and member counts
  for (var nat in nationalities) {
    var data = nationalities[nat];
    filterHtml += `<button type="button" class="btn btn-outline-light filter-btn" data-filter-type="nat" data-filter-value="${nat}"><img src="${data.src}" class="flag-icon" alt="${nat}"> (${data.count})</button>`;
  }

  filterHtml += `
      </div>
    </div>
  `;

  $('#members-filter-container').html(filterHtml);

  // Active filter state tracking
  var currentStatusFilter = 'Todos';
  var currentNatFilter = 'Todos';

  // Handle filter button click events
  $('.filter-btn').on('click', function () {
    var $btn = $(this);
    var fType = $btn.data('filter-type');
    var fVal = $btn.data('filter-value');

    // Update active button visual state within its group
    $btn.siblings().removeClass('filter-active');
    $btn.addClass('filter-active');

    // Update state filter criteria
    if (fType === 'status') {
      currentStatusFilter = fVal;
    } else if (fType === 'nat') {
      currentNatFilter = fVal;
    }

    // Apply combined filter criteria with a smooth fade animation
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
