
const foodTypes=document.querySelectorAll(".food-type")
const productsContainer=document.querySelector(".products-container")
const Allproducts=Array.from(productsContainer.children).filter(child => child.tagName === 'DIV');
const menuTitle=document.querySelector(".food-title")
product_card=document.querySelector("#product-card")
product_card_text=document.querySelector(".product-card-text")
cart=document.querySelector(".panier-container")
added_products=localStorage.getItem("added_products")
cartdata=JSON.parse(localStorage.getItem("added_products")) || [];
function menuClickHandeler(evt){
    id=evt.currentTarget.getAttribute('id')
    productsToShow=document.querySelectorAll("."+"type"+id.slice(-1))
    foodTypes.forEach(t  => {
        t.classList.remove("active")
    })
    if (id=="ftype1"){
        evt.currentTarget.classList.add("active")
        Allproducts.forEach(p => {
            p.style.display = 'none';
        })
        
        productsToShow.forEach(p => {
            p.style.display = 'block';        
        })
        document.getElementById("cree-tacos-btn-menu").style.display= "block"
    }
    else{
    evt.currentTarget.classList.add("active")
    Allproducts.forEach(p => {
        p.style.display = 'none';
    })
    
    productsToShow.forEach(p => {
        p.style.display = 'block';        
    })
    document.getElementById("cree-tacos-btn-menu").style.display= "none"
    }
    
    
    
} 

function toggleMenu(){
    const mobileMenu = document.querySelector(".navbar-mobile");
    if (mobileMenu.style.display === "none") {
        mobileMenu.style.display = "flex";
    } else {
        mobileMenu.style.display = "none";
    }

}





function showProductCard(event){
    product_card.style.display="block"
   const clickedCommander = event.target;
   const clickedCommanderParent = clickedCommander.parentElement.parentElement
   productSelected= {name:clickedCommanderParent.querySelector("h1").textContent,description:clickedCommanderParent.querySelector("p").textContent,price:clickedCommanderParent.querySelector(".price-command").querySelector("h3").textContent,img:clickedCommanderParent.querySelector(".product-img").innerHTML}
   clickedCommanderImg_Style = window.getComputedStyle(clickedCommanderParent.querySelector(".product-img"))
   CCbackgroundURL = clickedCommanderImg_Style.backgroundImage
   document.querySelector(".product-card-img").style.backgroundImage=CCbackgroundURL
   product_card_text.querySelector("h1").textContent=productSelected.name
   product_card_text.querySelector("p").textContent=productSelected.description
   product_card_text.querySelector("h3").textContent = productSelected.price.match(/\d+/) + ' DH';
   document.getElementById('quantity').value = 1

   
}

function closeProductCard(){
    product_card.style.display="none"
    
} 

function updatePrice(quantity) {
    const product_price=parseInt(productSelected.price.match(/\d+/))
    const new_product_price = quantity * product_price
    document.querySelector(".product-card-text").querySelector("h3").textContent = new_product_price + ' DH';
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updatePrice(quantityInput.value);
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updatePrice(quantityInput.value);
    }
}

function addToCart(){
    product_added_to_cart={nom:product_card_text.querySelector("h1").textContent,boisson:product_card_text.querySelector("#boisson-select").value,suplements:product_card_text.querySelector("#suplements-select").value,quantité:product_card_text.querySelector("#quantity").value,prix:product_card_text.querySelector("h3").textContent}
    cartdata.push(product_added_to_cart)
    localStorage.setItem("added_products",JSON.stringify(cartdata))
    cart_items_count=cart.querySelector("h2")
    cart_items_count.textContent=parseInt(cart_items_count.textContent)+1
    alert("Il a été ajouté avec succès à votre panier 🛒")
    closeProductCard()



}

document.addEventListener('DOMContentLoaded', function(){
    if (added_products){
        cart_items_count=cart.querySelector("h2")
        cart_items_count.textContent=JSON.parse(added_products).length
    }
    
    Allproducts.forEach(p => {
        p.style.display = 'none';
    })
    document.querySelectorAll(".type1").forEach(p => {
        p.style.display = 'block';
    })

    document.querySelectorAll(".commander").forEach(cmd => {
        cmd.addEventListener("click", showProductCard);

    });
})
