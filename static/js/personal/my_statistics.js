
laydate.render({
  elem: '#selectTime', //指定元素
  range: true
});


/*
 * 回到顶部
 */
$("#goTop").click(function () {
	$("html,body").animate({scrollTop:0}, 300);
})

/*
 * highchart
 */
$(function () {
    $('#container').highcharts({
        chart: {
            type: 'area'
        },
        xAxis: {
            categories: ['2017-11-20', '2017-11-21', '2017-11-22', '2017-11-23', '2017-11-24', '2017-11-25', '2017-11-26'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'k'
            }
        },
        tooltip: {
            split: true,
            valueSuffix: 'k'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
        	name:'交易金额',
            data: [1, 3.5, 5.4, 2.8, 7, 2.4, 3]
        }]
    });
});