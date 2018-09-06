/**
 * Created by 1 on 2016/5/16.
 */
// index page
var fs = require('fs');


var mongoose=require('mongoose');

var News =mongoose.model('News');
var Recruit =mongoose.model('Recruit');
var Quit =mongoose.model('Quit');
var User=mongoose.model('User');
var Feedback=mongoose.model('Feedback');

var Ens =mongoose.model('Ens');
var Prs =mongoose.model('Prs');
var ABU =mongoose.model('ABU');

// 首页
exports.admin = function(req, res) {
    var isSuper='普通管理员'
    if(req.session.user.status==='2'){
        isSuper='超级管理员'
    }
    res.render('admin/index',{username:req.session.user.username,isSuper:isSuper});
};
// 添加关于我们
exports.add_about = function(req, res) {
    var content=req.body.content;
    ABU.update({'_id':'5b7f7888824089226c4d72aa'}, {$set:{"content":content}},function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
};
// 查询关于我们
exports.find_about = function(req, res) {
    ABU.find(function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc})
        }
    });
};

// 添加新闻
exports.add_news = function(req, res) {
    var title=req.body.title;
    var time=req.body.time;
    var from=req.body.from;
    var category=req.body.category;
    var content=req.body.content;

    var data=new News(
        {
            title:title,
            time:time,
            from:from,
            category:category,
            content:content
        }
    );
    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
};
// 分页获取新闻
exports.get_news = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=News.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            News.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};
//获取新闻详情
exports.get_news_detail = function(req, res) {

    var id=req.body.id;
    News.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc.content})
        }
    });
};
//删除一个新闻
exports.del_one= function(req, res) {
    var id=req.body.id;
    News.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });

};

// 添加工程案例
exports.add_Ens = function(req, res) {
    var title = req.body.title;
    var time = req.body.time;
    var sgsp = req.body.sgsp;
    var headimg = req.body.headimg;
    var content = req.body.content;
    var d = Date.now();
    var path = '/alidata/zm/public/web/images/up/'+ d +'.png';    //从app.js级开始找
    var name = '/web/images/up/'+ d +'.png';    //从app.js级开始找
    var base64 = headimg.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
        if(err){
            console.log(err);
            res.json({"status":"error_write", mgs: err});
        }else{
            data.save(function(err){
                if(err){
                    res.json({"status":"error_save", mgs: err});
                }else{
                    res.json({"status":"success"});
                }
            });
        }
    })

    var data=new Ens(
        {
            title:title,
            time:time,
            headimg: name,
            sgsp: sgsp,
            content:content
        }
    );


};
// 分页获取工程案例
exports.get_Ens = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=Ens.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Ens.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};
//获取工程案例详情
exports.get_Ens_detail = function(req, res) {
    var id=req.body.id;
    Ens.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc})
        }
    });
};
//删除一个工程案例
exports.Ens_del_one= function(req, res) {
    var id=req.body.id;
    Ens.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error", err: err});
        }else{
            res.json({"status":"success", err: err})
        }
    });

};

// 添加产品
exports.add_Prs = function(req, res) {
    var title = req.body.title;
    var time = req.body.time;
    var headimg = req.body.headimg;
    var content = req.body.content;
    var d = Date.now();
    var path = '/alidata/zm/public/web/images/up/'+ d +'.png';    //从app.js级开始找
    var name = '/web/images/up/'+ d +'.png';    //从app.js级开始找
    var base64 = headimg.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
        if(err){
            console.log(err);
            res.json({"status":"error_write", mgs: err});
        }else{
            data.save(function(err){
                if(err){
                    res.json({"status":"error_save", mgs: err});
                }else{
                    res.json({"status":"success"});
                }
            });
        }
    })

    var data=new Prs(
        {
            title:title,
            time:time,
            headimg: name,
            content:content
        }
    );


};
// 分页获取产品
exports.get_Prs = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=Prs.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Prs.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};
//获取产品详情
exports.get_Prs_detail = function(req, res) {
    var id=req.body.id;
    Prs.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc.content})
        }
    });
};
//删除一个产品
exports.Prs_del_one= function(req, res) {
    var id=req.body.id;
    Prs.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error", err: err});
        }else{
            res.json({"status":"success", err: err})
        }
    });

};

// 添加招聘
exports.add_recruit = function(req, res) {
    var position=req.body.position;
    var time=req.body.time;
    var department=req.body.department;
    var category=req.body.category;
    var requirement=req.body.requirement;

    var data=new Recruit(
        {
            position:position,
            time:time,
            department:department,
            category:category,
            requirement:requirement
        }
    );
    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
};
// 分页获取招聘信息
exports.get_recruits = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=Recruit.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Recruit.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};
//获取招聘信息详情
exports.get_recruit_content = function(req, res) {

    var id=req.body.id;
    Recruit.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc.requirement})
        }
    });
};
//删除一个招聘信息
exports.del_recruit= function(req, res) {
    var id=req.body.id;
    Recruit.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });

};

