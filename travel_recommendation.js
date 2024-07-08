// Fetch the JSON data
async function fetchData() {
    try {
      const response = await fetch('travel_recommendation_api.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Filter and display the results based on the keyword
  async function search() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const data = await fetchData();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (!data) return;
  
    let results = [];
  
    if (keyword === 'beach') {
      results = data.beaches;
    } else if (keyword === 'temple') {
      results = data.temples;
    } else if (keyword === 'country') {
      data.countries.forEach(country => {
        results.push(...country.cities);
      });
    } else {
      resultsDiv.innerHTML = '<p>No results found. Please enter "beach", "temple", or "country".</p>';
      return;
    }
  
    results.forEach(item => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('result-item');
      resultItem.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.imageUrl}" alt="${item.name}" />
        <p>${item.description}</p>
      `;
      resultsDiv.appendChild(resultItem);
    });
  }
  
  // Clear the results
  function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
  }
  