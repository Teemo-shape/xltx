<template>
    <div class="cover">
        <h2 v-if="!sell">卖家信息</h2>
        <h2 v-if="sell">买家信息</h2>
        <div class="seller_info">
            <div class="info_half clearfix">
                <div class="info_left f_l">
                    昵称：
                    <span class="nick_name">{{saler_info.contact}}</span>&ensp;
                    <!-- <i class="iconfont">&#xe66f;</i>&ensp;
                    <a href="javascript:void(0);" class="call_me">联系我</a> -->
                </div>
                <div class="info_right f_l">
                    联系电话：
                    <span class="phone">{{saler_info.phone}}</span>
                </div>
            </div>
            <div class="info_half clearfix">
                <div class="info_left f_l">
                    地址：
                    <span class="city">{{saler_info.company_address}}</span>
                </div>
                <div class="info_right f_l">
                    公司名称：
                    <span class="company">{{saler_info.company_name}}</span>
                </div>
            </div>
        </div>
        <h2>订单信息</h2>
        <div class="corpores">
            <div class="corpores_info clearfix">
                <div class="corpores_order f_l">
                    订单编号：
                    <span>{{cid.id_order}}</span>
                </div>
                <div class="corpores_time f_l">
                    创建时间：
                    <span>{{timestampToTime(cid.ltm_state_create)}}</span>
                </div>
            </div>
            <ul>
                <li class="corpore clearfix">
                    <div class="corpore_img f_l">
                        <img :src="pics[0].url_pic" v-if="pics.length>0" />
                    </div>
                    <a :href="'/goods/ranking_auction.html?id='+getgoods.id_goods_revision" class="corpore_title f_l" target="_blank">
                        {{name_goods}}
                    </a>
                    <div class="corpore_num f_l">¥{{toThousand(cid.price_unit)}}</div>
                    <a :href="ctx+'/anon/goods/auction/download/attachment/'+ cid.id_goods_revision+'?filename='+attachment[0].name_file" target="_blank" class="doc_a" v-if="attachment">{{attachment[0].name_file}}</a>
                </li>
            </ul>
            <div class="all_corpore clearfix" style="margin-top:10px;">
                <div class="sub_cont f_r">
                    标的物数量
                    <span class="corpore_price" style="color:#333;margin-left:40px;">{{cid.amount}}</span>
                </div>
            </div>
            <div class="all_corpore clearfix" style="border:none;margin-bottom:10px;">
                <div class="sub_cont f_r">
                    付款总额
                    <span class="corpore_price">¥{{toThousand(cid.money_order)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ctx: '',
            name_goods: '',//商品名称
            saler_info: {
                company_address: '',
                company_name: '',
                contact: '',
                email: '',
                phone: '',
            },
            getgoods: '',//获取商品信息
            attachment: '',//附件列表
            pics: '',//图片列表
        }
    },
    mounted() {
        var self = this;
        //获取卖家信息

    },
    methods: {
        //获取卖家信息
        get_saler_info() {
            var self = this;
            var id;
            if (self.sell) {
                id = self.cid.id_company_buyer
            } else {
                id = self.cid.id_company_sales
            }
            $.ajax({
                url: ctx + '/buyers/saler/info/' + id,
                type: "GET",
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.saler_info = data.data
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
        },
        //获取商品名称
        get_name_goods() {
            var self = this;
            $.ajax({
                url: ctx + '/anon/goods/getgoods/' + self.cid.id_goods_revision,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.name_goods = data.data.name_goods
                        self.getgoods = data.data
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.res,
                            type: 'error'
                        })
                    }
                }
            })
        },
        //获取图片列表
        get_pics() {
            var self = this;
            $.ajax({
                url: ctx + '/anon/goods/pics/' + self.cid.id_goods_revision,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.pics = data.data
                    }
                    if (data.res == 'f') {
                        self.message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
        },
        //获取附件列表
        get_attachment() {
            var self = this;
            $.ajax({
                url: ctx + '/anon/goods/auction/get/attachments/' + self.cid.id_goods_revision,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.attachment = data.data
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
        },
        //时间戳转化
        timestampToTime(timestamp) {
            let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        //千分法
        toThousand(s, n) {
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
            var l = s.split('.')[0].split('').reverse(),
                r = s.split('.')[1];
            var t = '';
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
            }
            return t.split('').reverse().join('') + '.' + r;
        },
    },
    props: ['cid', 'sell'],
    watch: {
        cid() {
            self.ctx = ctx
            if (this.cid) {
                this.get_saler_info();
                this.get_attachment()
                this.get_name_goods()
                this.get_pics();
            }
        },
    }
}
</script>
<style lang="less" scoped>
/*
 * 卖家信息，标的物信息
 */
.doc_a {
  line-height: 105px;
  text-decoration: underline;
  margin-left: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.cover {
  width: 1200px;
  margin: 0 auto;
}
.cover h2 {
  font-size: 20px;
  line-height: 1;
  padding: 30px 0 20px 30px;
}
.cover .seller_info {
  line-height: 36px;
  border-bottom: solid 1px #e5e5e5;
  padding-left: 60px;
  padding-bottom: 20px;
}
.cover .seller_info .info_left {
  width: 400px;
}
.info_left .iconfont {
  color: #1296db;
  font-size: 24px;
}
.info_left .call_me {
  text-decoration: underline;
}
.info_left .call_me:hover {
  text-decoration: underline;
}
.corpores {
  border: solid 1px #d1d1d1;
}
.corpores .corpores_info {
  line-height: 36px;
  padding: 20px 0 20px 65px;
}
.corpores .corpores_order {
  width: 280px;
  margin-right: 118px;
}
.corpores > ul {
  width: 980px;
  margin: 0 auto;
}
.corpores .corpore {
  border-top: solid 1px #e5e5e5;
  padding: 30px 0;
}
.corpores .corpore .corpore_img {
  width: 105px;
  height: 105px;
  text-align: center;
  border: solid 1px #d1d1d1;
}
.corpore .corpore_img img {
  width: auto;
  max-width: 100%;
}
.corpore .corpore_title {
  width: 300px;
  height: 105px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.corpore_title:hover {
  color: #fa5400;
}
.corpore .corpore_num {
  margin-left: 120px;
  line-height: 105px;
}
.all_corpore {
  width: 980px;
  line-height: 24px;
  border-top: solid 1px #e5e5e5;
  padding: 10px 0;
  margin: 0 auto;
}
.all_corpore .corpore_price {
  font-size: 18px;
  color: #fa5400;
  margin-left: 56px;
}

.sub_cont {
  width: 300px;
}
</style>

