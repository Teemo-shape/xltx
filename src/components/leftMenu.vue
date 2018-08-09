<template>
  <ul class="menu f_l">
		<li>
			<dl>
				<dd><a href="/account/index.html"><i class="iconfont">&#xe611;</i>首页</a></dd>
				<!-- <dd :class="name == 'home_page' ? 'active' : ''"><a href="/personal/home_page.html"><i class="iconfont">&#xe616;</i>我的主页</a></dd> -->
				<!-- <dd :class="name == 'backlog' ? 'active' : ''"><a href="/personal/backlog.html"><i class="iconfont giant">&#xe61a;</i>我的待办</a></dd> -->
			</dl>
		</li>
		<li>
			<dl>
				<dt>我买到的</dt>
				<!-- <dd :class="name == 'order_list' ? 'active' : ''"><a href="/personal/order_list.html"><i class="iconfont">&#xe69c;</i>普通订单</a></dd> -->
				<dd :class="name == 'my_auction' ? 'active' : ''"><a href="/personal/my_auction.html"><i class="iconfont">&#xe60f;</i>拍卖商品</a></dd>
			</dl>
		</li>
		<li>
			<dl>
				<dt>卖家功能</dt>
				<dd :class="name == 'publish_goods' ? 'active' : ''"><a href="/goods/publish_goods.html"><i class="iconfont little_small">&#xe917;</i>发布商品</a></dd>
				<dd :class="name == 'sold_manage' ? 'active' : ''"><a href="/personal/sold_manage.html"><i class="iconfont">&#xe69a;</i>已售管理</a></dd>
				<!-- <dd><a href="javascript:void(0);"><i class="iconfont">&#xe662;</i>咨询管理</a></dd> -->
				<!-- <dd :class="name == 'set_up_shop' ? 'active' : ''"><a href="/personal/set_up_shop.html"><i class="iconfont little_big">&#xe6b6;</i>店铺概况</a></dd> -->
			</dl>
		</li>
		<li>
			<dl>
				<dt>账号管理</dt>
				<dd :class="name == 'cert_index' ? 'active' : ''"><a href="/cert/cert_pass.html"><i class="iconfont small">&#xe619;</i>企业实名</a></dd>
				<dd :class="name == 'member_index' ? 'active' : ''"><a href="/company/member_index.html"><i class="iconfont">&#xe61f;</i>内部成员</a></dd>
				<!-- <dd :class="name == 'shipping_address' ? 'active' : ''"><a href="/personal/shipping_address.html"><i class="iconfont little_big">&#xe6cd;</i>收货地址</a></dd> -->
			</dl>
		</li>
		<li>
			<dl>
				<dt>财务区</dt>
				<dd :class="name == 'my_bill' ? 'active' : ''"><a href="/personal/my_bill.html"><i class="iconfont">&#xe610;</i>我的账单</a></dd>
			</dl>
		</li>
		<!-- <li>
			<dl>
				<dt>资料库</dt>
				<dd :class="name == 'attention' ? 'active' : ''"><a href="/personal/attention.html"><i class="iconfont big">&#xe655;</i>关注</a></dd>
				<dd :class="name == 'browse_history' ? 'active' : ''"><a href="/personal/browse_history.html"><i class="iconfont">&#xe618;</i>足迹</a></dd>
				<dd :class="name == 'my_statistics' ? 'active' : ''"><a href="/personal/my_statistics.html"><i class="iconfont giant">&#xe613;</i>我的统计</a></dd>
				<dd><a href="javascript:void(0);"><i class="iconfont">&#xe6a7;</i>我的咨询</a></dd>
			</dl>
		</li> -->
	</ul>
</template>

<script>
export default {
	name: 'left-menu',
   	data() {
        return {

        }
    },
    props: ['name']
}
</script>

<style>
.menu{
	width: 258px;
	color: #111;
	font-size: 20px;
	background: #fff;
	border: solid 1px #e5e5e5;
	margin-right: 20px;
}
.menu .active .iconfont{
	color: #fa5400;
}
.menu>li{
	border-bottom: solid 1px #e5e5e5;
}
.menu>li:last-child{
	border-bottom: none;
}
.menu dl{
	padding-top: 30px;
	padding-bottom: 20px;
}
.menu dd:hover{
	background: #f5f5f5;
}
.menu dl dt{
	line-height: 1;
	padding-left: 30px;
	margin-bottom: 25px;
}
.menu dl dd{
	height: 40px;
	line-height: 40px;
	margin-bottom: 10px;
}
.menu dl dd:last-child{
	margin-bottom: 0;
}
.menu dl a{
	display: block;
	padding: 0 30px;
}
.menu dd .iconfont{
	width: 30px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 30px;
	color: #999;
    vertical-align: middle;
    display: inline-block;
	margin-right: 30px;
}
.menu dd .giant{
	font-size: 23px;
	line-height: 35px;
}
.menu dd .little_big{
	font-size: 28px;
    line-height: 32px;
}
.menu dd .big{
    font-size: 25px;
    line-height: 38px;
}
.menu dd .small{
	font-size: 38px;
    line-height: 34px;
}
.menu dd .little_small{
	font-size: 36px;
    text-indent: -2px;
}
</style>


