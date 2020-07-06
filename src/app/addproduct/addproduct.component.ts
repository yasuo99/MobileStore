import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router'
import {ProductService} from './product.service'
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  @Input() success = '';
  constructor(private productService: ProductService) { }
  public productName ='';
  public unitPrice : 0;
  public unitInStock : 0;
  public description = '';
  public manufacturer = '';
  public category = '';
  public condition = '';
  public productImage = '';

  ngOnInit(): void {
  }
  public addProduct = () => {
    this.productService.addProduct(this.productName,this.unitPrice,this.unitInStock,this.description,this.manufacturer,this.category,this.condition,this.productImage).subscribe(
      (data) => {
        if(data != null && data.productName)
        {
          this.success = 'Thêm sản phẩm thành công';
          this.productName = '';
          this.unitPrice = 0;
          this.unitInStock = 0;
          this.description = '';
          this.manufacturer = '';
          this.condition = '';
          this.productImage = '';
          this.category = '';
        }
      }, error => console.log(error));
  }
}
