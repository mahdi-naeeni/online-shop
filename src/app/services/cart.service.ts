import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []})
  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item : CartItem): void{
    const items = [...this.cart.value.items];

    const itemsInCart = items.find((_item) => _item.id === item.id )

    if (itemsInCart){
      itemsInCart.quantity += 1;
    }else{
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('1 item added to cart' , 'OK' , {duration: 3000 }); 
  }

  getTotal(items:CartItem[]): number{
    return items.
    map((item) => item.price * item.quantity)
    .reduce((prev , current) => prev + current , 0)
  };

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart Is Cleared!' ,'OK',{
      duration:3000
    })
  }
  removeFromCart(item : CartItem , update = true): CartItem [] {
    const filteredItem = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if(update){
      
      this.cart.next({ items: filteredItem });
      this._snackBar.open('1 item removed from cart.', 'Ok' , {
        duration: 3000
      } );
    }
    return filteredItem;
  }
  removeQuantity(item : CartItem ) :void {
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
        if(item === _item){
          _item.quantity--;
          if(_item.quantity === 0){
            itemForRemoval = _item;
          }
        }
        return _item;
    })
    
    if(itemForRemoval){
      filteredItems = this.removeFromCart(itemForRemoval , false)
    }
    this.cart.next({ items : filteredItems})
    this._snackBar.open('1 item removed from cart.' , 'OK' , {
      duration : 3000
    } )
  }
}
 