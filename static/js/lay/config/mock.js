var ctx="";
/*
 * 模拟数据
 */
//验证是否注册-注册
$.mockjax({
    url: "/user/account/validMobile/register",
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS",
    	DATA:"0"
    }
});
//验证是否注册-重置密码
$.mockjax({
    url: ctx+"/user/account/validMobile/resetPsw",
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS",
    	DATA:"1"
    }
});
//注册
$.mockjax({
    url: '/user/account/register',
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS"
    }
});
//手机验证码-注册
$.mockjax({
    url: ctx + '/user/account/send/sms/',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"888888",
    	TIME:"180"
    }
});
//登录
$.mockjax({
    url: '/user/account/login',
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS",
    	MSG:"OK"
    }
});
//发送邮件
$.mockjax({
    url: ctx+"/user/account/reset/psw/send",
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS",
    	MSG:"888888"
    }
});
//判断账号是否注册
$.mockjax({
    url: '/user/account/isRegister',
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS",
    	MSG:"账号已注册"
    }
});
//手机重置密码-检查数据后跳转
$.mockjax({
    url: '/user/account/phoneResetPassword',
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});
//手机重置密码后跳转
$.mockjax({
    url: '/user/account/resetPassword',
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});
//提交密保
$.mockjax({
    url: '/user/account/submitSecurity',
    status: 200,
    responseTime: 50,        
    responseText: {
    	result:"hello mockAjax",
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

//检测公司是否存在
$.mockjax({
    url: '/cert/check/company',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

//保存实名认证信息
$.mockjax({
    url: '/cert/apply/index.shtml',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

//提交实名认证信息
$.mockjax({
    url: '/cert/apply/do.shtml',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

//保存草稿
$.mockjax({
    url: '/cert/draft/index.shtml',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

//提交打款金额
$.mockjax({
    url: ctx + '/cert/config/money',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

/*
 * 删除内部成员
 */
$.mockjax({
    url: ctx + '/member/del/member.shtml',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

/*
 * 绑定/修改手机成功
 */
$.mockjax({
    url: ctx + '/member/self/bindedit/phone.shtml',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

/*
 * 内部成员修改用户名
 */
$.mockjax({
    url: ctx + '/member/update/name.shtml',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

/*
 * 提交密保
 */
$.mockjax({
    url: '/member/self/update/security.shtml',
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

/*
 * 保存模板接口一
 */
$.mockjax({
    url: ctx + "/goods/deliver/add",
    status: 200,
    responseTime: 50,  
    response: function (settings) {
    	console.log(settings);
    	this.responseText = {
	    	RES:"SUCCESS",
	    	MSG:"ok",
	    	ID_DELIVER:"22"
	    }
    }
});

/*
 * 保存模板接口一
 */
$.mockjax({
    url: ctx + "/goods/deliver/update/vendors",
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

//删除模板
$.mockjax({
    url: ctx + "/goods/deliver/delete",
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES:"SUCCESS",
    	MSG:"ok"
    }
});

//创建商品
$.mockjax({
    url: ctx + "/goods/comm/create",
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES: "SUCCESS",
    	MSG: "ok",
    	DATA: {
    		id: 22
    	}
    }
});

//选择运费模板
$.mockjax({
    url: ctx + "/goods/comm/22/deliver/2",
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES: "SUCCESS",
    	MSG: "ok",
    	DATA: {
    		id: 22
    	}
    }
});

//添加物料
$.mockjax({
    url: ctx + "/goods/comm/materiel/add/22",
    status: 200,
    responseTime: 50,  
    response: function (settings) {
    	console.log(settings);
    	this.responseText = {
	    	RES:"SUCCESS",
	    	MSG:"ok",
	    	DATA: {
	    		id_goods_materiel: JSON.parse(settings.data).name_materiel
	    	}
	    }
    }
});

//获取物料
$.mockjax({
    url: ctx + "/goods/comm/materiels/22",
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES: "SUCCESS",
    	MSG: "ok",
    	DATA: {
    		id_goods_revision: 22
    	}
    }
});

//上传图片
$.mockjax({
    url: ctx + "/goods/comm/pic",
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES: "SUCCESS",
    	MSG: "ok",
    	DATA: {
    		id_goods_revision: 22
    	}
    }
});

//上传图片
$.mockjax({
    url: ctx + "/goods/comm/pic",
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES: "SUCCESS",
    	MSG: "ok",
    	DATA: {
    		id_goods_revision: 22
    	}
    }
});

//根据名称获取物料参数
$.mockjax({
    url: ctx + "/goods/comm/materiel/params/name",
    status: 200,
    responseTime: 50,        
    responseText: {
    	RES: "SUCCESS",
    	MSG: "ok",
    	DATA: [
			{
				name_param: "111",
				val_param: "111"
			}, 
			{
				name_param: "222",
				val_param: "222"
			}
    	]
    }
});

//物料模板列表
$.mockjax({
    url: ctx + "/goods/deliver/list/json",
    status: 200,
    responseTime: 50,        
    responseText: {
	    "RES": "SUCCESS", 
	    "DATA": [
	        {
	            "uid": 24, 
	            "id": 66, 
	            "name_deliver": "模版a", 
	            "location_goods": 340500, 
	            "promise_send_out": 3, 
	            "is_free": 0, 
	            "id_company": 7, 
	            "ltm_last_save": 1517469327346, 
	            "vendors": [
	                {
	                    "id_vendor": 1, 
	                    "cost_default": 10, 
	                    "cost_free_default": 1000, 
	                    "is_free_default": 0, 
	                    "is_delete": 0, 
	                    "groups": [
	                        {
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
	                    ], 
	                    "id_deliver": 0, 
	                    "groups_ext": [
	                        {
	                            "ids_division": [
	                                110000, 
	                                120000, 
	                                130000, 
	                                150000
	                            ], 
	                            "id_division_group": 0, 
	                            "cost": 1, 
	                            "cost_free": 100, 
	                            "is_free": 0, 
	                            "ids_division_name": "北京市,天津市,河北省,内蒙古自治区", 
	                            "ids_division_others": null
	                        }, 
	                        {
	                            "ids_division": [
	                                140000, 
	                                210000
	                            ], 
	                            "id_division_group": 1, 
	                            "cost": 15, 
	                            "cost_free": 2000, 
	                            "is_free": 0, 
	                            "ids_division_name": "山西省,辽宁省", 
	                            "ids_division_others": null
	                        }
	                    ], 
	                    "devisions": null
	                }, 
	                {
	                    "id_vendor": 2, 
	                    "cost_default": 15, 
	                    "cost_free_default": 1555, 
	                    "is_free_default": 0, 
	                    "is_delete": 0, 
	                    "groups": [
	                        {
	                            "ids_division": [
	                                120000
	                            ], 
	                            "id_division_group": 0, 
	                            "cost": 11, 
	                            "cost_free": 1, 
	                            "is_free": 0
	                        }
	                    ], 
	                    "id_deliver": 0, 
	                    "groups_ext": [
	                        {
	                            "ids_division": [
	                                120000
	                            ], 
	                            "id_division_group": 0, 
	                            "cost": 11, 
	                            "cost_free": 1, 
	                            "is_free": 0, 
	                            "ids_division_name": "天津市", 
	                            "ids_division_others": null
	                        }
	                    ], 
	                    "devisions": null
	                }
	            ]
	        }, 
	        {
	            "uid": 24, 
	            "id": 67, 
	            "name_deliver": "SW我", 
	            "location_goods": 341000, 
	            "promise_send_out": 1, 
	            "is_free": 0, 
	            "id_company": 7, 
	            "ltm_last_save": 1517453410975, 
	            "vendors": [
	                {
	                    "id_vendor": 1, 
	                    "cost_default": 10, 
	                    "cost_free_default": 1000, 
	                    "is_free_default": 0, 
	                    "is_delete": 0, 
	                    "groups": [
	                        {
	                            "ids_division": [
	                                110000, 
	                                120000
	                            ], 
	                            "id_division_group": 0, 
	                            "cost": 0, 
	                            "cost_free": 0, 
	                            "is_free": 1
	                        }, 
	                        {
	                            "ids_division": [
	                                140000, 
	                                150000
	                            ], 
	                            "id_division_group": 1, 
	                            "cost": 15, 
	                            "cost_free": 150, 
	                            "is_free": 0
	                        }
	                    ], 
	                    "id_deliver": 0, 
	                    "groups_ext": [
	                        {
	                            "ids_division": [
	                                110000, 
	                                120000
	                            ], 
	                            "id_division_group": 0, 
	                            "cost": 0, 
	                            "cost_free": 0, 
	                            "is_free": 1, 
	                            "ids_division_name": "北京市,天津市", 
	                            "ids_division_others": null
	                        }, 
	                        {
	                            "ids_division": [
	                                140000, 
	                                150000
	                            ], 
	                            "id_division_group": 1, 
	                            "cost": 15, 
	                            "cost_free": 150, 
	                            "is_free": 0, 
	                            "ids_division_name": "山西省,内蒙古自治区", 
	                            "ids_division_others": null
	                        }
	                    ], 
	                    "devisions": null
	                }
	            ]
	        }, 
	        {
	            "uid": 24, 
	            "id": 71, 
	            "name_deliver": "werw", 
	            "location_goods": 341200, 
	            "promise_send_out": 3, 
	            "is_free": 1, 
	            "id_company": 7, 
	            "ltm_last_save": 1517464896592, 
	            "vendors": null
	        }, 
	        {
	            "uid": 24, 
	            "id": 74, 
	            "name_deliver": "ETEWRT", 
	            "location_goods": 340200, 
	            "promise_send_out": 1, 
	            "is_free": 1, 
	            "id_company": 7, 
	            "ltm_last_save": 1519959498564, 
	            "vendors": null
	        }
	    ]
	}
});

//物料名称模糊查询
$.mockjax({
    url: ctx + "/goods/comm/materiels/fuzzy",
    status: 200,
    responseTime: 50,  
    response: function (settings) {
    	console.log(settings);
    	var arr = [];
    	for (var i=0; i<6; i++) {
    		var str = "" + JSON.parse(settings.data).name + i;
    		arr.push({
    			name_materiel: str
    		});
    	}
    	this.responseText = {
	    	RES:"SUCCESS",
	    	MSG:"ok",
	    	DATA: arr
	    }
    }
});




