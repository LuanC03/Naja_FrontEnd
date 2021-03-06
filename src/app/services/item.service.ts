import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/item.model';
import { NAJA_API } from './naja.api';
import { Deal } from '../model/deal.model';

@Injectable()
export class ItemService {
  constructor(private http: HttpClient) { }

  createOrUpdate(item:Item){
    console.log('chegou no service')      
    if(item.id != null){
      return this.http.put(`${NAJA_API}/atualiza`, item);
    }else{
      item.id = null;
      return this.http.post(`${NAJA_API}/criar`,item);
    }
  }

  findAll(){
    return this.http.get(`${NAJA_API}/`);
  }

  findByCategory(category:string){
    return this.http.get(`${NAJA_API}/categoria?categoria_item=${category}`);
  }

  findById(id:number){
    return this.http.get(`${NAJA_API}/item/id/${id}`);
  }

  /*decreaseQtdItem({ id, qtd }: { id: number; qtd: number; }){
    return this.http.put(`${NAJA_API}/item/decreaseQtdItem`,(response:ResponseApi)=>{
    response.data = new Deal(id, qtd),
    response.errors = new Array();
    });
  }

  increaseQtdItem({ id, qtd }: { id: number; qtd: number; }){
    return this.http.put(`${NAJA_API}/item/decreaseQtdItem`,(response:ResponseApi)=>{
    response.data = new Deal(id, qtd),
    response.errors = new Array();
    });
  }*/

  delete(id:number){
    return this.http.delete(`${NAJA_API}/remove?id=${id}`);
  }
}
