var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
var fs = require("fs");
var path = require('path')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//1）进入商品发布列表页面
router.get("/list", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "roles": [1, 2, 3, 4]
    })
    res.send(data);
});


//2）查询商品列表
router.get("/list/query", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|1": [{
                "res": "s",
                "data|10": [{
                        "id_goods": 0,
                        "id_goods_revision": 135,
                        "name_goods": "服务器测试",
                        "state_goods|+1": 1,
                        "type_goods": 3,
                        "revision": 1,
                        "ltm_last_save": 1520840141957,
                        "ltm_audit": 0,
                        "name_pic_small": "180313a8hlgfwny2.png",
                        "price_low": 23,
                        "price_high": 32,
                        "quantity_enable_low": 123,
                        "quantity_enable_high": 333,
                        "id_company": 0
                    },
                    // {
                    //     "id_goods": 0,
                    //     "id_goods_revision": 136,
                    //     "name_goods": "hhh",
                    //     "state_goods": 3,
                    //     "type_goods": 1,
                    //     "revision": 1,
                    //     "ltm_last_save": 1520935583456,
                    //     "ltm_audit": 0,
                    //     "name_pic_small": "1803132uhaprejnu.png",
                    //     "price_low": 111,
                    //     "price_high": 444,
                    //     "quantity_enable_low": 111,
                    //     "quantity_enable_high": 444,
                    //     "id_company": 0
                    // }
                ]
            },
            // {
            //     "res": "f",
            //     "msg": "xxxx"
            // }
        ]
    })
    res.send(data.array);
});

//3）根据草稿id获取草稿-预览时调用
router.get("/getdraft/:id", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|1": [{
                "res": "s",
                "data": {
                    "id": 136,
                    "id_goods": 0,
                    "name_goods": "hhh",
                    "state_goods": 1,
                    "type_goods": 1,
                    "revision": 1,
                    "id_company": 7,
                    "ltm_audit": 0,
                    "state_put_on": 0,
                    "ltm_last_save": 1520935583456
                },
            },
            {
                "res": 'f',
                "msg": 'xxx'
            }
        ]
    })
    res.send(data);
});


//4）根据草稿id获取已发布的商品-查看详情时获取
router.get("/getgoods/:id", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "array|1": [{
                "res": "s",
                "data": {
                    "id": 136,
                    "id_goods": 0,
                    "name_goods": "ic芯片名称",
                    "state_goods": 1,
                    "type_goods": 1,
                    "revision": 1,
                    "id_company": 7,
                    "ltm_audit": 0,
                    "state_put_on": 0,
                    "ltm_last_save": 1520935583456
                }
            },
            // {
            //     "res": 'f',
            //     "msg": 'xxx'
            // }
        ]
    })
    res.send(data.array);
});

//5）进入预览商品页面
router.get("/preview/:id", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "roles": [1, 2, 3, 4]
    })
    res.send(data);
});


//6）进入查看商品详情页面
router.get("/detail/:id", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = Mock.mock({
        "roles": [1, 2, 3, 4]
    })
    res.send(data);
});



// 7)根据图片获取base64数据 filename
router.get("/picture", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        var img_base;
        var PAGE_PATH = path.resolve(__dirname, '../static/img/' + req.query.filename)
        var imageBuf = fs.readFileSync(PAGE_PATH);
        var img_base = imageBuf.toString("base64")
        var data = {
            "res": 's',
            "data": img_base
        }
        res.send(data);
    } catch (err) {
        var data = {
            "res": 'f',
            "msg": err
        }
        res.send(data);
    }

})



