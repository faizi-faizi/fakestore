const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const productDetails= document.getElementById('product-details')
const loadingElement = document.getElementById('loading');


async function fetchProductDetails(id){
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if(!response.ok){
            throw new Error("Product not found");
        }
        const product = await response.json();
        displayProduct(product);
    } catch(error){
        productDetails.innerHTML = `
        <div class="col-12 text-center text-danger">
                        <p>${error.message}</p>
                    </div>
        `;
        console.error(error);
    }finally {
        loadingElement.style.display = 'none';
    }
}

function displayProduct(product){
    const productDetailsCard=`
    <div class="product-image col-md-6">
                    <img src="${product.image}"
                        alt="${product.title}">
                </div>
                <div class="col-md-6">
                    <h2>${product.title}</h2>
                    <p class="text-muted">${product.category}</p>
                    <p>${product.description}</p>
                    <h3 class="text-primary">$${product.price}</h3>
                    <button class="btn btn-success">Buy Now</button>
                </div>
    `;
    productDetails.innerHTML=productDetailsCard;
}

if (productId){
    fetchProductDetails(productId);
}else{
    productDetails.innerHTML=`
    <div class="col-12 text-center text-danger">
            <p>Product ID is missing in the URL.</p>
        </div>
    `
}

