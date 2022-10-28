// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property, math, MathUtils} = cc._decorator;
@ccclass
export default class WheelManager extends cc.Component {

    @property(cc.Node)
    public WheelObj: Node = null;
    
    @property
    public minSpinAmount: number = 0;
    @property
    public maxSpinAmount: number = 0;
    @property
    public rouletteSides: number = 0;
    @property
    public spinDuration: number = 0;
    @property
    public sideStopNumber: number = 0;

    isSpinning:boolean = false;
    
    @property(cc.Node)
    public MainPanel: Node = null;
    @property(cc.Node)
    public ResultPanel: Node = null;
    
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
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.reset();
        //this.SpinWheel();
        //console.log(" Game start");
    }

    // update (dt) {}
    
    SpinWheel(){
        
        //console.log("start spinning for "+this.spinDuration +" second(s)");
        this.isSpinning = true;
        this.WheelObj.runAction(cc.rotateTo(this.spinDuration,this.stopSpinAngle(this.sideStopNumber)));
        setTimeout(()=> {
            //console.log("finish spinning");
            this.isSpinning = false;
            this.MainPanel.active = true;
            this.ResultPanel.active = true;
            this.spawnNumberNode(this.getValueFromURL());
            console.log("spinning state after timeout = "+this.isSpinning);
        },this.spinDuration*1000+2000);
       console.log("spinning state before timeout = "+this.isSpinning);
    }
    
    stopSpinAngle(sideToStopOn:number){
        let spinAngle = (360* (cc.math.randomRangeInt(this.minSpinAmount,this.maxSpinAmount))) + ((360/this.rouletteSides)*(sideToStopOn-1));
        return spinAngle;
    }
    
    SpinWheelButtonClick(event: Event, customEventData: number){
        //console.log("spinning state in spin wheel click= "+this.isSpinning);
        let randNum = cc.math.randomRangeInt(1,this.rouletteSides);
        customEventData = randNum;
        console.log("generated random winning number = "+randNum);
        
        if(!this.isSpinning)
        {
            //console.log("going to start spinning");
            this.sideStopNumber = customEventData;
            this.SpinWheel();
        }
        else
            //console.log("spin not yet complete");
        
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
            if(commaCount == 4 || commaCount == 7){//spawn comma node
                this.Comma_node.getComponent(cc.Sprite).spriteFrame = this.Numbers[10];
                let node = cc.instantiate(this.Comma_node);
                node.parent = parentNode;
                let Pos = -((totalCoins.toString().length-1-i)*this.coin_distBtwn)-commaSpace+15;
                node.setPosition(Pos,-15,0);
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
        
        parentNode.setPosition(totalSpace/2, 0, 0);
    }
    
    getValueFromURL()
    {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var c = url.searchParams.get("v");
        console.log("value v from url = "+c);
        
        return c;
    }
    
    reset(){
        this.isSpinning = false;
        this.coinNum_parent.removeAllChildren();
        
        this.MainPanel.active = true;
        this.ResultPanel.active = false;
    }
    // trySpin(obj: Node){
    //     cc.tween(obj)
    // .to(1, { position: cc.v2(100, 100), rotation: 360 })
    // .to(1, { scale: 2 })
    // .start()
    // }
    
    // RandomiseNumber(){
    //     let randomNum = cc.math.randomRangeInt(1,8);
        
    //     let randomSpin = cc.math.randomRangeInt(randomNum*360)
    //     //Math.random() * (8-1)+1;
    //     //randomRange(1.0, 8.0);
        
    //     return randomNum;
    // }
    
    
}
