import { Component, EventEmitter, Output , OnInit , OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-filters',
  templateUrl: `./filters.component.html`,

})
export class FiltersComponent implements OnInit , OnDestroy{

  @Output() showCategory= new EventEmitter<string>();
  categoriesSubscription!: Subscription
  categories! : string[];
  constructor(private storeServices : StoreService ){}

  onShowCategory(category: string):void {
    this.showCategory.emit(category);
  }

  ngOnInit(): void {
   this.categoriesSubscription =  this.storeServices.getAllCategories()
    .subscribe((response) =>{
      this.categories = response;
    });
  }
  ngOnDestroy(): void {
    if(this.categoriesSubscription){
        this.categoriesSubscription.unsubscribe();
    }
  }
}
