var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
var path = require('path')
var fs = require("fs");
var multiparty = require('multiparty');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//拍卖商品接口
// 1）添加或修改拍卖商品属性
router.post('/update/pros/:id', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // {
    //     "money_start": 10000,
    //     "money_step": 500,
    //     "money_deposit": 2000,
    //     "money_top": 80000,
    //     "delay_limit": 0,
    //     "delay_minute": 5,
    //     "ltm_begin": 1522650869000,
    //     "ltm_end": 1522950969000
    //   }
    var data = {
        "res": "s",
        "data": {
            "id_goods_revision": 1333,
            "money_start": 10000,
            "money_step": 500,
            "money_deposit": 2000,
            "money_top": 80000,
            "delay_limit": 0,
            "delay_minute": 5,
            "delay_times": 0,
            "ltm_end": 1522950969000,
            "ltm_begin": 1522650869000
        }
    }
    res.send(data);
});

// 2）上传拍卖卖单的附件
router.post('/attachment/:id', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // var form = new FormData();
    // form.append("attachment_xls", fileObj);  //上传的excel文件
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var data = {
            "res": "s",
            "data": {
                "id_goods_revision": 137,
                "md5_file": "d0970714757783e6cf17b26fb8e2298f",
                "name_file": files.attachment_xls[0].originalFilename,
                "is_delete": 0,
                "id_storage": 1,
                "ltm_last_save": 1522652946211
            }
        }
        res.send(data);
    });
});

// 3）获取商品属性
router.get('/get/pros/:id', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "data": {
            "id_goods_revision": 23423,
            "money_start": 55, //起步价，
            "money_step": 5, //加价幅度
            "money_deposit": 100, //保证金
            "money_top": 10000, //封顶
            "delay_limit": 0, //
            "delay_minute": 5, //延时周期
            "delay_times": 0, //延时次数
            "ltm_end": 1525104002000,
            "ltm_begin": 1522826968000
        }
    }
    res.send(data);
});


// 4）获取商品附件列表
router.get('/get/attachments/:id', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = {
        "res": "s",
        "data": [{
            "id_goods_revision": 123123,
            "md5_file": "123123sdfsdt34tdgf",
            "name_file": "hsfas.xlsx",
            "is_delete": 0,
            "id_storage": 0,
            "ltm_last_save": 1522749087687
        }]
    }
    res.send(data);
});


// 5）上传附件样张图片
router.post('/attachment/pic/:id/:index', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // var form = new FormData();
    // form.append("attachment_img", fileObj);  //上传的图片样张
    // id_goods_revision 商品草稿id， index 图片位置

    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {

        //fs.renameSync(files.path,files.originalFilename);
        if (files.attachment_img) {
            var tmp_path = files.attachment_img[0].path;
            // 指定文件上传后的目录 - 示例为"images"目录。 
            var path_d = path.resolve(__dirname, '../public/')
            var target_path = path_d + '/' + files.attachment_img[0].originalFilename;
            // 移动文件

            var readStream = fs.createReadStream(tmp_path);
            var writeStream = fs.createWriteStream(target_path);
            readStream.pipe(writeStream);
            res.send('成功');
        }
    });


    // var data = {
    //     "msg": "业务操作成功",
    //     "res": "s",
    //     "data": "图片名字"
    // }
    // res.send(data);

});


// 6）上传拍卖商品公司图片
router.post('/company/pic/:id/:index', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // var form = new FormData();
    // form.append("attachment_img", fileObj);  //上传的图片样张
    // id_goods_revision 商品草稿id， index 图片位置
    var data = {
        "msg": "业务操作成功",
        "res": "s",
        "data": "图片名字"
    }
    res.send(data);
});



// 7）获取商品所有附件图片
router.get('/pics/:id_goods_revision', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // id_goods_revision 商品草稿id， index 图片位置
    var data = {
        "res": "s",
        "data": [
            // {
            //     "id_goods_revision": 123,
            //     "index_pic": 8,
            //     "id_group": 3,
            //     "name_pic": "product_detail_04.png",
            //     "id_storage": 0,
            //     "ltm_last_save": 0,
            //     "state_pic": 0
            // },
            {
                "id_goods_revision": 123,
                "index_pic": 9,
                "id_group": 3,
                "name_pic": "product_detail_05.png",
                "id_storage": 0,
                "ltm_last_save": 0,
                "state_pic": 0
            },
            {
                "id_goods_revision": 123,
                "index_pic": 10,
                "id_group": 3,
                "name_pic": "product_detail_06.png",
                "id_storage": 0,
                "ltm_last_save": 0,
                "state_pic": 0
            }, {
                "id_goods_revision": 123,
                "index_pic": 11,
                "id_group": 3,
                "name_pic": "product_detail_07.png",
                "id_storage": 0,
                "ltm_last_save": 0,
                "state_pic": 0
            }, {
                "id_goods_revision": 123,
                "index_pic": 12,
                "id_group": 3,
                "name_pic": "product_detail_01.png",
                "id_storage": 0,
                "ltm_last_save": 0,
                "state_pic": 0
            }, {
                "id_goods_revision": 123,
                "index_pic": 13,
                "id_group": 3,
                "name_pic": "product_detail_02.png",
                "id_storage": 0,
                "ltm_last_save": 0,
                "state_pic": 0
            }, {
                "id_goods_revision": 123,
                "index_pic": 14,
                "id_group": 3,
                "name_pic": "product_detail_03.png",
                "id_storage": 0,
                "ltm_last_save": 0,
                "state_pic": 0
            }
        ]
    }
    res.send(data);
});



// 8）检查卖单附件文件是否已经存在
router.get('/attachment/exist/:id_goods_revision', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // id_goods_revision 商品草稿id， filename=aaa.xlsx
    var data = Mock.mock({
        "array|1": [{
                "res": "s",
                "data": 0 //文件不存在
            },
            {
                "res": "s",
                "data": 1 //文件已存在，若存在提示用户是否覆盖
            }
        ]
    })
    res.send(data.array);
});

// 9）根据商品ID的位置获取公司库中同位置已存在的图片列表
router.get('/get/company/pics/:id_goods_revision/:index', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // id_goods_revision 商品草稿id， filename=aaa.xlsx
    var data = Mock.mock({
        "array|1": [{
                "new_list": [{
                    "pic_name": "图片名字",
                    "img_data": "图片数据",
                    "index": "图片在页面的位置"
                }],
                "res": "s",
                "del_list": []
            },
            // {
            //     "res": "s",
            //     "msg": "错误信息"
            // }
        ]
    })
    res.send(data.array);
});


// 10）从公司库图片选择图片作为当前位置图片
router.post('/get/company/pics/:id_goods_revision/:index', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // id_goods_revision 商品草稿id， filename=aaa.xlsx
    var data = Mock.mock({
        "array|1": [{
                "res": "s",
                "msg": "业务操作成功"
            },
            {
                "res": "s",
                "msg": "错误信息"
            }
        ]
    })
    res.send(data.array);
});
module.exports = router;