import { Component, OnInit } from '@angular/core';
import {ProductService} from '../addproduct/product.service'
import { Product } from '../model';
import {Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products;
  items = []
  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProduct().subscribe(
      (data) => {
        if(data != null)
        {
            this.items = data;
        }
      }
    );
    console.log(this.items);
  }
  public goDetail(item)
  {
      var url = `/product/:id`;
      this.router.navigateByUrl(url.replace(':id',item.id));
  }

}
