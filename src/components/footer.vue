<template>
    <footer>
        <ul class="other_function clearfix">
            <li>
                <dl>
                    <dt class="function_title">关于我们</dt>
                    <dd class="function">联系我们</dd>
                    <dd class="function">广纳英才</dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt class="function_title">精品推荐</dt>
                    <dd class="function">打包特卖</dd>
                    <dd class="function">免责条款</dd>
                    <dd class="function">开票说明</dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt class="function_title">购物指南</dt>
                    <dd class="function">常见问题</dd>
                    <dd class="function">采购流程</dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt class="function_title">配送方式</dt>
                    <dd class="function">收货验货</dd>
                    <dd class="function">退换货流程</dd>
                    <dd class="function">服务投诉</dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt class="function_title">售后服务</dt>
                    <dd class="function">退货换货</dd>
                    <dd class="function">免责条款</dd>
                    <dd class="function">开票说明</dd>
                </dl>
            </li>
        </ul>
        <div class="about clearfix">
            <ul class="clearfix">
                <li>
                    <a href="javascript:void(0)">关于芯联天下</a>
                </li>
                <li>
                    <a href="javascript:void(0)">服务条款</a>
                </li>
                <li>
                    <a href="javascript:void(0)">客服中心</a>
                </li>
                <li>
                    <a href="javascript:void(0)">联系我们</a>
                </li>
            </ul>
            <span>2010-{{now_year}}&ensp;All Rights&ensp;Reserved</span>
            <span>粤公网安备</span>
            <span>11010502025545&ensp;号</span>
            <div class="foot_right">
                <span>粤公网安备</span>
                <span>11010502025545&ensp;号</span>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'common-footer',
    data() {
        return {
            now_year: 0,
        }
    },
    mounted() {
        var myDate = new Date();
        this.now_year = myDate.getFullYear();
    }
}
</script>
<style lang="less" scoped>
footer {
  width: 100%;
  min-width: 1200px;
  background: #f5f5f5;
}
.other_function {
  width: 1200px;
  border-bottom: 1px solid #9f9f9f;
  padding-bottom: 29px;
  margin: 0 auto;
}
.other_function li {
  width: 88px;
  float: left;
  padding-top: 30px;
}
.other_function li:first-child{
    margin-left: 20px;
}
.other_function li + li {
  margin-left: 185px;
}
li dt {
  margin-bottom: 20px;
}
li dd {
  margin-top: 10px;
}
.function_title {
  font-size: 16px;
  color: #333;
  line-height: 1;
  font-weight: 700;
}
.function {
  font-size: 12px;
  color: #666;
  line-height: 1;
}
.about {
  width: 1184px;
  font-size: 12px;
  line-height: 1;
  color: #666;
  text-align: center;
  margin: 30px auto 0;
  padding-bottom: 30px;
}
.about ul {
  display: inline-block;
}
.about li {
  padding: 0 6px;
  border-right: 2px solid #666;
  float: left;
}
li a {
  color: #666;
}
.about span {
  display: inline-block;
  margin-left: 8px;
}
.foot_right {
  display: inline-block;
  margin-left: 62px;
}
</style>


