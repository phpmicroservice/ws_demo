var WebSocket = require("ws");
var wsServer = new WebSocket("ws://192.168.1.220:34504/");
var key=false;
wsServer.onopen = function () {
    // Web Socket 已连接上，使用 send() 方法发送数据
    key=true;
};
wsServer.onclose = function () { //当链接关闭的时候触发
    // console.log('连接已关闭');       
};
wsServer.onerror = function (e) { //错误情况触发
    // if(error){
    //     error(e);
    // }     
}
function socket(s, r, d, res = false, error = false, p) {  
    //发送消息并绑定回调函数
    var data = {
        s: s,
        r: r,
        d: d,
        p: p,
        sid: 'd712da1d9fa5238aa54149ef44b45c10'
    }
    var receive = function (d) {
        var res_data = JSON.parse(d.data);
        //如果成功
        if (!JSON.parse(d.data).e) {
            res(JSON.parse(d.data));
        } else {
            error(JSON.parse(d.data));
        }
        wsServer.removeEventListener("message", receive);
    }
    wsServer.addEventListener('message', receive);
    try {
        data = JSON.stringify(data);
    } catch (err) {
        console.log('必须是json格式');
        return false;
    }
    wsServer.send(data);
}