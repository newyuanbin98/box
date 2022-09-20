// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
import{Prefab, instantiate, Component, getComponent } from 'cc';
import { boxScript } from './boxScript';
import { GetResults } from './GetResults';
const {ccclass, property} = cc._decorator;

@ccclass('GameManager')
export class GameManager extends cc.Component {
    static instance: GameManager = null;
    
    @property(cc.Label)
    label: cc.Label = null;
    @property
    TotalCoins: number = 0;
    @property(cc.Node)
    public MainPanel: Node = null;
    @property(cc.Node)
    public ResultPanel: Node = null;
    @property(cc.Label)
    testLabel: cc.Label = null;
    
    @property(cc.Node)
    public Boxes: Node[] = [];
    
    
    testJsonString: string;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        GameManager.instance = this;
    }
    
    start () {
        this.ResultPanel.active = false;
        //this.label.string = this.TotalCoins;
    }
    
    updateCoinText(coin: number){
        this.TotalCoins += coin;
        this.label.string = "Congratulation, You Won \n" + this.TotalCoins + " Coins!";
        this.testLabel.string = this.testJsonString;
        
        this.MainPanel.active = false;
        this.ResultPanel.active = true;
        
        //cc.find("Canvas/CoinText").active = false;
    }
    
    ClickOnBox(){
        this.Boxes[0].getComponent(boxScript).onclick();
        //bscript.onclick();
        //console.log("Click on Box: "+ bscript.coinValue);
        
    }
    
    showResult(){
        
    }
    
    reset(){
        this.TotalCoins = 0;
        this.label.string = "";
        this.MainPanel.active = true;
        this.ResultPanel.active = false;
    }
    
    
    // update (dt) {}
}
