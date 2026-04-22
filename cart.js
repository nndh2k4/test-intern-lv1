const cartInfo = []

const addToCartButtons = document.querySelectorAll('.trend-product-addtocart')
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.trend-product');
        if (!product) return;
        const productName = product.querySelector('.trend-product-name')?.textContent?.trim() || 'Unknown Product';
        const productPrice = product.querySelector('.trend-product-price')?.textContent?.trim() || 'Unknown Price';
        const productImage = product.querySelector('.trend-product-img img')?.getAttribute('src') || '';
        const productQuantity = 1;
        const productId = product.getAttribute('data-product-id') || '';

        if (cartInfo.some(item => item.id === productId)) {
            alert(`"${productName}" is already in the cart!`)
            return;
        } else {
            cartInfo.push({ name: productName, price: productPrice, image: productImage, quantity: productQuantity, id: productId });
            alert(`Added "${productName}" to cart!`);
            localStorage.setItem('cartInfo', JSON.stringify(cartInfo));
        }
    });
})


const productInfoContent = (item) => `
    <tr data-product-id="${item.id}">
        <td>
            <div class="flex align-center gap-25">
                <div class="table-product-image">
                    <img src="${item.image}" alt="">
                </div>

                <div class="flex flex-col flex-start gap-5">
                    <h3 class="text-base font-semibold table-product-name">${item.name}</h3>
                    <div class="table-product-info">
                        <p>Size / Color</p>
                    </div>
                    <p class="table-product-price">$${parseFloat((item.price.split(" ")[0]).split('$')[1]).toFixed(2)}</p>
                </div>
            </div>
        </td>

        <td>
            <div class="flex justify-center align-center gap-15 mini-cart-product-quality">
                <button class="table-product-decrease-quantity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="1" viewBox="0 0 9 1" fill="none">
                        <path d="M9 0L9 1L-4.37114e-08 1L0 -3.93402e-07L9 0Z" fill="#111111" />
                    </svg>
                </button>
                <input class="text-base font-normal table-product-quantity" type="number" min="1" value="${item.quantity}" >
                <button class="table-product-increase-quantity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 9H5L5 5H9V4H5L5 0H4L4 4H0V5H4L4 9Z"
                            fill="#111111" />
                    </svg>
                </button>
            </div>
        </td>

        <td>
            <p class="table-product-total-price">$${item.total ? parseFloat(item.total).toFixed(2) : parseFloat((item.price.split(" ")[0]).split('$')[1]).toFixed(2)}</p>
        </td>
        <td>
            <button class="text-sm font-normal mini-cart-product-action-remove table-product-action-remove"><svg width="12" height="13"
                    viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.33789 3.5H2.33789V11.0879C2.33789 11.1608 2.35156 11.2337 2.37891 11.3066C2.41536 11.3796 2.46094 11.4434 2.51562 11.498C2.5612 11.5527 2.62044 11.5938 2.69336 11.6211C2.76628 11.6484 2.84375 11.6621 2.92578 11.6621H8.75C8.83203 11.6621 8.90951 11.6484 8.98242 11.6211C9.05534 11.5938 9.11458 11.5527 9.16016 11.498C9.21484 11.4434 9.25586 11.3796 9.2832 11.3066C9.31966 11.2337 9.33789 11.1608 9.33789 11.0879V3.5ZM8.75 2.33789H11.0879C11.252 2.33789 11.3887 2.39714 11.498 2.51562C11.6165 2.625 11.6758 2.75716 11.6758 2.91211C11.6758 3.07617 11.6165 3.21745 11.498 3.33594C11.3887 3.44531 11.252 3.5 11.0879 3.5H10.5V11.0879C10.5 11.3249 10.4544 11.5527 10.3633 11.7715C10.2721 11.9811 10.1491 12.1634 9.99414 12.3184C9.83919 12.4824 9.65234 12.61 9.43359 12.7012C9.22396 12.7923 8.99609 12.8379 8.75 12.8379H2.92578C2.67969 12.8379 2.45182 12.7878 2.24219 12.6875C2.03255 12.5964 1.8457 12.4733 1.68164 12.3184C1.52669 12.1634 1.40365 11.9811 1.3125 11.7715C1.22135 11.5527 1.17578 11.3249 1.17578 11.0879V3.5H0.587891C0.423828 3.5 0.282552 3.44531 0.164062 3.33594C0.0546875 3.21745 0 3.07617 0 2.91211C0 2.75716 0.0546875 2.625 0.164062 2.51562C0.282552 2.39714 0.423828 2.33789 0.587891 2.33789H2.92578V1.75C2.92578 1.51302 2.97135 1.28971 3.0625 1.08008C3.15365 0.861328 3.27669 0.674479 3.43164 0.519531C3.58659 0.355469 3.76888 0.227865 3.97852 0.136719C4.19727 0.0455729 4.42969 0 4.67578 0H7C7.24609 0 7.47396 0.0455729 7.68359 0.136719C7.89323 0.227865 8.08008 0.355469 8.24414 0.519531C8.39909 0.674479 8.52214 0.861328 8.61328 1.08008C8.70443 1.28971 8.75 1.51302 8.75 1.75V2.33789ZM4.08789 2.33789H7.58789V1.75C7.58789 1.66797 7.56966 1.59505 7.5332 1.53125C7.50586 1.45833 7.46484 1.39453 7.41016 1.33984C7.36458 1.28516 7.30534 1.24414 7.23242 1.2168C7.15951 1.18034 7.08203 1.16211 7 1.16211H4.67578C4.59375 1.16211 4.51628 1.18034 4.44336 1.2168C4.37044 1.24414 4.3112 1.28516 4.26562 1.33984C4.21094 1.39453 4.16536 1.45833 4.12891 1.53125C4.10156 1.59505 4.08789 1.66797 4.08789 1.75V2.33789ZM4.08789 5.83789C4.08789 5.67383 4.14258 5.53711 4.25195 5.42773C4.37044 5.30924 4.51172 5.25 4.67578 5.25C4.83073 5.25 4.96289 5.30924 5.07227 5.42773C5.19076 5.53711 5.25 5.67383 5.25 5.83789V9.33789C5.25 9.49284 5.19076 9.62956 5.07227 9.74805C4.96289 9.85742 4.83073 9.91211 4.67578 9.91211C4.51172 9.91211 4.37044 9.85742 4.25195 9.74805C4.14258 9.62956 4.08789 9.49284 4.08789 9.33789V5.83789ZM6.42578 5.83789C6.42578 5.67383 6.48047 5.53711 6.58984 5.42773C6.70833 5.30924 6.84505 5.25 7 5.25C7.16406 5.25 7.30078 5.30924 7.41016 5.42773C7.52865 5.53711 7.58789 5.67383 7.58789 5.83789V9.33789C7.58789 9.49284 7.52865 9.62956 7.41016 9.74805C7.30078 9.85742 7.16406 9.91211 7 9.91211C6.84505 9.91211 6.70833 9.85742 6.58984 9.74805C6.48047 9.62956 6.42578 9.49284 6.42578 9.33789V5.83789Z"
                        fill="#999999" />
                </svg>
            </button>
        </td>
    </tr>
    `

