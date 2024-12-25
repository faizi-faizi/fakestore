const productContainer = document.getElementById('data-container')
const loadingElement = document.getElementById('loading');


async function fetchApi() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        console.log(response, "response");

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const data = await response.json();
        console.log(data, "data");
        data.forEach((product) => {
           const productCard = `<div class="col d-flex">
        <div class="card d-flex" style="width: 18rem;">
            <img src=${product.image}
            class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description.slice(0,100)}...</p>
              <div class="priceSection">
              <span class="fw-bold">$${product.price}</span>
              <a href="details.html?id=${product.id}" class="btn btn-primary btn-sm">View Details</a>
              </div>
            </div>
          </div>
        </div>`

        productContainer.innerHTML += productCard;
        });


    } catch (error) {
        console.error("Error fetching API ", error.message);
    }finally {
        loadingElement.style.display = 'none';
    }
}

fetchApi();
