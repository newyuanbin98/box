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
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.isSpinning = false;
        //this.SpinWheel();
        console.log(" Game start");
        
        
    }

    // update (dt) {}
    
    SpinWheel(){
        
        console.log("start spinning for "+this.spinDuration +" second(s)");
        this.isSpinning = true;
        this.WheelObj.runAction(cc.rotateTo(this.spinDuration,this.stopSpinAngle(this.sideStopNumber)));
        setTimeout(()=> {
            console.log("finish spinning");
            this.isSpinning = false;
            console.log("spinning state after timeout = "+this.isSpinning);
        },this.spinDuration*1000);
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
            console.log("going to start spinning");
            
            this.sideStopNumber = customEventData;
            this.SpinWheel();
        }
        else
            console.log("spin not yet complete");
        
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
