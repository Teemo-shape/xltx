<template>
    <div>
        <div class="top_half">
            <header>
                <div class="logo f_l">
                    <img src="static/img/logo.png" />
                </div>
                <div class="classify f_l">
                    <h4 class="classify_btn dropdown clearfix">
                        <span class="select_classify">所有品类</span>
                        <span class="iconfont">&#xe792;</span>
                    </h4>
                    <ul class="select_items arrow_appear">
                        <li class="select_item">
                            <a href="javascript:void(0)">所有品类</a>
                        </li>
                        <li class="select_item">
                            <a href="javascript:void(0)">软件</a>
                        </li>
                        <li class="select_item active">
                            <a href="javascript:void(0)"></a>音频</li>
                        <li class="select_item">
                            <a href="javascript:void(0)">电脑</a>
                        </li>
                    </ul>
                </div>
                <div class="search clearfix f_l">
                    <div class="select_btn f_l">
                        <div class="search_title dropdown clearfix">
                            <span class="select_classify">音频</span>
                            <span class="iconfont">&#xe61c;</span>
                        </div>
                        <ul class="select_items">
                            <li class="select_item">分类</li>
                            <li class="select_item">软件</li>
                            <li class="select_item active">音频</li>
                            <li class="select_item">电脑</li>
                        </ul>
                    </div>
                    <div class="search_icon f_r">
                        <span class="iconfont">&#xe604;</span>
                        <a href="/views/domain/search_results.html" class="icon_input"></a>
                    </div>
                    <div class="search_container f_l">
                        <input type="text" class="search_input" value="" name="select" placeholder="IC电子元件" />
                    </div>
                </div>
                <a href="/views/domain/login.html" class="login_btn btn f_l">登录</a>
                <a href="/views/domain/register.html" class="register_btn btn f_l">注册</a>
                <a href="/views/individual/home_page.html" class="home_page btn f_l">我的主页</a>
            </header>
        </div>
        <div class="carousel_section">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <img src="static/img/carousel_01.jpg" alt="...">
                    </div>
                    <div class="item">
                        <img src="static/img/carousel_02.jpg" alt="...">
                    </div>
                    <div class="item">
                        <img src="static/img/carousel_01.jpg" alt="...">
                    </div>
                </div>
                <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span class="iconfont">&#xe601;</span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span class="iconfont">&#xe600;</span>
                </a>
            </div>
        </div>
        <ul class="container">
            <li class="sale_item common">
                <a href="/views/domain/product_detail.html">普通卖单&ensp;MORE</a>
                <ul class="products clearfix">
                    <li class="tagline f_l">
                        <p class="text_l">放心的服务保障</p>
                        <p class="text_r">更安全&ensp;更可靠</p>
                        <img src="static/img/product_09.jpg" />
                    </li>
                    <li class="carousel_product common_product f_l">
                        <ul>
                            <li class="active">
                                <img src="static/img/product_06.jpg" />
                            </li>
                            <li>
                                <img src="static/img/product_09.jpg" />
                            </li>
                            <li>
                                <img src="static/img/product_14.jpg" />
                            </li>
                        </ul>
                        <a href="javascript:void(0)" class="iconfont common_product_btn product_btn" id="prevBtn1">&#xe601;</a>
                        <a href="javascript:void(0)" class="iconfont common_product_btn product_btn" id="nextBtn1">&#xe600;</a>
                    </li>
                    <li class="f_l product">
                        <a href="/views/domain/product_detail.html">
                            <img src="static/img/product_03.jpg" />
                        </a>
                    </li>
                    <li class="f_l product">
                        <a href="/views/domain/product_detail.html">
                            <img src="static/img/product_03.jpg" />
                        </a>
                    </li>
                </ul>
            </li>
            <li class="sale_item auction">
                <a href="/views/domain/auction_auction.html">竞拍卖单&ensp;MORE</a>
                <ul class="products clearfix">
                    <li class="tagline f_l">
                        <p class="text_l">高效的成交</p>
                        <p class="text_r">更大的利益</p>
                        <img src="static/img/product_14.jpg" />
                    </li>
                    <li class="carousel_product auction_product f_l">
                        <ul>
                            <li class="active">
                                <img src="static/img/product_06.jpg" />
                            </li>
                            <li>
                                <img src="static/img/product_09.jpg" />
                            </li>
                            <li>
                                <img src="static/img/product_14.jpg" />
                            </li>
                        </ul>
                        <a href="javascript:void(0)" class="iconfont auction_product_btn product_btn" id="prevBtn2">&#xe601;</a>
                        <a href="javascript:void(0)" class="iconfont auction_product_btn product_btn" id="nextBtn2">&#xe600;</a>
                    </li>
                    <li class="f_l product">
                        <a href="/views/domain/auction_auction.html">
                            <img src="static/img/product_03.jpg" />
                        </a>
                    </li>
                    <li class="f_l product">
                        <a href="/views/domain/auction_auction.html">
                            <img src="static/img/product_03.jpg" />
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <section class="advert_section">
            <div class="advert">
                <img src="static/img/carousel_02.jpg" />
            </div>
        </section>
    </div>
