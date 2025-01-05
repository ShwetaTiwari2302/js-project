const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];

// Fetch data using .then
function fetchDataUsingThen() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      cryptoData = data;
      renderTable(data);
    })
    .catch(err => console.error("Error fetching data:", err));
}

// Fetch data using async/await
async function fetchDataUsingAsync() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    cryptoData = data;
    renderTable(data);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// Render table rows
function renderTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  data.forEach(coin => {
    const row = `
      <tr>
        <td><img src="${coin.image}" alt="${coin.name}"></td>
        <td>${coin.name}</td>
        <td>${coin.id}</td>
        <td>${coin.symbol}</td>
        <td>$${coin.current_price}</td>
        <td>${coin.total_volume}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Search functionality
document.getElementById("search").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filteredData = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(keyword) || coin.symbol.toLowerCase().includes(keyword)
  );
  renderTable(filteredData);
});

// Sort by market cap
document.getElementById("sortMarketCap").addEventListener("click", () => {
  const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
});

// Sort by percentage change (dummy field for demo purposes)
document.getElementById("sortPercentageChange").addEventListener("click", () => {
  const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
});

// Initial fetch using async/await
fetchDataUsingAsync();
