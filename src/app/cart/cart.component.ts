import { Component,OnInit} from '@angular/core';
import {CartService} from "../cart.service"
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  items;
  product;
  constructor(private cartService: CartService) { }

  ngOnInit(): void{
    
    this.items = this.cartService.getItems();
  }
  public removeFromCart(item)
  {
    this.cartService.removeFromCart(item);
    this.ngOnInit();
  }
  public clearCart(){
    this.cartService.clearCart();
    this.ngOnInit();
  }
}

