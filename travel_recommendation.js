// Get DOM elements
let resultDiv = document.getElementById("searchResult");
let searchInput = document.querySelector(
  "input[type='text'][placeholder='Search...']",
);
let searchButton = document.querySelector("button[type='submit']");
let countriesData = null;
let templesData = null;
let beachesData = null;

// Fetch data once on page load
let data = fetch("./travel_recommendation_api.json")
  .then((response) => response.json())
  .then((data) => {
    countriesData = data.countries;
    templesData = data.temples;
    beachesData = data.beaches;
    console.log("Data loaded successfully");
    return data;
  })
  .catch((error) => console.error("Error fetching data:", error));

// Search when button is clicked
searchButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission and page reload
  let query = searchInput.value.toLowerCase().trim();

  if (!data) {
    resultDiv.textContent = "Data not loaded yet";
    return;
  }
  if (!query) {
    resultDiv.textContent = "Please enter a search term";
    return;
  }
  let found = false;

  if (query === "country" || query === "countries") {
    resultDiv.innerHTML = "Country found: " + "<br><br>";
    for (let country of countriesData) {
      for (let city of country.cities) {
        resultDiv.innerHTML += `${city.name}<br><img src="${city.imageUrl}" alt='City picture' style='width: 200px; height: 200px'><br> `;
        resultDiv.innerHTML += `${city.description}<br><br>`;
      }
    }
    found = true;
  }

  if (query === "temples" || query === "temple") {
    resultDiv.innerHTML = "temple found: " + " <br><br>";
    templesData.forEach((temple) => {
      resultDiv.innerHTML += `${temple.name}<br><img src="${temple.imageUrl}" alt='Temple picture' style='width: 200px; height: 200px'><br> `;
      resultDiv.innerHTML += `${temple.description}<br><br>`;
    });
    found = true;
  }

  if (query === "beach" || query === "beaches") {
    resultDiv.innerHTML = "beach found: " + " <br><br>";
    beachesData.forEach((beach) => {
      resultDiv.innerHTML += `${beach.name}<br><img src="${beach.imageUrl}" alt='Beach picture' style='width: 200px; height: 200px'><br> `;
      resultDiv.innerHTML += `${beach.description}<br><br>`;
    });
    found = true;
  }

  if (!found) {
    resultDiv.textContent = "query not found in API data.";
  }
});