const tableProduct = document.querySelector('.table-product');
const storedCartInfo = JSON.parse(localStorage.getItem('cartInfo')) || [];
if (tableProduct) {
    storedCartInfo.forEach(item => {
        tableProduct.innerHTML += productInfoContent(item);
    });
}

const tableProductDecreaseQuantity = document.querySelectorAll('.table-product-decrease-quantity');
const tableProductIncreaseQuantity = document.querySelectorAll('.table-product-increase-quantity');
const tableProductActionRemove = document.querySelectorAll('.table-product-action-remove');

tableProductDecreaseQuantity.forEach(button => {
    button.addEventListener('click', () => {
        const quantityInput = button.nextElementSibling;
        if (quantityInput && quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }

        const tableProductPrice = button.closest('tr').querySelector('.table-product-total-price');
        const unitPrice = (button.closest('tr').querySelector('.table-product-price')).textContent.split('$')[1];
        const quantity = parseInt(quantityInput.value);
        const total = (unitPrice * quantity).toFixed(2);

        // Update quantity & total price in localStorage
        const productId = button.closest('tr').getAttribute('data-product-id');
        const productIndex = storedCartInfo.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            storedCartInfo[productIndex].quantity = quantity;
            storedCartInfo[productIndex].total = parseFloat(total);
            localStorage.setItem('cartInfo', JSON.stringify(storedCartInfo));
        }

        tableProductPrice.textContent = `$${total}`;
    });
});

tableProductIncreaseQuantity.forEach(button => {
    button.addEventListener('click', () => {
        const quantityInput = button.previousElementSibling;
        if (quantityInput) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }

        const unitPrice = (button.closest('tr').querySelector('.table-product-price')).textContent.split('$')[1];
        const quantity = parseInt(quantityInput.value);
        const total = (unitPrice * quantity).toFixed(2);

        // Update quantity in localStorage
        const productId = button.closest('tr').getAttribute('data-product-id');
        const productIndex = storedCartInfo.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            storedCartInfo[productIndex].quantity = quantity;
            storedCartInfo[productIndex].total = parseFloat(total);
            localStorage.setItem('cartInfo', JSON.stringify(storedCartInfo));
        }

        const tableProductPrice = button.closest('tr').querySelector('.table-product-total-price');
        tableProductPrice.textContent = `$${total}`;
    });
});

tableProductActionRemove.forEach(button => {
    button.addEventListener('click', () => {
        const row = button.closest('tr');
        if (row) {
            row.remove();
        }

        const productId = row.getAttribute('data-product-id');
        const updatedCartInfo = JSON.parse(localStorage.getItem('cartInfo')).filter(item => item.id !== productId);
        localStorage.setItem('cartInfo', JSON.stringify(updatedCartInfo));
    });
});
