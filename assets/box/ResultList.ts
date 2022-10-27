// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { GameManager }from './GameManager';
const {ccclass, property} = cc._decorator;

class Items{
    Msg: string;
    Result: string;
    itemArray:itemDetails[] = [];
}
class itemDetails{
    name: string;
    id: number;
    
    changeItemDetails(newName:string,newId:number){
        this.name = newName;
        this.id = newId;
    }
}

@ccclass('ResultList')
export default class ResultList extends cc.Component {
    
    start(){
        //let fruits: string[] = ['Apple', 'Orange', 'Banana'];
        //console.log("fruits = "+fruits);
        
        let item = new Items;
        item.Msg = "some msg";
        item.Result = "some results";
        
        for(let i=0;i<5;i++){
            let newItemDetail = new itemDetails;
            newItemDetail.changeItemDetails("Hello",i);
            item.itemArray[i] = newItemDetail;
        }
       
        //console.log("items = "+ item.name + item.id);
        let itemString = this.loadJsonFile(item);
        
        GameManager.instance.testJsonString = itemString;
        //console.log(this.loadJsonFile(item));
        
        
    }
    
    loadJsonFile(jsonObj:any){
        let jsonString = JSON.stringify(jsonObj);
        //console.log("jsonString" + jsonString);
        
        let jsonItem = new Items;
        jsonItem = JSON.parse(jsonString);
        
        //console.log("new jsonItem = "+jsonItem.itemArray[0].id+jsonItem.itemArray[0].name);
        return jsonString;
    }
    
}
