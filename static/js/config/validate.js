//输入框检测
$("body").on("focus","input",function () {
	var _that = $(this);
	if (_that.hasClass("error")) {
		if (_that.hasClass("related_child")) {
//			related_child_err(_that);
//			related_parent_err_in(_that.parents(".related_parent"));
			input_err_in(_that.parents(".related_parent"));
		} else{
			input_err_in(_that);
		}
	} else{
		if (_that.hasClass("related_child")) {
//			related_child_ok(_that);
//			related_parent_ok_in(_that.parents(".related_parent"));
			input_ok_in(_that.parents(".related_parent"));
		} else{
			input_ok_in(_that);
		}
	}
}).on("blur","input",function () {
	var _that = $(this);
	if (_that.hasClass("error")) {
		if (_that.hasClass("related_child")) {
//			related_child_err(_that);
//			related_parent_err_out(_that.parents(".related_parent"));
			input_err_out(_that.parents(".related_parent"));
		} else{
			input_err_out(_that);
		}
	} else{
		if (_that.hasClass("related_child")) {
//			related_child_ok(_that);
//			related_parent_ok_out(_that.parents(".related_parent"));
			input_ok_out(_that.parents(".related_parent"));
		} else{
			input_ok_out(_that);
		}
	}
}).on("input propertychange","input",function () {
	var _that = $(this);
	if (_that.val() == "") {
		if (_that.hasClass("related_child")) {
//			related_child_ok(_that);
//			related_parent_ok_in(_that.parents(".related_parent"));
			input_err_in(_that.parents(".related_parent"));
		} else{
			input_err_in(_that);
		}
	} else {
		if (_that.hasClass("related_child")) {
//			related_child_ok(_that);
//			related_parent_ok_in(_that.parents(".related_parent"));
			input_ok_in(_that.parents(".related_parent"));
		} else{
			input_ok_in(_that);
		}
	}
});

/**
 * 输入框无错时聚焦
 * @param {Object} ele 输入框jq对象
 */
function input_ok_in (ele) {
	ele.css({"background":"none", "border":"solid 1px #a0a0a2"});
}

/**
 * 输入框无错时失焦
 * @param {Object} ele 输入框jq对象
 */
function input_ok_out (ele) {
	ele.css({"background":"none", "border":"solid 1px #d1d1d1"});
}

/**
 * 输入框有错时聚焦
 * @param {Object} ele 输入框jq对象
 */
function input_err_in (ele) {
	ele.css({"background":"#fff1e1", "border":"solid 1px transparent"});
}

/**
 * 输入框有错时失焦
 * @param {Object} ele 输入框jq对象
 */
function input_err_out (ele) {
	ele.css({"background":"#fff1e1", "border":"solid 1px #ffa940"});
}

//有时候输入框没有边框，输入框的父元素有边框
//此时related_parent为该输入框的父元素，related_child为该输入框


///**
// * 该输入框无错时聚焦父元素变化
// * @param {Object} ele 输入框的父元素jq对象
// */
//function related_parent_ok_in (ele) {
//	ele.css({"border":"solid 1px #a0a0a2"});
//}
//
///**
// * 该输入框无错时失焦父元素变化
// * @param {Object} ele 输入框的父元素jq对象
// */
//function related_parent_ok_out (ele) {
//	ele.css({"border":"solid 1px #d1d1d1"});
//}
//
///**
// * 该输入框有错时聚焦父元素变化
// * @param {Object} ele 输入框的父元素jq对象
// */
//function related_parent_err_in (ele) {
//	ele.css({"border":"solid 1px transparent"});
//}
//
///**
// * 该输入框无错时聚焦父元素变化
// * @param {Object} ele 输入框的父元素jq对象
// */
//function related_parent_err_out (ele) {
//	ele.css({"border":"solid 1px #ffa940"});
//}
//
///**
// * 该输入框无错时变化
// * @param {Object} ele 输入框的父元素jq对象
// */
//function related_child_ok (ele) {
//	ele.css({"background":"none"});
//}
//
///**
// * 该输入框有错时变化
// * @param {Object} ele 输入框的父元素jq对象
// */
//function related_child_err (ele) {
//	ele.css({"background":"#fff1e1"});
//}