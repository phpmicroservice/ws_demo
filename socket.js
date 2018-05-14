var WebSocket = require("ws");
var wsServer = new WebSocket("ws://192.168.1.220:34504/");
wsServer.onclose = function () { //当链接关闭的时候触发
    // console.log('连接已关闭');       
};
wsServer.onerror = function (e) { //错误情况触发
    // if(error){
    //     error(e);
    // }     
}

exports.socket=function(mt, d, res = false, error = false, p) {
    // 如果没有传p
    if(!p){
        p=mt+JSON.stringify(d)+new Date().getTime();
    }
    var mt = mt.split('@');
    //发送消息并绑定回调函数
    var data = {
        s: mt[0],
        r: mt[1],
        d: d,
        p: p,
        sid: 'd712da1d9fa5238aa54149ef44b45c10'
    }
    var receive = function (d) {
        var res_data = JSON.parse(d.data);
        if(p==res_data.p){
            //如果成功
            if (!JSON.parse(d.data).e) {         
                res(JSON.parse(d.data));
            } else {
                error(JSON.parse(d.data));
            }
            wsServer.removeEventListener("message", receive);
        }
    }
    wsServer.addEventListener('message', receive);
    try {
        data = JSON.stringify(data);
    } catch (err) {
        return false;
    }
    if(wsServer.readyState==1){
        wsServer.send(data);
    }else{
        wsServer.addEventListener('open', function () {
            wsServer.send(data);
        });
    }
}