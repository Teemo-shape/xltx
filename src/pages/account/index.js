import Vue from 'vue'
import commonFooter from '../../components/footer.vue'
import headerSearch from '../../components/headerSearch.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../../../static/js/libs/jquery-1.9.1.min.js'

Vue.config.productionTip = false //阻止提示
Vue.use(ElementUI);

new Vue({
    el:'#app',
    data () {
        return {
            main_carousel: [
                "../static/img/carousel_01.jpg",
                "../static/img/carousel_02.jpg",
                "../static/img/carousel_01.jpg"
            ],
            common_carousel: [
                "../static/img/product_06.jpg",
                "../static/img/product_09.jpg",
                "../static/img/product_14.jpg"
            ],
            auction_carousel: [
                "../static/img/product_06.jpg",
                "../static/img/product_09.jpg",
                "../static/img/product_14.jpg"
            ],
            auction_list: [],
        }
    },
    components:{
        headerSearch,
        commonFooter,
    },
    methods: {
        loadGoods: function () {
            var self = this;
            $.ajax({
				url: ctx + "/anon/goods/random/2",
				type: "get",
				cache: false,
				async: false,
				dataType: "json",
				contentType: "application/json;charset=utf-8",
				success: function(data) {
					if (handleResponseData(data)) {
						if (data.res == "s") {
                            if (data.data) {
                                self.auction_list = data.data;
                            }
						} else if (data.res == "f") {
							self.$message({
								message: data.msg,
								type: "error"
							});
						}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(errorThrown);
				}
			});
        }
    },
    mounted () {
        var self = this;
        self.loadGoods();
    }
})