// 8)获取商品预览图的缩略图数据
router.get("/pics/:id", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        var img_base;
        // var PAGE_PATH = path.resolve(__dirname, '../static/img/product_small_01.png')
        // var imageBuf = fs.readFileSync(PAGE_PATH);
        // var img_base = imageBuf.toString("base64")
        var data = {
            "res": 's',
            "data": [{
                "pic_name": "product_small_01.png",
                "img_data": tobase64('product_small_01.png')
            }, {
                "pic_name": "product_small_02.png",
                "img_data": tobase64('product_small_02.png')
            }, {
                "pic_name": "product_small_03.png",
                "img_data": tobase64('product_small_03.png')
            }]
        }
        res.send(data);
    } catch (err) {
        throw err
    }
})
//根据文件名称获取base
function tobase64(name) {
    var PAGE_PATH = path.resolve(__dirname, '../static/img/' + name)
    var imageBuf = fs.readFileSync(PAGE_PATH);
    var img_base = imageBuf.toString("base64")
    return img_base;
}

// 9)创建商品
router.post("/create", function (req, res, next) {
    // {
    //     "name_goods": "前端接口测试",
    //     "type_goods": 1,
    //     "id_company": 1
    //   }
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "data": {
            "id": 138,
            "id_goods": 0,
            "name_goods": "前端接口测试",
            "state_goods": 1,
            "type_goods": req.body.type_goods, //普通商品：1、竞价拍卖：3
            "revision": 1,
            "id_company": 13,
            "ltm_audit": 0,
            "state_put_on": 0,
            "ltm_last_save": 1522743039718
        }
    }
    res.send(data);
})



// 10)修改商品
router.post("/update", function (req, res, next) {
    // {
    //     "name_goods": "前端接口测试123",
    //     "id": 10
    //   }
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "data": {
            "id": 10,
            "id_goods": 0,
            "name_goods": "前端接口测试123",
            "state_goods": 1,
            "type_goods": 1,
            "revision": 1,
            "id_company": 7,
            "ltm_audit": 0,
            "state_put_on": 0,
            "ltm_last_save": 1520840141957
        }
    }
    res.send(data);
})

// 11)商品上架
router.post("/puton/:id/:time", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "data": {
            "id": 10,
            "id_goods": 0,
            "name_goods": "前端接口测试123",
            "state_goods": 1,
            "type_goods": 1,
            "revision": 1,
            "id_company": 7,
            "ltm_audit": 0,
            "state_put_on": 0,
            "ltm_last_save": 1520840141957
        }
    }
    res.send(data);
})




// 12) 上传商品预览图
router.post("/pic/:id/:index", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "data": '文件名称'
    }
    res.send(data);
})

//普通商品接口

//1) 进入创建新的普通商品或编辑普通商品页面
router.get('/comm/edit', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "roles": [3, 4, 1, 2]
    }
    res.send(data);
});

//2) 获取商品关联的物流模板
router.get('/get/deliver/:id', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "data": {
            "uid": 24,
            "id": 66,
            "name_deliver": "模版a",
            "location_goods": 340500,
            "promise_send_out": 3,
            "is_free": 0,
            "id_company": 7,
            "ltm_last_save": 1517469327346,
            "vendors": [{
                    "id_vendor": 1,
                    "cost_default": 10,
                    "cost_free_default": 1000,
                    "is_free_default": 0,
                    "is_delete": 0,
                    "groups": [{
                            "ids_division": [
                                110000,
                                120000,
                                130000,
                                150000
                            ],
                            "id_division_group": 0,
                            "cost": 1,
                            "cost_free": 100,
                            "is_free": 0
                        },
                        {
                            "ids_division": [
                                140000,
                                210000
                            ],
                            "id_division_group": 1,
                            "cost": 15,
                            "cost_free": 2000,
                            "is_free": 0
                        }
                    ]
                },
                {
                    "id_vendor": 2,
                    "cost_default": 15,
                    "cost_free_default": 1555,
                    "is_free_default": 0,
                    "is_delete": 0,
                    "groups": [{
                        "ids_division": [
                            120000
                        ],
                        "id_division_group": 0,
                        "cost": 11,
                        "cost_free": 1,
                        "is_free": 0
                    }]
                }
            ]
        }
    }
    res.send(data)
})

module.exports = router;