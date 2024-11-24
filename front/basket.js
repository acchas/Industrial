const body = document.querySelector("body");
const main = document.createElement('main');
const emptyCart=document.createElement('p');
const returnToHomePage=document.createElement('a');
const orderConfirmation=document.createElement('h1');
const cartDiv=document.createElement('div');
main.append(cartDiv,emptyCart, orderConfirmation,returnToHomePage);
returnToHomePage.innerText="Continue Shopping"
returnToHomePage.href="index.html";
body.append(main);
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let receipt = JSON.parse(localStorage.getItem('receipt')) || [];
var totalPrice = 0;
var priceTimesProduct = [];
let cartArr = localStorage.getItem('cart');

const showCartContent = () => {
    const form=document.createElement('form');
    const emptyCartBtn=document.createElement('button');
    const confirmBtn=document.createElement('button');
    const totalPriceElement=document.createElement('strong');
    form.action='/submit-order';
    form.method='POST';
    emptyCartBtn.id="empty-cart";
    emptyCartBtn.innerText="Empty Cart";
    confirmBtn.type="submit";
    confirmBtn.id="confirm-order";
    confirmBtn.innerText="Confirm Order";
    cart.forEach((item, index) => {
        const article = document.createElement('article');
        const productName = document.createElement('h2');
        const articleNumber = document.createElement('p');
        const price = document.createElement('p');
        const quantity = document.createElement('p');
        productName.innerText = item.name;
        articleNumber.innerText = "Article Number: " + item.articleNumber;
        price.innerText = "Price: $" + item.price;
        quantity.innerText = "Quantity: " + item.quantity;
     
        article.append(productName, articleNumber, price, quantity);
        cartDiv.append(article)
        main.appendChild(cartDiv);
        priceTimesProduct[index] = item.quantity * item.price;
        totalPrice += priceTimesProduct[index];
 
    });
    totalPriceElement.innerText="Total: $"+totalPrice.toFixed(2);
    form.append(confirmBtn);
    cartDiv.append(totalPriceElement, form,emptyCartBtn);
    main.append(cartDiv);
};

function initializeCartActions() {

    if(0===cart.length){
        emptyCart.innerText="Cart is Empty";
        main.appendChild(emptyCart);
        return; 
    }
    else{
        showCartContent();
    }

    document.querySelector('#empty-cart').addEventListener('click', () => {
        localStorage.removeItem('cart');
        cartDiv.innerHTML='';
        emptyCart.innerText="Cart is Empty";
        main.appendChild(emptyCart);
    });

    document.querySelector('#confirm-order').addEventListener('click', async () => {
        const order_id = Math.floor(Math.random() * 100000);

        cart = cart.map(item => ({ ...item, order_id }));

            try {
                const response = await fetch('/submit-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cart),
                });
                if (response.ok) {
                    localStorage.setItem("receipt", JSON.stringify(cart));
                    localStorage.removeItem('cart');
             
                   
                } else {
                    throw new Error('Failed to submit order.');
                }
            } catch (error) {
                console.error(error);
                alert('Something went wrong.');
            }
        
    });
}
initializeCartActions();
