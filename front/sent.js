let receipt = JSON.parse(localStorage.getItem('receipt')) || [];
const body = document.querySelector("body");
const main = document.createElement('main');
const returnToHomePage = document.createElement('a');
const orderConfirmation = document.createElement('h1');
const orderDetails=document.createElement('p');
const orderNumber=document.createElement("h2");
main.appendChild(returnToHomePage);
main.appendChild(orderConfirmation);
main.appendChild(orderNumber);
main.appendChild(orderDetails);
body.appendChild(main);
orderConfirmation.innerText="THANK YOU FOR YOUR ORDER!";
orderDetails.innerText="Order Details:";
returnToHomePage.innerText = "Continue Shopping";
returnToHomePage.href = "index.html";
let totalPrice = 0;
let priceTimesProduct = [];

const orderConfirmationInfo = () => {


    const totalPriceElement=document.createElement('strong');


    receipt.forEach((item, index) => {
        const article = document.createElement('article');
        const productName = document.createElement('h2');
        const articleNumber = document.createElement('p');
        const price = document.createElement('p');
        const quantity = document.createElement('p');
        productName.innerText = item.name;
        articleNumber.innerText = "Article Number: " + item.articleNumber;
        price.innerText = "Price: $" + item.price;
        quantity.innerText = "Quantity: " + item.quantity;
        article.append(productName, articleNumber, price, quantity,);
        main.appendChild(article);
        priceTimesProduct[index] = item.quantity * item.price;
        totalPrice += priceTimesProduct[index];

    });
    
 
    orderNumber.innerText= "ORDER NUMBER: " + receipt[0].order_id;
    totalPriceElement.innerText="Total: $"+totalPrice.toFixed(2);
    main.append(totalPriceElement);
};
    

orderConfirmationInfo();