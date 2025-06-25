let allSites = [];

fetch('locations.json')
  .then(res => res.json())
  .then(data => {
    allSites = data;
    setupSearchAndMap();
    displayResults(data); // Show all sites on load
  });

function setupSearchAndMap() {
  const searchInput = document.getElementById('search');
  const resultsDiv = document.getElementById('results');
  let activeState = '';

  function filterSites() {
    const query = searchInput.value.toLowerCase();
    const filtered = allSites.filter(site => {
      const matchesText = site.name.toLowerCase().includes(query) ||
                          site.state.toLowerCase().includes(query) ||
                          site.postcode.toString().includes(query);
      const matchesState = activeState ? site.state.toLowerCase() === activeState.toLowerCase() : true;
      return matchesText && matchesState;
    });
    displayResults(filtered);
  }

  // Search bar input filter
  searchInput.addEventListener('input', () => {
    // Clear active state if search text no longer matches
    activeState = '';
    filterSites();
  });

  // Map region click
  document.querySelectorAll('.state').forEach(region => {
    region.addEventListener('click', () => {
      activeState = region.id; // e.g. "NSW"
      searchInput.value = activeState; // Inject state into search bar
      filterSites();
    });
  });
}

function displayResults(sites) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  if (sites.length === 0) {
    resultsDiv.innerHTML = '<p>No matching sites found.</p>';
    return;
  }
  sites.forEach(site => {
    const div = document.createElement('div');
    div.className = 'site';
    div.innerHTML = `
      <h2>${site.name}</h2>
      <p>${site.state} ${site.postcode}</p>
      <a href="${site.bookingUrl}" target="_blank">Book Now</a>
    `;
    resultsDiv.appendChild(div);
  });
}
