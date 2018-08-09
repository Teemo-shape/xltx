/*!
 * Distpicker v1.1.0
 * https://github.com/tshi0912/city-picker
 *
 * Copyright (c) 2014-2016 Tao Shi
 * Released under the MIT license
 *
 * Date: 2016-09-09T12:11:57.115Z
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define('ChineseDistricts', [], factory);
    } else {
        // Browser globals.
        factory();
    }
})(function () {

    var ChineseDistricts = {
            //86: {
            //    110000: '北京',
            //    120000: '天津',
            //    130000: '河北',
            //    140000: '山西',
            //    150000: '内蒙古',
            //    210000: '辽宁',
            //    220000: '吉林',
            //    230000: '黑龙江',
            //    310000: '上海',
            //    320000: '江苏',
            //    330000: '浙江',
            //    340000: '安徽',
            //    350000: '福建',
            //    360000: '江西',
            //    370000: '山东',
            //    410000: '河南',
            //    420000: '湖北',
            //    430000: '湖南',
            //    440000: '广东',
            //    450000: '广西',
            //    460000: '海南',
            //    500000: '重庆',
            //    510000: '四川',
            //    520000: '贵州',
            //    530000: '云南',
            //    540000: '西藏',
            //    610000: '陕西',
            //    620000: '甘肃',
            //    630000: '青海',
            //    640000: '宁夏',
            //    650000: '新疆',
            //    710000: '台湾',
            //    810000: '香港',
            //    820000: '澳门'
            //},
            86: {
                'A-G': [
                    {code: '340000', address: '安徽省'},
                    {code: '110000', address: '北京市'},
                    {code: '500000', address: '重庆市'},
                    {code: '350000', address: '福建省'},
                    {code: '620000', address: '甘肃省'},
                    {code: '440000', address: '广东省'},
                    {code: '450000', address: '广西壮族自治区'},
                    {code: '520000', address: '贵州省'}],
                'H-K': [
                    {code: '460000', address: '海南省'},
                    {code: '130000', address: '河北省'},
                    {code: '230000', address: '黑龙江省'},
                    {code: '410000', address: '河南省'},
                    {code: '420000', address: '湖北省'},
                    {code: '430000', address: '湖南省'},
                    {code: '320000', address: '江苏省'},
                    {code: '360000', address: '江西省'},
                    {code: '220000', address: '吉林省'}],
                'L-S': [
                    {code: '210000', address: '辽宁省'},
                    {code: '150000', address: '内蒙古自治区'},
                    {code: '640000', address: '宁夏回族自治区'},
                    {code: '630000', address: '青海省'},
                    {code: '370000', address: '山东省'},
                    {code: '310000', address: '上海市'},
                    {code: '140000', address: '山西省'},
                    {code: '610000', address: '陕西省'},
                    {code: '510000', address: '四川省'}],
                'T-Z': [
                    {code: '120000', address: '天津市'},
                    {code: '650000', address: '新疆维吾尔自治区'},
                    {code: '540000', address: '西藏自治区'},
                    {code: '530000', address: '云南省'},
                    {code: '330000', address: '浙江省'}]
            },
            /*110000: {
                110100: '北京市',
            },*/
		    "110000": {
		    	"110101": '东城区',
				"110113": "顺义区",
				"110112": "通州区",
				"110115": "大兴区",
				"110114": "昌平区",
				"110117": "平谷区",
				"110116": "怀柔区",
				"110119": "延庆区",
				"110118": "密云区",
				"110102": "西城区",
				"110105": "朝阳区",
				"110107": "石景山区",
				"110106": "丰台区",
				"110109": "门头沟区",
				"110108": "海淀区",
				"110111": "房山区"
			},
            "120000": {
            	"120101": '和平区',
				"120103": "河西区",
				"120102": "河东区",
				"120105": "河北区",
				"120104": "南开区",
				"120106": "红桥区",
				"120111": "西青区",
				"120110": "东丽区",
				"120113": "北辰区",
				"120112": "津南区",
				"120115": "宝坻区",
				"120114": "武清区",
				"120117": "宁河区",
				"120116": "滨海新区",
				"120119": "蓟州区",
				"120118": "静海区"
			},
            "130000": {
				"130400": "邯郸市",
				"130800": "承德市",
				"130100": "石家庄市",
				"130500": "邢台市",
				"130900": "沧州市",
				"139002": "辛集市",
				"130200": "唐山市",
				"130600": "保定市",
				"131000": "廊坊市",
				"130300": "秦皇岛市",
				"130700": "张家口市",
				"131100": "衡水市"
			},
			"140000": {
				"140400": "长治市",
				"140800": "运城市",
				"140100": "太原市",
				"140500": "晋城市",
				"140900": "忻州市",
				"140200": "大同市",
				"140600": "朔州市",
				"141000": "临汾市",
				"140300": "阳泉市",
				"140700": "晋中市",
				"141100": "吕梁市"
			},
            "150000": {
				"150400": "赤峰市",
				"150800": "巴彦淖尔市",
				"150100": "呼和浩特市",
				"150500": "通辽市",
				"150900": "乌兰察布市",
				"152500": "锡林郭勒盟",
				"152900": "阿拉善盟",
				"150200": "包头市",
				"150600": "鄂尔多斯市",
				"152200": "兴安盟",
				"150300": "乌海市",
				"150700": "呼伦贝尔市"
			},
            "210000": {
				"210400": "抚顺市",
				"211200": "铁岭市",
				"210500": "本溪市",
				"211300": "朝阳市",
				"210600": "丹东市",
				"211400": "葫芦岛市",
				"210700": "锦州市",
				"210800": "营口市",
				"210100": "沈阳市",
				"210900": "阜新市",
				"210200": "大连市",
				"211000": "辽阳市",
				"210300": "鞍山市",
				"211100": "盘锦市"
			},
            "220000": {
				"220400": "辽源市",
				"220800": "白城市",
				"222400": "延边朝鲜族自治州",
				"220100": "长春市",
				"220500": "通化市",
				"220200": "吉林市",
				"220600": "白山市",
				"220300": "四平市",
				"220700": "松原市"
			},
            "230000": {
				"230400": "鹤岗市",
				"231200": "绥化市",
				"230500": "双鸭山市",
				"230600": "大庆市",
				"230700": "伊春市",
				"230800": "佳木斯市",
				"230100": "哈尔滨市",
				"230900": "七台河市",
				"230200": "齐齐哈尔市",
				"231000": "牡丹江市",
				"230300": "鸡西市",
				"231100": "黑河市",
				"232700": "大兴安岭地区"
			},
            "310000": {
            	"310101": '黄浦区',
				"310116": "金山区",
				"310117": "松江区",
				"310118": "青浦区",
				"310151": "崇明区",
				"310112": "闵行区",
				"310113": "宝山区",
				"310114": "嘉定区",
				"310115": "浦东新区",
				"310120": "奉贤区",
				"310109": "虹口区",
				"310110": "杨浦区",
				"310104": "徐汇区",
				"310105": "长宁区",
				"310106": "静安区",
				"310107": "普陀区"
			},
            "320000": {
				"320100": "南京市",
				"320900": "盐城市",
				"320800": "淮安市",
				"320300": "徐州市",
				"321100": "镇江市",
				"320200": "无锡市",
				"321000": "扬州市",
				"320500": "苏州市",
				"321300": "宿迁市",
				"320400": "常州市",
				"321200": "泰州市",
				"320700": "连云港市",
				"320600": "南通市"
			},
            "330000": {
				"330100": "杭州市",
				"330500": "湖州市",
				"330900": "舟山市",
				"330400": "嘉兴市",
				"330800": "衢州市",
				"330300": "温州市",
				"330700": "金华市",
				"331100": "丽水市",
				"330200": "宁波市",
				"330600": "绍兴市",
				"331000": "台州市"
			},
            "340000": {
				"340100": "合肥市",
				"341700": "池州市",
				"340800": "安庆市",
				"341600": "亳州市",
				"340300": "蚌埠市",
				"341100": "滁州市",
				"340200": "芜湖市",
				"341000": "黄山市",
				"341800": "宣城市",
				"340500": "马鞍山市",
				"341300": "宿州市",
				"340400": "淮南市",
				"341200": "阜阳市",
				"340700": "铜陵市",
				"341500": "六安市",
				"340600": "淮北市"
			},
            "350000": {
				"350100": "福州市",
				"350500": "泉州市",
				"350900": "宁德市",
				"350400": "三明市",
				"350800": "龙岩市",
				"350300": "莆田市",
				"350700": "南平市",
				"350200": "厦门市",
				"350600": "漳州市"
			},
            "360000": {
				"360100": "南昌市",
				"360500": "新余市",
				"360900": "宜春市",
				"360400": "九江市",
				"360800": "吉安市",
				"360300": "萍乡市",
				"360700": "赣州市",
				"361100": "上饶市",
				"360200": "景德镇市",
				"360600": "鹰潭市",
				"361000": "抚州市"
			},
            "370000": {
				"370500": "东营市",
				"371300": "临沂市",
				"370400": "枣庄市",
				"371200": "莱芜市",
				"370700": "潍坊市",
				"371500": "聊城市",
				"370600": "烟台市",
				"371400": "德州市",
				"370100": "济南市",
				"370900": "泰安市",
				"371700": "菏泽市",
				"370800": "济宁市",
				"371600": "滨州市",
				"370300": "淄博市",
				"371100": "日照市",
				"370200": "青岛市",
				"371000": "威海市"
			},
            "410000": {
				"410500": "安阳市",
				"411300": "南阳市",
				"410400": "平顶山市",
				"411200": "三门峡市",
				"410700": "新乡市",
				"411500": "信阳市",
				"410600": "鹤壁市",
				"411400": "商丘市",
				"410100": "郑州市",
				"410900": "濮阳市",
				"411700": "驻马店市",
				"410800": "焦作市",
				"411600": "周口市",
				"410300": "洛阳市",
				"411100": "漯河市",
				"410200": "开封市",
				"411000": "许昌市"
			},
            "420000": {
				"420100": "武汉市",
				"420900": "孝感市",
				"420800": "荆门市",
				"429006": "天门市",
				"420300": "十堰市",
				"421100": "黄冈市",
				"429004": "仙桃市",
				"429005": "潜江市",
				"420200": "黄石市",
				"421000": "荆州市",
				"420500": "宜昌市",
				"421300": "随州市",
				"421200": "咸宁市",
				"422800": "恩施土家族苗族自治州",
				"420700": "鄂州市",
				"429021": "神农架林区",
				"420600": "襄阳市"
			},
            "430000": {
				"430500": "邵阳市",
				"431300": "娄底市",
				"430400": "衡阳市",
				"431200": "怀化市",
				"430700": "常德市",
				"433100": "湘西土家族苗族自治州",
				"430600": "岳阳市",
				"430100": "长沙市",
				"430900": "益阳市",
				"430800": "张家界市",
				"430300": "湘潭市",
				"431100": "永州市",
				"430200": "株洲市",
				"431000": "郴州市"
			},
            "440000": {
				"440100": "广州市",
				"440900": "茂名市",
				"441700": "阳江市",
				"440800": "湛江市",
				"441600": "河源市",
				"440300": "深圳市",
				"441900": "东莞市",
				"445100": "潮州市",
				"440200": "韶关市",
				"441800": "清远市",
				"440500": "汕头市",
				"441300": "惠州市",
				"445300": "云浮市",
				"440400": "珠海市",
				"441200": "肇庆市",
				"442000": "中山市",
				"445200": "揭阳市",
				"440700": "江门市",
				"441500": "汕尾市",
				"440600": "佛山市",
				"441400": "梅州市"
			},
            "450000": {
				"450500": "北海市",
				"451300": "来宾市",
				"450400": "梧州市",
				"451200": "河池市",
				"450700": "钦州市",
				"450600": "防城港市",
				"451400": "崇左市",
				"450100": "南宁市",
				"450900": "玉林市",
				"450800": "贵港市",
				"450300": "桂林市",
				"451100": "贺州市",
				"450200": "柳州市",
				"451000": "百色市"
			},
            "460000": {
				"469030": "琼中黎族苗族自治县",
				"469029": "保亭黎族苗族自治县",
				"460100": "海口市",
				"469028": "陵水黎族自治县",
				"469027": "乐东黎族自治县",
				"469026": "昌江黎族自治县",
				"469025": "白沙黎族自治县",
				"469024": "临高县",
				"469007": "东方市",
				"469006": "万宁市",
				"469005": "文昌市",
				"460300": "三沙市",
				"469002": "琼海市",
				"460200": "三亚市",
				"460400": "儋州市",
				"469023": "澄迈县",
				"469022": "屯昌县",
				"469021": "定安县"
			},
            "500000": {
            	"500101": '万州区',
				"500103": "渝中区",
				"500231": "垫江县",
				"500102": "涪陵区",
				"500230": "丰都县",
				"500229": "城口县",
				"500228": "梁平县",
				"500111": "大足区",
				"500110": "綦江区",
				"500238": "巫溪县",
				"500109": "北碚区",
				"500237": "巫山县",
				"500108": "南岸区",
				"500236": "奉节县",
				"500107": "九龙坡区",
				"500235": "云阳县",
				"500106": "沙坪坝区",
				"500105": "江北区",
				"500233": "忠县",
				"500104": "大渡口区",
				"500232": "武隆县",
				"500119": "南川区",
				"500118": "永川区",
				"500117": "合川区",
				"500116": "江津区",
				"500115": "长寿区",
				"500243": "彭水苗族土家族自治县",
				"500114": "黔江区",
				"500242": "酉阳土家族苗族自治县",
				"500113": "巴南区",
				"500241": "秀山土家族苗族自治县",
				"500112": "渝北区",
				"500240": "石柱土家族自治县",
				"500120": "璧山区",
				"500151": "铜梁区",
				"500154": "开州区",
				"500153": "荣昌区",
				"500152": "潼南区"
			},
            "510000": {
				"510500": "泸州市",
				"511300": "南充市",
				"510400": "攀枝花市",
				"512000": "资阳市",
				"510700": "绵阳市",
				"511500": "宜宾市",
				"510600": "德阳市",
				"511400": "眉山市",
				"510100": "成都市",
				"510900": "遂宁市",
				"511700": "达州市",
				"513300": "甘孜藏族自治州",
				"510800": "广元市",
				"511600": "广安市",
				"513200": "阿坝藏族羌族自治州",
				"510300": "自贡市",
				"511100": "乐山市",
				"511900": "巴中市",
				"511000": "内江市",
				"511800": "雅安市",
				"513400": "凉山彝族自治州"
			},
            "520000": {
				"520100": "贵阳市",
				"520500": "毕节市",
				"520400": "安顺市",
				"520300": "遵义市",
				"522300": "黔西南布依族苗族自治州",
				"522700": "黔南布依族苗族自治州",
				"520200": "六盘水市",
				"520600": "铜仁市",
				"522600": "黔东南苗族侗族自治州"
			},
            "530000": {
				"530600": "昭通市",
				"530700": "丽江市",
				"532300": "楚雄彝族自治州",
				"533100": "德宏傣族景颇族自治州",
				"530400": "玉溪市",
				"532800": "西双版纳傣族自治州",
				"530500": "保山市",
				"532900": "大理白族自治州",
				"532600": "文山壮族苗族自治州",
				"533400": "迪庆藏族自治州",
				"530300": "曲靖市",
				"530800": "普洱市",
				"530100": "昆明市",
				"530900": "临沧市",
				"532500": "红河哈尼族彝族自治州",
				"533300": "怒江傈僳族自治州"
			},
            "540000": {
				"540200": "日喀则市",
				"540300": "昌都市",
				"540400": "林芝市",
				"542400": "那曲地区",
				"540100": "拉萨市",
				"540500": "山南市",
				"542500": "阿里地区"
			},
            "610000": {
				"610200": "铜川市",
				"610600": "延安市",
				"611000": "商洛市",
				"610300": "宝鸡市",
				"610700": "汉中市",
				"610400": "咸阳市",
				"610800": "榆林市",
				"610100": "西安市",
				"610500": "渭南市",
				"610900": "安康市"
			},
            "620000": {
				"620200": "嘉峪关市",
				"621000": "庆阳市",
				"620300": "金昌市",
				"621100": "定西市",
				"620800": "平凉市",
				"620100": "兰州市",
				"620900": "酒泉市",
				"620600": "武威市",
				"623000": "甘南藏族自治州",
				"620700": "张掖市",
				"620400": "白银市",
				"621200": "陇南市",
				"620500": "天水市",
				"622900": "临夏回族自治州"
			},
            "630000": {
				"630200": "海东市",
				"632200": "海北藏族自治州",
				"632600": "果洛藏族自治州",
				"632300": "黄南藏族自治州",
				"632700": "玉树藏族自治州",
				"632800": "海西蒙古族藏族自治州",
				"630100": "西宁市",
				"632500": "海南藏族自治州"
			},
            "640000": {
				"640200": "石嘴山市",
				"640300": "吴忠市",
				"640400": "固原市",
				"640100": "银川市",
				"640500": "中卫市"
			},
            "650000": {
				"653000": "克孜勒苏柯尔克孜自治州",
				"652300": "昌吉回族自治州",
				"653100": "喀什地区",
				"650400": "吐鲁番市",
				"652800": "巴音郭楞蒙古自治州",
				"650500": "哈密市",
				"652900": "阿克苏地区",
				"659002": "阿拉尔市",
				"650200": "克拉玛依市",
				"654200": "塔城地区",
				"659003": "图木舒克市",
				"659006": "铁门关市",
				"652700": "博尔塔拉蒙古自治州",
				"654300": "阿勒泰地区",
				"659004": "五家渠市",
				"653200": "和田地区",
				"654000": "伊犁哈萨克自治州",
				"650100": "乌鲁木齐市"
			}
        }
        ;

    if (typeof window !== 'undefined') {
        window.ChineseDistricts = ChineseDistricts;
    }

    return ChineseDistricts;

});
