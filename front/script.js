const body = document.querySelector("body");
const main=document.createElement("main");
const divElement= document.createElement("div");
const aElement=document.createElement("a");
body.appendChild(main);
main.appendChild(divElement);
divElement.appendChild(aElement);
aElement.href="basket.html";
aElement.innerText="Basket";

const getProducts = async () => {
    const response = await fetch("industrial.json");
    const data = await response.json();
    return data;
}
HTMLelements = getProducts().then(data => {
    
    data.forEach((product, i) => {
        const articleElement = document.createElement("article");
        articleElement.className = "productCard";
        articleElement.id = "article-" + i;
        const productNameElement = document.createElement("h2");
        productNameElement.id = "productName-" + i;
        productNameElement.innerText = product.name;
        const articleNumberElement = document.createElement("h6");
        articleNumberElement.innerText = product.articleNumber;
        const priceElement = document.createElement("strong");
        priceElement.id="price-" + i;
        priceElement.value=product.price;
        priceElement.innerText = "$" + product.price;
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = product.description;
        const formElement = document.createElement("form");
        formElement.id = "form-" + i;
        formElement.method = "POST";
        formElement.action="/submit-order";
        const quantityElement = document.createElement("input");
        quantityElement.type = "number";
        quantityElement.name = product.articleNumber;
        quantityElement.id = "quantity-" + i;
        quantityElement.value = 1;
        quantityElement.min = 1;
        quantityElement.max = 100;
        const buttonElement = document.createElement("button");
        buttonElement.type = "submit";
        buttonElement.innerText = "Add to cart";
        buttonElement.id =  i;
        formElement.appendChild(quantityElement);
        formElement.appendChild(buttonElement);
        articleElement.appendChild(productNameElement);
        articleElement.appendChild(articleNumberElement);
        articleElement.appendChild(priceElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(formElement);
        main.appendChild(articleElement);
    });
    
    addEventListener("submit", async (event) => {
        event.preventDefault();
        const buttonId = event.target.querySelector("button").id; 
        const quantityInput = document.querySelector(`#quantity-${buttonId}`);
        const price=document.querySelector(`#price-${buttonId}`);
        const productName=document.querySelector(`#productName-${buttonId}`);
        const quantity = parseInt(quantityInput.value);
        let totalPrice=price.value*quantity;
        const productData = {
            articleNumber: quantityInput.name,
            name: productName.innerText,
            price: price.value,
            quantity: quantity,
            totalPrice: totalPrice,
        };
        updateCart(productData.articleNumber, quantity, productData.price, productData.name);
    });
 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updateCart = (articleNumber, quantity, price, name) => {
        const existingItem = cart.find(item => item.articleNumber === articleNumber);
    
        if (existingItem) {
            existingItem.quantity += quantity; 
        } else {
            cart.push({ articleNumber, quantity, price, name});           
        }
        localStorage.setItem('cart', JSON.stringify(cart)); 
    };
});