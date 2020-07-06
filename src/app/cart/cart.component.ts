import { Component,OnInit, Input} from '@angular/core';
import {CartService} from "../cart.service"
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  items;
  product;
  @Input() total:number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void{
    this.total = 0;
    this.items = this.cartService.getItems();
    this.items.forEach(element => {
      this.total += element.unitPrice;
    });
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