</template>
<script>
import con from "@/conf.js"
import {$,jQuery} from 'jquery'

export default {
    name: "index",
    data() {
        return {};
    },
    mounted() {

        //模拟登录
        var isLogin = localStorage.getItem("login");
        $(".btn").css({ "width": "auto", "padding": "0 10px" });
        $(".home_page").css("margin-left", "50px");
        if (isLogin) {
            $(".home_page").show();
            $(".register_btn").hide();
            $(".login_btn").hide();
        } else {
            $(".home_page").hide();
            $(".register_btn").show();
            $(".login_btn").show();
        }

        /*
         * 头部点击划入效果
         */
        $(".dropdown").click(function (e) {
            e = e || window.event;
            $(".select_items").hide();
            $(this).siblings(".select_items").toggle();
            $(this).siblings(".select_items").find(".select_item.active").css("background", "dodgerblue");
            e.stopPropagation();
        })
        $(".select_items").find(".select_item").hover(function () {
            $(this).css("background", "dodgerblue").siblings().css("background", "none");
        }, function () {
            $(this).css("background", "none");
        }).click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(this).parent().siblings(".dropdown").find(".select_classify").text($(this).text());
            $(this).parent().hide();
        })

        /*
         * 点击去搜索结果页
         */

        /*
         * 点击其他地方菜单消失
         */
        $(document).click(function () {
            $(".select_items").hide();
        })
        /*
         * 卖单轮播效果
         */
        var curIndex1 = 0; //当前index
        // 定时器自动变换2.5秒每次
        var autoChange1 = setInterval(function () {
            if (curIndex1 < $(".common_product li").length - 1) {
                curIndex1++;
            } else {
                curIndex1 = 0;
            }
            //调用变换处理函数
            changeToCommon(curIndex1);
        }, 2500);
        $(".common_product").find("li").each(function (num) {
            $(this).hover(function () {
                clearInterval(autoChange1);
            }, function () {
                autoChange1 = setInterval(function () {
                    if (curIndex1 < $(".common_product li").length - 1) {
                        curIndex1++;
                    } else {
                        curIndex1 = 0;
                    }
                    //调用变换处理函数
                    changeToCommon(curIndex1);
                }, 2500);
            })
        })
        $(".common_product_btn").hover(function () {
            clearInterval(autoChange1);
        }, function () {
            autoChange1 = setInterval(function () {
                if (curIndex1 < $(".common_product li").length - 1) {
                    curIndex1++;
                } else {
                    curIndex1 = 0;
                }
                //调用变换处理函数
                changeToCommon(curIndex1);
            }, 2500);
        })
        $("#prevBtn1").click(function () {
            if (curIndex1 <= 0) {
                curIndex1 = $(".common_product li").length - 1;
            } else {
                curIndex1--;
            }
            changeToCommon(curIndex1);
        })
        $("#nextBtn1").click(function () {
            if (curIndex1 < $(".common_product li").length - 1) {
                curIndex1++;
            } else {
                curIndex1 = 0;
            }
            changeToCommon(curIndex1);
        })
        function changeToCommon(num) {
            $(".common_product").find("li").removeClass("active").hide().eq(num).fadeIn().addClass("active");
        }
        /*
         * 另一组卖单轮播
         */
        var curIndex2 = 0; //当前index
        // 定时器自动变换2.5秒每次
        var autoChange2 = setInterval(function () {
            if (curIndex2 < $(".auction_product li").length - 1) {
                curIndex2++;
            } else {
                curIndex2 = 0;
            }
            //调用变换处理函数
            changeToAuction(curIndex2);
        }, 2500);
        $(".auction_product").find("li").each(function (num) {
            $(this).hover(function () {
                clearInterval(autoChange2);
            }, function () {
                autoChange2 = setInterval(function () {
                    if (curIndex2 < $(".auction_product li").length - 1) {
                        curIndex2++;
                    } else {
                        curIndex2 = 0;
                    }
                    //调用变换处理函数
                    changeToAuction(curIndex2);
                }, 2500);
            })
        })
        $(".auction_product_btn").hover(function () {
            clearInterval(autoChange2);
        }, function () {
            autoChange2 = setInterval(function () {
                if (curIndex2 < $(".auction_product li").length - 1) {
                    curIndex2++;
                } else {
                    curIndex2 = 0;
                }
                //调用变换处理函数
                changeToAuction(curIndex2);
            }, 2500);
        })
        $("#prevBtn2").click(function () {
            if (curIndex2 <= 0) {
                curIndex2 = $(".auction_product li").length - 1;
            } else {
                curIndex2--;
            }
            changeToAuction(curIndex2);
        })
        $("#nextBtn2").click(function () {
            if (curIndex2 < $(".auction_product li").length - 1) {
                curIndex2++;
            } else {
                curIndex2 = 0;
            }
            changeToAuction(curIndex2);
        })
        function changeToAuction(num) {
            $(".auction_product").find("li").removeClass("active").hide().eq(num).fadeIn().addClass("active");
        }

        $(".search_icon").click(function () {
            location.href = "search_results.html";
        })

    }
};
</script>
<style>
body {
  background: #f9f9f9;
}
/*
 * 头部及轮播图
 */
