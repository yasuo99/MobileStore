import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    items = []
    addToCart(product) {
        var products = JSON.parse(localStorage.getItem('cart'));
        if(products == null)
        {
            this.items.push(product);
            localStorage.setItem('cart',JSON.stringify(this.items));
        }
        else{
            var flag = false;
            console.log(products);
            for(var i = 0;i<products.length;i++)
            {
                console.log(product);
                
                if(products[i].id === product.id)
                {
                    flag = true;
                    break;
                }
            }
            if (flag == false) {
                products.push(product);
                localStorage.setItem('cart', JSON.stringify(products));
            }
        }
    }
    removeFromCart(product) {
        var temps = []
        var products = JSON.parse(localStorage.getItem('cart'));
        for(var i = 0;i<products.length;i++)
        {
            if(products[i].id != product.id)
            {
                temps.push(products[i]);
            }
        }
        console.log(temps);
        localStorage.setItem('cart', JSON.stringify(temps));
    }
    getItems() {
        var products = JSON.parse(localStorage.getItem('cart'));
        return products;
    }

    clearCart() {
        this.items = [];
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
}