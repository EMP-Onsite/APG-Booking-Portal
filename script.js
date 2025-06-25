
fetch('locations.json')
  .then(res => res.json())
  .then(data => {
    const searchInput = document.getElementById('search');
    const resultsDiv = document.getElementById('results');

    function displayResults(filtered) {
      resultsDiv.innerHTML = '';
      if (filtered.length === 0) {
        resultsDiv.innerHTML = '<p>No matching sites found.</p>';
        return;
      }
      filtered.forEach(site => {
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

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = data.filter(site =>
        site.name.toLowerCase().includes(query) ||
        site.state.toLowerCase().includes(query) ||
        site.postcode.toString().includes(query)
      );
      displayResults(filtered);
    });

    displayResults(data); // show all on load
  });