// 添加离职公示
exports.add_quit= function(req, res) {
    var name=req.body.name;
    var time=req.body.time;
    var department=req.body.department;

    var data=new Quit(
        {
            name:name,
            time:time,
            department:department
        }
    );
    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
};
// 分页获取离职公示
exports.get_quits = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=Quit.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Quit.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};
//删除一个离职公告
exports.del_quit= function(req, res) {
    var id=req.body.id;
    Quit.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });

};

// 进入登录页面
exports.login = function(req, res) {
    res.render('admin/login');
};
// 进入登录页面
exports.register = function(req, res) {
    res.render('admin/register');
};

// post登录信息，校验
exports.checkUser = function(req, res) {
    var username=req.body.username;
    var password=req.body.password;
    var captcha=req.body.captcha;
    if(captcha.toLowerCase()!=req.session.captcha.toLowerCase()){
        console.log('captcha error');
        res.json({'status':'captcha error'});
    }else{ //验证码正确
        User.findOne({username:username},function(err,doc){
            if(err){
                console.log('error');
                res.json({'status':'error'});
            }
            else if(doc==null){
                console.log('not exist');
                res.json({'status':'not exist'});
            }else if(doc.status==='0'){
                //如果是刚注册的用户，还未授权无法登陆。
                console.log('unchecked');
                res.json({'status':'unchecked'});
            }else if(doc.password===password){
                console.log('success');
                //登录成功，将user保存到session中
                req.session.user = doc;
                res.json({'status':'success'});
            }else{
                console.log('password error');
                res.json({'status':'password error'});
            }
        });
    }
};
//用户登出操作
exports.logout = function(req, res) {
    req.session.user = null;
    res.redirect('/login');
};


//添加管理员
exports.post_register = function(req, res) {
    var username=req.body.username;
    var password=req.body.password;
    var realname=req.body.realname;
    var phone=req.body.phone;
    var captcha=req.body.captcha;

    if(captcha!=req.session.captcha){
        console.log('captcha error');
        res.json({'status':'captcha error'});
    }else{//验证码正确
        var user=new User(
            {
                username:username,
                password:password,
                realname:realname,
                phone:phone,
                status:'0'
            }
        );
        User.findOne({username:username},function(err,doc){
            if(err){
                res.json({'status':'error'});
            }
            else if(doc){
                res.json({'status':'user exist'});
            }else{
                User.create(user,function(err,doc){
                    if(err){
                        res.json({'status':'error'});
                    }
                    res.json({'status':'success'});
                });
            }
        });
    }

};

//确定授权
exports.authorize= function(req, res) {

    if(req.session.user.status!='2'){
        //0表示普通用户，1表示已授权普通用户，2表示高级用户
        res.json({"status":"noRight"});
    }else{
        var id=req.body.id;
        User.findOne({_id:id},function(err,doc){
            if(err){
                res.json({"status":"error"});
            }else {
                doc.status='1';
                //修改后必须的保存
                doc.save(function(err){
                    if(err){
                        res.json({"status":"error"})
                    }else{
                        res.json({"status":"success"});
                    }
                })
            }
        });
    }
};



//添加管理员（用于postMan测试，可删除）
exports.add_admin = function(req, res) {
    if(req.session.user.status!='2'){
        //0表示普通用户，1表示已授权普通用户，2表示高级用户
        res.json({"status":"noRight"});
    }else{
        //超级管理员有权利删除操作
        var username=req.body.username;
        var password=req.body.password;
        var realname=req.body.realname;
        var phone=req.body.phone;

        var user=new User(
            {
                username:username,
                password:password,
                realname:realname,
                phone:phone
            }
        );

        User.findOne({username:username},function(err,doc){
            if(err){
                res.json({'status':'error'});
            }
            else if(doc){
                res.json({'status':'user_exist'});
            }else{
                User.create(user,function(err,doc){
                    if(err){
                        res.json({'status':'error'});
                    }
                    res.json({'status':'success'});
                });
            }
        });
    }
};
// 分页获取离职公示
exports.get_users = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=User.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            User.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};
//删除一个管理员
exports.user_del= function(req, res) {

    if(req.session.user.status!='2'){
        //0表示普通用户，1表示已授权普通用户，2表示高级用户
        res.json({"status":"noRight"});
    }else{
        var id=req.body.id;
        User.remove({_id:id},function(err,doc){
            if(err){
                res.json({"status":"error"});
            }else{
                res.json({"status":"success"})
            }
        });
    }
};

// 分页获取离职公示
exports.get_feedbacks = function(req, res) {
    var curr=req.body.curr;
    //每页大小为10
    var query=Feedback.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            Feedback.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};

//通过_id反馈信息
exports.deal_feedbacks= function(req, res) {
    var id=req.body.id;
    Feedback.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            doc.status='1';
            //修改后必须的保存
            doc.save(function(err){
                if(err){
                    res.json({"status":"error"})
                }else{
                    res.json({"status":"success"});
                }
            })
        }
    });
};

//校验后台是否有未处理反馈信息
exports.check_feedbacks = function(req, res) {
    //计算未处理反馈信息条数
    Feedback.find({'status':'0'},function(err,result){
        if(err){
            res.json({'status':'error'});
        }else if(result.length===0){
            res.json({'status':'error'});
        }else{
            res.json({'status':'success','size':result.length});
        }
    });
};
