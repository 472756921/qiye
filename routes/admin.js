
var Admin = require('../controller/admin/admin');


module.exports = function(app) {

  //跳转到登录页面
  app.get('/login',Admin.login);
  //跳转到登录页面
  app.get('/register',Admin.register);
  // 后台首页
  app.get('/admin', Admin.admin);

  //添加新闻
  app.post('/admin/add_news', Admin.add_news);
  //分页获取新闻
  app.post('/admin/get_news', Admin.get_news);
  //查看新闻详情
  app.post('/admin/news_content', Admin.get_news_detail);
  //删除新闻
  app.post('/admin/news_del', Admin.del_one);

  //添加工程案例
  app.post('/admin/add_Ens', Admin.add_Ens);
  //分页获取工程案例
  app.post('/admin/get_Ens', Admin.get_Ens);
  //查看工程案例详情
  app.post('/admin/Ens_content', Admin.get_Ens_detail);
  //删除工程案例
  app.post('/admin/Ens_del', Admin.Ens_del_one);

  //添加产品
  app.post('/admin/add_Prs', Admin.add_Prs);
  //分页获取产品
  app.post('/admin/get_Prs', Admin.get_Prs);
  //查看产品详情
  app.post('/admin/Prs_content', Admin.get_Prs_detail);
  //删除产品
  app.post('/admin/Prs_del', Admin.Prs_del_one);

  //添加关于我们
  app.post('/admin/add_abuous', Admin.add_about);
  //查询关于我们
  app.post('/admin/find_about', Admin.find_about);

  //添加招聘
  app.post('/admin/add_recruit', Admin.add_recruit);
  //获取招聘信息
  app.post('/admin/get_recruits', Admin.get_recruits);
  //查看招聘详情
  app.post('/admin/recruit_content', Admin.get_recruit_content);
  //查看招聘
  app.post('/admin/recruit_del', Admin.del_recruit);

  //添加离职公示
  app.post('/admin/add_quit', Admin.add_quit);
  //分页获取离职公示
  app.post('/admin/get_quits', Admin.get_quits);
  //删除离职公示
  app.post('/admin/quit_del', Admin.del_quit);

  //添加管理员
  app.post('/admin/post_user', Admin.add_admin);
  //分页获取管理员
  app.post('/admin/get_users', Admin.get_users);
  //删除管理员信息
  app.post('/admin/user_del', Admin.user_del);

  //提交登录信息，实现登录信息校验
  app.post('/login',Admin.checkUser);
  //提交注册信息，实现注册校验
  app.post('/register',Admin.post_register);
  //用户登出操作
  app.get('/logout',Admin.logout);
  //给新注册的用户授权
  app.post('/authorize',Admin.authorize);



  //分页获取用户反馈信息
  app.post('/admin/get_feedbacks',Admin.get_feedbacks);
  //分页获取用户反馈信息
  app.post('/admin/deal_feedbacks',Admin.deal_feedbacks);

  //后台主页校验是否有未处理的反馈信息
  app.get('/admin/check_feedbacks', Admin.check_feedbacks);


};
