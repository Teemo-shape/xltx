//传参数匹配
$.validator.addMethod("regCheck", function(value, element,param) {
    return this.optional(element) || (param.test(value));
}, "您输入的内容格式不正确，请重新输入");

//起订量
$.validator.addMethod("minimum", function(value, element,param) {
    return eval(value) <= eval($("#"+param.total_id).val());
}, "您输入的内容格式不正确，请重新输入");

//递增量
$.validator.addMethod("increment", function(value, element,param) {
    return eval(value) <= eval($("#"+param.total_id).val()) - eval($("#"+param.minimum_id).val());
}, "您输入的内容格式不正确，请重新输入");