.top_half {
  width: 100%;
  min-width: 1218px;
  height: 86px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 9;
}
header {
  width: 1218px;
  height: 50px;
  margin: 0 auto 19px;
  font-size: 16px;
  color: #333;
  line-height: 50px;
}
header .classify {
  width: 114px;
  margin: 16px 22px 0 8px;
  position: relative;
}
.classify .classify_btn {
  width: 114px;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  font-weight: 500;
}
.classify_btn .select_classify {
  width: 88px;
  text-align: right;
  margin-right: 9px;
  float: left;
}
.classify_btn .iconfont {
  font-size: 12px;
}
.classify_item a {
  color: #333;
}
header .btn {
  width: 68px;
  height: 50px;
  text-align: center;
  font-size: 22px;
  line-height: 50px;
  color: #333;
  padding: 0;
  margin-top: 16px;
}
header .btn:hover {
  background: #e9e9e9;
}
header .login_btn {
  margin-left: 70px;
}
header .register_btn {
  margin-left: 26px;
}

header .search {
  width: auto;
  height: 48px;
  border: 1px solid #adadad;
  border-radius: 5px;
  margin-top: 16px;
}
header .search .select_btn {
  height: 48px;
  position: relative;
  display: inline-block;
}
header .select_btn .search_title {
  width: auto;
  height: 28px;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  margin: 10px 0;
  box-sizing: border-box;
  border-right: 1px solid #adadad;
}
header .search_title span {
  margin-right: 7px;
  float: right;
}
header .search_title .select_classify {
  text-indent: 11px;
  float: left;
}
header .select_items {
  width: 100%;
  text-indent: 11px;
  border: 1px solid #ccc;
  background: #fff;
  display: none;
  position: absolute;
  left: -1px;
  top: 48px;
  z-index: 9;
}
header .select_items .select_item {
  height: 30px;
  line-height: 30px;
}
header .search_icon {
  width: 50px;
  position: relative;
  display: inline-block;
}
header .search_icon span {
  width: 100%;
  height: 48px;
  text-align: center;
  font-size: 28px;
  color: #8e8e8e;
  line-height: 48px;
  display: block;
}
header .search_icon .icon_input {
  width: 100%;
  height: 48px;
  border: none;
  background: #fff;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
}
header .search .search_container {
  width: auto;
  overflow: hidden;
}
header .search .search_input {
  width: 498px;
  height: 48px;
  text-indent: 14px;
  vertical-align: top;
  border: none;
}
/*
 * 轮播图
 */
