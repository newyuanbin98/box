// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { GameManager }from './GameManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class boxScript extends cc.Component {

_gameManager:GameManager = new GameManager();
    @property
    coinValue: number = 0;

    onclick(){
        console.log("this coin value is : "+this.coinValue);
        //this.test(this.coinValue);
        this._gameManager.updateCoinText(Number(this.coinValue));
    }
}
