var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//account/register
//1,进入注册界面
router.get('/register', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = {
    "form_token": "ec2f10e5-2185-44c6-8fa7-f66834d51f3a",
    "roles": null,
  }
  res.send(data);
});



//account/register
//2,注册
router.post('/register', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": 's'
      },
      {
          "msg": "手机验证码已过期，请重新获取！",
          "form_token": "2a37b75d-d48a-457d-9065-12d9f48c3695",
          "res": "f"
      }
    ]
  })
  res.send(data.array);
});

//account/register
//3验证手机号是否可以注册
router.get('/mobile/exist/:phone', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|1": [
      {
        "msg": "手机号未占用!",
        "res": "s",
        "data": "0"
      },
      {
          "msg": "手机号已被占用!",
          "res": "s",
          "data": "1"
      },
      {
          "msg": "手机号格式错误！",
          "res": "f"
      }
    ]
  })
  res.send(data.array);
});

//account/register
//4获取手机验证码
router.get('/send/sms/:phone', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s",
        "time": 57
      },
      {
          "res": "f",
          "msg": "发送验证码失败，检查手机号后重试！"
      }
    ]
  })
  res.send(data.array);
});


//account/login
//5,登录
router.post('/login', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s",
      },
      {
          "res": "f",
          "msg": "请输入正确的手机号或邮箱!"
      }
    ]
  })
  res.send(data.array);
});


//account/login
//6,退出登录
router.get('/logout', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s",
      },
      {
          "res": "f",
          "msg": "退出登录出错,请刷新后重试!"
      }
    ]
  })
  res.send(data.array);
});



//7）发送重置密码邮件
router.get("/reset/psw/send/:email/*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s",
      },
      {
          "res": "f",
          "msg" : "邮件发送失败!"
      }
    ]
  })

//   var nodemailer = require('nodemailer');
//   var transporter = nodemailer.createTransport({
//     //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
//     service: 'qq',
//     port: 465, // SMTP 端口
//     secureConnection: true, // 使用 SSL
//     auth: {
//       user: '503329706@qq.com',
//       //这里密码不是qq密码，是你设置的smtp密码
//       pass: 'skcikbbrvcdibibi'
//     }
//   });

//   // NB! No need to recreate the transporter object. You can use
//   // the same transporter object for all e-mails

//   // setup e-mail data with unicode symbols
//   var mailOptions = {
//     from: '503329706@qq.com', // 发件地址
//     to: req.params.email, // 收件列表
//     subject: 'xltx模拟', // 标题
//     //text和html两者只支持一种
//     text: 'xltx模拟', // 标题
//     html: 'http://192.168.1.132/account/valid_mail.html?token=cR5aypxrtIqwuvNbMes4AvGHmOQ9NvZliKwRgf7h0z0%3D' // html 内容
//   };

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);

//   });
  res.send(data.array);
});


//8）重置密码校验手机验证码
router.post("/reset/psw/valid/mobile", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s",
        "UID": "4234234234adf"
      },
      {
          "msg": "手机验证码已过期，请重新获取！",
          "res": "f"
      }
    ]
  })
  res.send(data.array);
});

//9）重置密码校验邮箱内token合法性
router.get("/reset/psw/email/valid/*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s",
        "uid": "4234234234adf"
      },
      {
        "res": "f",
        "msg": "邮件已过期，请重新获取邮件!"
      }
    ]
  })
  res.send(data.array);
});


//10）重置密码获取用户的密保问题
router.get("/reset/psw/security/get/question", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "questions": [{
            "uid": 0,
            "question_id": 2,
            "question_detail": "你的第一辆车的型号？",
            "answer_detail": "bw",
            "at_ltm_create": 1521532561628
          },
          {
            "uid": 0,
            "question_id": 3,
            "question_detail": "你的班主任老师是？",
            "answer_detail": "ws",
            "at_ltm_create": 1521532561628
          }
        ],
        "res": "s",
        "uid": "wa+4hus8Rzo0d9HGxVb84Q=="
      },
      {
        "msg": "账号不存在!",
        "res": "f"
      }
    ]
  })
  res.send(data.array);
});


//11）重置密码验证密保答案
router.post("/reset/psw/valid/security", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s"
      },
      {
        "msg": "非法用户",
        "res": "s"
      }
    ]
  })
  res.send(data.array);
});


//12）进入重置密码界面
router.post("/reset/psw", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
      "res": "s",
      "form_token": "d25f2c5a-57b8-45e3-b34f-e895e0951151"
    }, ]
  })
  res.send(data.array);
});


//13）重置密码
router.post("/reset/psw", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s"
      },
      {
        "msg": "两次输入密码不一致!",
        "res": "f",
        "form_token": "55407363-c223-4e6a-a1a8-0cf35bb295af"
      }
    ]
  })
  res.send(data.array);
});


//14）微信登录
router.get("wechat/login", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s"
      },
      {
        "msg": "获取微信授权失败!!",
        "res": "f",
      }
    ]
  })
  res.send(data.array);
});

//15）检测账号是否存在
router.get("/exist/:phone", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var data = Mock.mock({
    "array|+1": [{
        "res": "s",
        "msg": "账号已存在!",
        "data": "1"
      },
      {
        "res": "s",
        "msg": "账号不存在!",
        "data": "0"
      },
      {
        "msg": "请输入正确的手机号或邮箱!",
        "res": "f",
      }
    ]
  })
  res.send(data.array);
});




module.exports = router;