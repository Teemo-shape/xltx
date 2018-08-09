var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//实名认证相关接口

//1）进入实名认证页面
router.get("/index", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "form_token": "4507f297-e3ea-4bcf-8711-4943dca24c92",
        "roles": [1, 2, 3, 4]

    })
    res.send(data);
});



//2）获取实名认证状态
router.get("/state", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|+1": [
            {
                "res": "s",
                "cert": {
                    "id": 13,
                    "identify_type": 1,
                    "identify_state": -2,
                    "uid": 84,
                    "company_name": "wwerwew",
                    "cert_pic": "group1/M00/00/00/wKi1iFp1ILyAQqL-AAAUOxbTTOY067.jpg",
                    "bank_name": "hgsd",
                    "bank_card_id": "123123123123123",
                    "at_ltm_commit": 1516779690941,
                    "revision_no": 15,
                    "verify_attempts": 0,
                    "money_to_verify": 0.07,
                    "at_ltm_refuse": 0,
                    "refuse_details": "失败",
                    "at_ltm_expired": 0
                }
            },
            {
                "res": "s",
                "company": {
                    "uid": 24,
                    "company_id": 7,
                    "company_name": "芯联科技",
                    "is_manager": 1,
                    "user_status": 2,
                    "at_ltm_join": 1514940819546
                }
            },
            {
                "res": "s"
            }
        ]
    })
    res.send(data.array);
});

//3）获取实名认证草稿
router.get("/get/cert", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "img": "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",
        "cert": {
            "id": 13,
            "identify_type": 1,
            "identify_state": -1,
            "uid": 84,
            "company_name": "wwerwew",
            "cert_pic": "group1/M00/00/00/wKi1iFp1ILyAQqL-AAAUOxbTTOY067.jpg",
            "bank_name": "hgsd",
            "bank_card_id": "123123123123123",
            "at_ltm_commit": 1516779690941,
            "revision_no": 15,
            "verify_attempts": 0,
            "money_to_verify": 0.07,
            "at_ltm_refuse": 0,
            "refuse_details": "",
            "at_ltm_expired": 0
        }
    }
    res.send(data);
});


//4）判断公司名字是否已存在
router.get("/check/company/:name", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|+1": [{
                "res": "s",
                "is_exist": 0
            },
            {
                "msg": "公司已存在，请联系公司管理员",
                "res": "s",
                "is_exist": 1
            },
            {
                "msg": "错误信息",
                "res": "f",
            }
        ]
    })
    res.send(data.array);
});


//5）提交实名认证
router.post("/apply", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|+1": [{
                "res": "s",
                "msg": "业务操作成功"
            },
            {
                "msg": "请上传营业执照扫描件",
                "res": "f",
                "form_token": "b2574772-7dde-4fd8-bddf-e4706d30ec29"
            },
        ]
    })
    res.send(data.array);
});

//6）保存实名认证草稿
router.post("/draft", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|+1": [{
                "res": "s",
                "form_token": "23721014-afa0-4e18-8630-6b7faaf290f0",
                "msg": "业务操作成功"
            },
            {
                "msg": "您的实名认证申请无法更新",
                "res": "f",
                "form_token": "23721014-afa0-4e18-8630-6b7faaf290f0"
            }
        ]
    })
    res.send(data.array);
});


//7）实名认证确认金额
router.post("/config/money", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|+1": [{
                "msg": "业务操作成功",
                "res": "s"
            },
            {
                "msg": "企业实名认证不属于该用户",
                "res": "f"
            }
        ]
    })
    res.send(data.array);
});

module.exports = router;