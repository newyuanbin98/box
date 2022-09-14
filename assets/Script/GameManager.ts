// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass('GameManager')
export class GameManager extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property
    TotalCoins: number = 0;
    @property
    coin:number =0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    
    start () {
        this.label.string = this.TotalCoins;
    }
    
    updateCoinText(coin: number){
        this.TotalCoins += coin;
        this.label.string = this.TotalCoins.toString;
    }
   
    // update (dt) {}
}
