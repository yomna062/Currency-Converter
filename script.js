const apiKey = "c40af65f5463bea7eb8f9764"; // Your API Key here

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert-btn");

// List of supported currencies (including EGP)
const currencies = ["USD", "EUR", "EGP", "SAR", "AED", "GBP", "JPY"];

// Populate currency select dropdowns
currencies.forEach(cur => {
  const option1 = document.createElement("option");
  option1.value = cur;
  option1.textContent = cur;

  const option2 = option1.cloneNode(true);

  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

// Set default currencies
fromCurrency.value = "USD";
toCurrency.value = "EGP";

// Handle conversion when the button is clicked
convertBtn.addEventListener("click", () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  // Input validation
  if (from === to) {
    result.textContent = "Please choose two different currencies.";
    return;
  }

  if (amt === "" || amt <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  // Fetch the exchange rate from the API
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[to];
      const converted = (amt * rate).toFixed(2);
      result.textContent = `${amt} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      result.textContent = "Error fetching exchange rate.";
    });
});
