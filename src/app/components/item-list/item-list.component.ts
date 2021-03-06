import { Item } from 'src/app/model/item.model';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ItemService } from 'src/app/services/item.service';
import { DialogService } from 'src/app/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  category = '';
  shared : SharedService;
  message:{};
  classCss:{};
  listItem: Array<Item>;

  constructor(
    private dialogService: DialogService,
    private itemService: ItemService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.itemService.findAll().subscribe((itens:Array<Item>) => {
      this.listItem = new Array<Item>();
      itens.forEach(element => {
        this.listItem.push(element);
      });
    }, err =>{
        this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getColor(qtd:number):string{
    if(qtd > 0 && qtd <=10){
      return '#DAA520';
    }else if(qtd <= 0){
      return '#FF4500';
    }
  }

  categorySelector(categoria:string){
    this.itemService.findByCategory(categoria).subscribe((itens:Array<Item>) =>{
      this.listItem = new Array<Item>();
      itens.forEach(element => {
        this.listItem.push(element);
      });
    }, err => {
      this.showMessage({
        type:'error',
        text:'deumerda'
      });
    });
  }

  edit(id:number){
    this.router.navigate(['/item-new', id]);
  }

  detail(id:number){
    this.router.navigate(['/ticket-detail', id]);
  }

  delete(id:number){
    this.dialogService.confirm(' Do you want to delete this item ?')
    .then((candelete:boolean) =>{
      if(candelete){
        this.message = {};
        this.itemService.delete(id).subscribe((responseApi:Response) => {
          this.showMessage({
            type: 'sucess',
            text: 'Item deleted'
          });
          this.findAll();
        }, err => {
          this. showMessage({
            type:'error',
            text: err['error']['errors'][0]
          });
        });
      }
    });
  }

  private showMessage(message: {type:string, text: string}):void{
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(()=>{
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string):void{
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }
}
