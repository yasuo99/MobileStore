import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'
import {Product} from '../model'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class ProductService{
    private currentProductSubject: BehaviorSubject<Product>;
    public currentProduct: Observable<Product>;
    private urlAPI = 'http://192.168.1.7:8080';
    constructor(private  http:HttpClient)
    {
        this.currentProductSubject = new BehaviorSubject<Product>(
            JSON.parse(localStorage.getItem('currentProduct'))
        );
        this.currentProduct = this.currentProductSubject.asObservable();
    }
    public get currentProductValue(): Product{
        return this.currentProductSubject.value;
    }
    public addProduct = (productName: String, unitPrice: number, unitInStock: number, description: String,manufacturer: String,category: String,condition: String, productImage:String) =>
    {
        const loginUrl = `${this.urlAPI}/api/product/list`;
        return this.http.post<any>(loginUrl,{ productName,unitPrice,unitInStock,description,manufacturer,category,condition,productImage})
        .pipe(map((product) => {
            if(product != null)
            {
                const newProduct = {} as Product;
                newProduct.id = product.id;
                newProduct.productName = product.productName;
                newProduct.unitPrice = product.unitPrice;
                newProduct.unitInStock = product.unitInStock;
                newProduct.description = product.description;
                newProduct.category = product.productCondition;
                newProduct.condition = product.condition;
                newProduct.manufacturer = product.manufacturer;
                newProduct.productImage = product.productImage;
                this.currentProductSubject.next(newProduct);
                return newProduct;
            }else{
                return null;
            }
        }))
    }
    public getAllProduct = () =>{
        const getProductUrl = `${this.urlAPI}/api/product/list`;
        return this.http.get<any>(getProductUrl).pipe(
            map((products) => {
                if(products != null)
                {
                    const getProduct = [];
                    products.forEach(element => {
                        getProduct.push(element);
                        this.currentProductSubject.next(element);
                    });
                    return getProduct;
                }
                else{
                    return null;
                }
            })
        )
    }
    public getProduct = (id: string) =>
    {
        const getProductUrl = `${this.urlAPI}/api/product/list/:id`;
        const x = getProductUrl.replace(":id",id);
        console.log(x);
        return this.http.get<Product>(x).pipe(
            map((product) => {
                if(product != null)
                {
                    const getProduct = {} as Product;
                    getProduct.id = product.id;
                    getProduct.productName = product.productName;
                    getProduct.productImage = product.productImage;
                    getProduct.description = product.description;
                    getProduct.category = product.category;
                    getProduct.unitPrice = product.unitPrice;
                    getProduct.unitInStock = product.unitInStock;
                    getProduct.manufacturer = product.manufacturer;
                    getProduct.condition = product.condition;
                    this.currentProductSubject.next(getProduct);
                    return getProduct;
                }
                else{
                    return null;
                }
            })
        )
    }
}