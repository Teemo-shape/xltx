var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

//1,进入内部成员列表页面
router.get('/index', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "form_token": "47219595-ea94-4c93-9906-2886dc79c02d",
        "roles": null,
    }
    res.send(data);
});

//2,获取本公司内部成员列表
router.get('/list', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "uid": "wa%2B4hus8Rzo0d9HGxVb84Q%3D%3D",
        "res": "s",
        "members": [{
                "uid": 0,
                "is_manager": 0,
                "user_status": 2,
                "id_member": "wa%2B4hus8Rzo0d9HGxVb84Q%3D%3D",
                "uname": "hhj",
                "email": null,
                "user_roles": null,
                "names_permission": "已实名认证用户,公司管理员,交易员",
                "ids_permission": [
                    1,
                    2,
                    3
                ],
                "status": "已加入"
            },
            {
                "uid": 0,
                "is_manager": 0,
                "user_status": 2,
                "id_member": "ee6yIFI5mXHb6jCdWDnh6Q%3D%3D",
                "uname": "jaredHe",
                "email": null,
                "user_roles": null,
                "names_permission": "审核员,系统管理员",
                "ids_permission": [
                    4,
                    5
                ],
                "status": "已加入"
            },
            {
                "uid": 0,
                "is_manager": 0,
                "user_status": 2,
                "id_member": "ODFGiupqlvwloLeaH9kNVA%3D%3D",
                "uname": "taoyc",
                "email": null,
                "user_roles": null,
                "names_permission": "交易员,审核员,系统管理员",
                "ids_permission": [
                    3,
                    4,
                    5
                ],
                "status": "已加入"
            },
            {
                "uid": 0,
                "is_manager": 1,
                "user_status": 2,
                "id_member": "wQLUouj3a4zJqvg1IztZfw%3D%3D",
                "uname": "13456298761",
                "email": null,
                "user_roles": null,
                "names_permission": "审核员",
                "ids_permission": [
                    4
                ],
                "status": "已加入"
            },
            {
                "uid": 0,
                "is_manager": 0,
                "user_status": 2,
                "id_member": "ZsONjH%2FV%2BBsn1Da8mPfY2A%3D%3D",
                "uname": "15345426445",
                "email": null,
                "user_roles": null,
                "names_permission": "审核员,系统管理员",
                "ids_permission": [
                    4,
                    5
                ],
                "status": "已加入"
            },
            {
                "uid": 0,
                "is_manager": 0,
                "user_status": 1,
                "id_member": "WxjgFqeQJtrEM8eJRYO61w%3D%3D",
                "uname": "1015275420",
                "email": null,
                "user_roles": [],
                "names_permission": null,
                "ids_permission": null,
                "status": "邀请中"
            }
        ]
    }
    res.send(data);
});

//3,被邀请用户同意加入公司
router.get('/join/init/psw', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|1": [{
                "res": "s",
            },
            // {
            //     "res": "f",
            //     "msg": '邮件已过期,请重新获取邮件!' 
            // }
        ]
    })
    res.send(data.array);
});

//4) 进入个人信息页面
router.get('/info/page', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "form_token": "0fbf6f67-165f-4cc1-9d8d-79d2ab17b854",
        "roles": [
            3,
            4,
            1,
            2
        ]
    }
    res.send(data);
});

//5) 获取房钱用户个人信息
router.get('/info', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "user": {
            "id": 24,
            "uname": "发反反复复方芳",
            "upwd": null,
            "uphone": "15013770054",
            "uemail": "503329706@qq.com",
            "is_final_user": 1,
            "state_email": 1,
            "at_ltm_join": 1513647484172,
            "errcode": null,
            "msg": null
        },
        "wechat_img": "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAABgElEQVR42u3bWxaCMAwFQPa/ad0CbW5LCtNPjyCMx5BHvX7W7XUhgAULFixYsBDAggUL1oexrtoaOs+dN6+7Qliw+mON/cJHjpq+gW1XCAtWN6yhoDN0wmKAS10hLFivx0qJwIIFaw/W0HlgwfoOVvGodYnCC8sdWLDW9LPWvfLC5h8sWNnpyFQ2UGx1nToKgwXr9k2m6t7iA7516gALVjRmFWvaucBUHLIWQWHBaoI19/BOTXfWZR67AzwsWNtTh2eT+2D9DAtWc6wNGUPxszqmDrBgrZnupLbJzvWOU18wLFj9sVJ704tzmnjEhAXrIKx4G7dYoscjHSxYR2OlIlSxAFg6moUF60Gs1IqLbIiPsGA1wdqwr+7Z/YKwYB2EVYxQ65pfhzX/YMGKZvA7+8KpiPlYIQ0LVkusuSCY2utwWMyCBSuBVayoU5UALFjvwIo3o+Ot51QlAAtWN6xiDl3sMRUD5e5CGhaslv++P33BggULFixYFixYsGDBgmX9ATmGSjeLkbQNAAAAAElFTkSuQmCC"
    }
    res.send(data)
})


//6) 修改当前用户名字
router.post('/update/name', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "msg": "名字修改成功！",
        "res": "s",
        "data": "hhj"
    }
    res.send(data)
})

//7)  进入修改密码界面
router.get('/update/psw', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "form_token": "0fbf6f67-165f-4cc1-9d8d-79d2ab17b854",
        "roles": [
            3,
            4,
            1,
            2
        ]
    }
    res.send(data)
})

//8) 修改密码
router.post('/update/psw', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "msg": '密码修改成功!',
        'res': 's'
    }
    res.send(data)
})

//9) 进入绑定/修改手机界面
router.get('/bindedit/phone', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "form_token": "402a9f95-c66d-48a5-bd18-c19f95b3073d",
        "roles": [
            3,
            4,
            1,
            2
        ]
    }
    res.send(data)
})

//10 ) 绑定/修改手机
router.post('/bindedit/phone', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        'msg':'手机修改成功!',
        'res':'s'
    }
    res.send(data)
})

//11) 进入(修改)邮箱页面
router.get('/bindedit/email', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "form_token": "0fbf6f67-165f-4cc1-9d8d-79d2ab17b854",
        "roles": [
            3,
            4,
            1,
            2
        ]
    }
    res.send(data)
})

//12) 发送修改邮箱验证邮件
router.get('/send/:email/index', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        'res':'s'
    }
    res.send(data)
})

//13 ) 绑定修改邮箱提交
router.post('/bindedit/email', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        'res':'s'
    }
    res.send(data)
})

//14

module.exports = router;