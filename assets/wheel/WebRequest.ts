// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class WedRequest extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    
    start () {
        var url_string = "https://www.youtube.com/watch?v=F6eFFCi12v8";
        //window.location.href; 
        var url = new URL(url_string);
        var c = url.searchParams.get("v");
        //console.log("this c = "+c);
        this.label.string = c;
    }

    // update (dt) {}
}
