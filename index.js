const apiKeys = "RaRJD8i19Ry0KWt8vSOAJtLN9GuhepyDYIVeZs3E89Q";
const formE1 = document.querySelector("form");
const searchResults = document.querySelector(".search-results");
const searchBar = document.querySelector(".search-bar");
const buttonTwo = document.querySelector(".button-2");
let inputData = "";
let page = 1;

searchUnsplash = async () => {
  inputData = searchBar.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKeys}&per_page=15`;

  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const data = await response.json();
  return data;
};
getImages = (data) => {
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  data.results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "-blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  buttonTwo.style.display = "block";
};
async function fetchResults() {
  try {
      const results = await searchUnsplash();
      getImages(results);
  } catch(err) {
      console.log(err);
      alert('Failed to search Unsplash');
  }
} 

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  fetchResults()
});

buttonTwo.addEventListener("click", () => {
  page++;
  fetchResults()
});
