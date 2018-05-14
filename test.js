const assert = require('assert');
const socket = require('./socket').socket;
/**
 * 在用例集函数或者用例函数后边添加.only()可以让mocha只执行此用例集或用例
 * 和加上.only()相反，在用例集函数或者用例函数后边加.skip()，可以跳过此用例集或用例的执行。跳过的用例会被标记为pending的用例，在报告中也会作为pending用例体现出来。
 */
describe("yikemeng-ws", function () {
    /* 用户服务 */
    describe("用户服务",function(){
        // 公共接口
        describe("公共接口",function(){
            it('登录', function (done) {
                socket("user@/index/login", {
                    username: "admin",
                    password: "123456"
                }, (res) => {         
                    assert.strictEqual(res.d, 1);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('是否登录', function (done) {
                socket("user@/index/islogin", {

                }, (res) => {         
                    assert.strictEqual(res.d, 1);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
        })
    })

    /* RABC */ 
    describe.skip("RABC",function(){
        //资源
        describe("资源",function(){
            it('资源列表', function (done) {
                socket("rbac@/demo/userid", {

                }, (res) => {         
                    assert.strictEqual(res.m, '成功');
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('增加资源',function (done){
                socket("rbac@/resources/add_resources", {
                    pid: "1",
                    name: "test",
                    title: "标题",
                    describe: "资源描述"
                }, (res) => {         
                    assert.strictEqual(res.d, true);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('单个资源信息', function (done) {
                socket("rbac@/resources/resources_info", {
                    id:113
                }, (res) => {         
                    assert.strictEqual(res.m,'成功');
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('编辑资源',function (done){
                socket("rbac@/resources/edit_resources", {
                    id: "113",
                    pid: "1",
                    name: "rbacasdf",
                    title: "权限控制",
                    describe: "权限控制模块\r\n"
                }, (res) => {         
                    assert.strictEqual(res.d, true);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('删除资源',function(done){
                socket("rbac@/resources/del_resources",{
                    id:"115"
                },(res)=>{
                    assert.strictEqual(res.d,true);
                    done();
                },error=>{
                    console.log(error)
                })
            })
        })

        //权限
        describe("权限",function(){
            it('权限列表',function(done){
                socket("rbac@/Authority/auth_list",{
                    role_id:"98"
                },(res)=>{
                    assert.strictEqual(res.m,'成功');
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('增加权限',function(done){
                socket("rbac@/Authority/add_auth",{
                    "title": "标题",
                    "role": "98",
                    "resources": "1",
                    "description": "description",
                    "type": "1",
                    "status": "1"
                },(res)=>{
                    assert.strictEqual(res.d,true);
                    done();
                },error=>{
                    console.log(error)
                })
            })
        })

        //角色
        describe("角色",function(){
            it('角色列表',function(done){
                socket("rbac@/role/role_list",{
                    
                },(res)=>{
                    assert.strictEqual(res.m,'成功');
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('增加角色',function(done){
                socket("rbac@/role/add_role", {
                    "identification": "demo01",
                    "name": "测试橘色",
                    "sort": "1",
                    "status": "1",
                    "pid": "0",
                    "can_delete": "0"
                },(res)=>{
                    assert.strictEqual(res.d,true);
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('单条角色信息',function(done){
                socket("rbac@/role/role_info", {
                    "id":"104"
                    },(res)=>{
                    assert.strictEqual(res.m,'成功');
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('编辑角色',function(done){
                socket("rbac@/role/edit_role", {
                    "id": "104",
                    "identification": "demo02",
                    "name": "测试橘色",
                    "sort": "1",
                    "status": "1",
                    "pid": "0",
                    "can_delete": "0"
                },(res)=>{
                    assert.strictEqual(res.d,true);
                    done();
                },error=>{
                    console.log(error)
                })
            })
        })

        //用户
        describe("用户",function(){
            it('角色用户列表',function(done){
                socket("rbac@/user/role_user_list", {
                    "p":"1",
                    "role_id":"98"
                    },(res)=>{
                    assert.strictEqual(res.m,'成功');
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('判断用户角色',function(done){
                socket("rbac@/user/role_user_is", {
                    "p": "1",
                    "role_name": "demo02"
                },(res)=>{
                    assert.strictEqual(res.m,'成功');
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('增加用户的角色',function(done){
                socket("rbac@/user/user_add_role", {
                    "user_id":"40",
                    "role_id":"1"
                },(res)=>{
                    assert.strictEqual(res.d,true);
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('清空角色的用户信息',function(done){
                socket("rbac@/user/empty_user_role", {
                    "role_id":"104"
                },(res)=>{
                    assert.strictEqual(res.d,true);
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('删除 用户的角色',function(done){
                socket("rbac@/user/user_del_role", {
                    "user_id":"1",
                    "role_id":"104"
                },(res)=>{
                    assert.strictEqual(res.d,true);
                    done();
                },error=>{
                    console.log(error)
                })
            })
            it('用户角色列表',function(done){
                socket("rbac@/user/user_role_list", {
                    "user_id":"40"
                },(res)=>{
                    assert.strictEqual(res.m,'成功');
                    done();
                },error=>{
                    console.log(error)
                })
            })
        })

        //管理
        describe("管理",function(){
            it('刷新缓存',function(done){
                socket("rbac@/admin/updateCache", {
                    
                },(res)=>{
                    assert.strictEqual(res.m,'成功');
                    done();
                },error=>{
                    console.log(error)
                })
            })
        })
    })

    /* 文件分组 */
    describe.skip("文件分组",function(){
        //用户相关
        describe("用户相关",function(){
            it('我的文件', function (done) {
                socket("file@/user/my", {
                    
                }, (res) => {         
                    assert.strictEqual(res.m,'成功');
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('追加文件集合', function (done) {
                socket("file@/user/array_additional", {
                    "index": "235",
                    "file_list": [
                        626,
                        625
                    ]
                }, (res) => {         
                    assert.strictEqual(res.d,true);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
        })

        //服务相关
        describe("服务相关",function(){
            it('创建一个文件集合', function (done) {
                socket("file@/server/create_array", {
                    "server_name": "article",
                    "re_id": "article_1",
                }, (res) => {         
                    assert.strictEqual(res.d,true);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
        })
    })

    /* 文章分组 */
    describe.skip("文章分组",function(){
        //用户相关
        describe("用户相关",function(){
            it('article 获取一个草稿', function (done) {
                socket("article@/user/manuscript", {
                    "type":"demo"
                }, (res) => {         
                    assert.strictEqual(res.m,'成功');
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
        })

        //文章相关
        describe("文章相关",function(){
            it('保存草稿文章save_article', function (done) {
                socket("article@/user/save_article", {
                    "id":"2",
                    "content":"Lg=="
                }, (res) => {         
                    assert.strictEqual(res.d,true);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('获取文章信息', function (done) {
                socket("article@/user/info_article", {
                    "id": "3",
                    "type": "demo"
                }, (res) => {         
                    assert.strictEqual(res.m,'成功');
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
        })
    })

    /* CMS */
    describe.skip("CMS",function(){
        //分类频道
        describe("分类频道",function(){
            it('cms 分类频道的列表', function (done) {
                socket("cms@/cate/index", {
                    
                }, (res) => {         
                    assert.strictEqual(res.m,'成功');
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('cms 分类频道的 创建', function (done) {
                socket("cms@/cate/create", {
                    "name": "demo",
                    "title": "测试",
                    "pid": "0",
                    "sort": "0",
                    "meta_title": "测试",
                    "keywords": "测试",
                    "description": "测试的描述",
                    "allow_publish": "1",
                    "display": "1",
                    "check": "1",
                    "create_time": "0",
                    "update_time": "0",
                    "status": "1"
                }, (res) => {         
                    assert.strictEqual(res.d,true);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('cms 分类频道 信息', function (done) {
                socket("cms@/cate/info", {
                    "id":"22"               
                }, (res) => {         
                    assert.strictEqual(res.m,'成功');
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('cms 分类频道 编辑', function (done) {
                socket("cms@/cate/edit", {
                    "id": "17",
                    "name": "demo",
                    "title": "测试",
                    "pid": "0",
                    "sort": "0",
                    "meta_title": "测试",
                    "keywords": "测试",
                    "description": "测试的描述",
                    "allow_publish": "1",
                    "display": "1",
                    "check": "1",
                    "create_time": "0",
                    "update_time": "0",
                    "status": "1"
                }, (res) => {         
                    assert.strictEqual(res.d,true);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
            it('cms 分类频道 dele', function (done) {
                socket("cms@/cate/dele", {
                    "id": "17"                 
                }, (res) => {         
                    assert.strictEqual(res.d,true);
                    done(); 
                },error=>{
                    console.log(error)
                })
            })
        })
    })
})