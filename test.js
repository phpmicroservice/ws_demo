const assert = require('assert');
var WebSocket = require("ws");
var wsServer = new WebSocket("ws://192.168.1.220:34504/");
wsServer.onopen = function () {

}
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
describe("ws-api", function () {
    before(function (done) {
        setTimeout(function () {
            if (wsServer.readyState != 1) {
                console.log("链接超时");
            } else {
                done();
            }
        }, 1000)
    })
    it('login 39', function (done) {
        socket("user", "/index/login", {
            username: "demo01",
            password: "123456"
        }, (res) => {         
            assert.strictEqual(res.d, 39);
            done(); 
        })
    })
    it('is_login 39', function (done) {
        socket("user", "/index/islogin", {}, (res) => {        
            assert.strictEqual(res.d, 39);
            done();
        })
    })
})