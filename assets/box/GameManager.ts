// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
import{Prefab, instantiate, Component} from 'cc';
import { boxScript } from './boxScript';
import { GetResults } from './GetResults';
const {ccclass, property} = cc._decorator;

@ccclass('GameManager')
export class GameManager extends cc.Component {
    static instance: GameManager = null;
    
    //Main_Panel stuff
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
    
    //Result_Panel stuff
    @property(cc.SpriteFrame)
    public Numbers: SpriteFrame[] = [];
    @property(cc.Node)
    public coinNum_parent: Node;
    @property(cc.Node)
    public Coin_num: Node;
    @property(cc.Node)
    public Comma_node: Node;
    @property()
    public coin_distBtwn: number = 0;
    
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

        this.showResult();
        //cc.find("Canvas/CoinText").active = false;
    }
    
    ClickOnBox(event: Event, customEventData: number){
        this.Boxes[customEventData].getComponent(boxScript).onclick();
        //bscript.onclick();
        //console.log("Click on Box: "+ bscript.coinValue);
        
    }
    
    showResult(){
        let randNum = cc.math.randomRangeInt(500,200000000);;
        this.spawnNumberNode(randNum);
    }
    
    reset(){
        this.TotalCoins = 0;
        this.label.string = "";
        
        // for (var childNode = 0; childNode < this.coinNum_parent.childNodes.length; childNode++) {
        //     this.coinNum_parent.childNodes.destroy();
        // }
        this.coinNum_parent.removeAllChildren();
        
        this.MainPanel.active = true;
        this.ResultPanel.active = false;
    }
    
    spawnNumberNode(totalCoins: number){
        //let scene = cc.director.getScene();
        
        //console.log("randNum = "+totalCoins);
        let parentNode:Node = this.coinNum_parent;
        
        let commaSpace = 0;
        let commaCount = 0;
        let totalSpace = 0;
        for(let i = totalCoins.toString().length - 1; i >= 0; i--){
            commaCount++;
            if(commaCount==4||commaCount==7){//spawn comma node
                this.Comma_node.getComponent(cc.Sprite).spriteFrame = this.Numbers[10];
                let node = cc.instantiate(this.Comma_node);
                node.parent = parentNode;
                let Pos = -((totalCoins.toString().length-1-i)*this.coin_distBtwn)-commaSpace+10;
                node.setPosition(Pos,-10,0);
                commaSpace += 50;
            }
            
            this.Coin_num.getComponent(cc.Sprite).spriteFrame = this.Numbers[totalCoins.toString().charAt(i)];
            let node = cc.instantiate(this.Coin_num);
            node.parent = parentNode;
            let Pos = -((totalCoins.toString().length-1-i)*this.coin_distBtwn)-commaSpace;
            node.setPosition(Pos,0,0);
            
            if(i==0)
                totalSpace = -Pos;
        }
        
        parentNode.setPosition(totalSpace/2,0,0);
    }
    
    // update (dt) {}
}