.carousel_section {
  width: 100%;
  min-width: 1218px;
  height: 464px;
  background: #fff;
  margin-top: 86px;
}
.carousel {
  width: 1200px;
  height: 450px;
  margin: 0 auto;
}
.carousel .item img {
  width: 1200px;
  height: 450px;
}
.carousel .carousel-control {
  top: 185px;
  width: 40px;
  height: 80px;
  text-shadow: none;
  background-color: #fff;
  opacity: 1;
  filter: alpha(opacity=1);
  background-image: none;
}
.carousel-control.left {
  left: 1px;
}
.carousel-control.right {
  right: 1px;
}
.carousel .carousel-control span {
  width: 40px;
  height: 40px;
  font-size: 40px;
  line-height: 1;
  display: block;
  margin-top: 20px;
  color: #666;
}
/*
 * 卖单
 */
.container {
  width: 100%;
  min-width: 1200px;
  padding: 0 0 40px;
}
.container .sale_item {
  width: 1200px;
  color: #333;
  margin: 0 auto;
}
.container .common {
  padding-top: 38px;
}
.container .sale_item a {
  font-size: 28px;
  display: block;
  color: #333;
}
.container .sale_item li {
  background: #fff;
}
.container .sale_item li + li {
  margin-left: 14px;
}
.container .tagline {
  height: 306px;
}
.container .tagline .text_l {
  text-indent: 27px;
  font-size: 25px;
  line-height: 1;
  margin-top: 36px;
}
.container .tagline .text_r {
  text-indent: 65px;
  font-size: 25px;
  line-height: 1;
  margin: 28px 0;
}
.container .carousel_product {
  width: 346px;
  height: 206px;
  position: relative;
  padding: 50px 53px;
  overflow: hidden;
}
.container .carousel_product ul {
  width: 346px;
  height: 206px;
}
.carousel_product ul li {
  display: none;
}
.carousel_product ul .active {
  display: inline;
}
.carousel_product a {
  text-decoration: none;
}
.container .carousel_product .product_btn {
  width: 22px;
  height: 40px;
  font-size: 40px;
  text-indent: -9px;
  line-height: 1;
  position: absolute;
  top: 133px;
  color: #999;
}
.container .carousel_product #prevBtn1,
.container .carousel_product #prevBtn2 {
  left: 0;
}
.container .carousel_product #nextBtn1,
.container .carousel_product #nextBtn2 {
  right: 0;
}
.container .product {
  padding: 31px 26px;
}
.container .auction {
  padding-top: 80px;
}
/*
 * 广告图
 */
.advert_section {
  width: 100%;
  min-width: 1200px;
  padding-top: 29px;
  background: #fff;
  padding-bottom: 56px;
}
.advert_section .advert {
  width: 1200px;
  height: 244px;
  margin: 0 auto;
}
.advert_section .advert img {
  width: 100%;
  height: 100%;
}
/*
 * 底部
 */
#bottomFrame {
  width: 100%;
  height: 260px;
  border: none;
}
</style>

