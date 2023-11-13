let page = 1;

async function searchImages() {
    let input = document.querySelector('.input').value;
    let searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=BNeSGpRod3wycNCOq4-4lFCm6JrkDGrFfifoe0HIvxY&per_Page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;
        results.forEach(result => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.appendChild(image);

            searchResult.appendChild(imageLink);
        });

        document.querySelector('.show-more-btn').style.display = "block";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.getElementById('search').addEventListener("click", async () => {
    page = 1;
    await searchImages();
});

document.querySelector('.show-more-btn').addEventListener("click", async () => {
    page++;
    await searchImages();
});
