/**
 * Created by 27394 on 2017/4/5.
 */
$(document).ready(function(){
    // 执行自加载程序 TODO
});
// 执行关闭广告功能
$("#shutdown_master").click(function(){
    $(this).parent().parent().slideUp();
});
// 执行手机形式
$("#jd_mobile").hover(function(){
    // 进入
    $(".mobile_static").hide();
    $(".mobile_pop").show();
},function(){
    // 离开
    $(".mobile_static").show();
    $(".mobile_pop").hide();
});
// 左侧列表执行
$(".cate_menu_item").hover(function(){
    // 进入
    $(".cate_part").hide();
    $(".cate_pop").show();
    var id = $(this).attr('data-index');
    $("#cate_item"+id).show();
},function(){
    // 离开
    $(".cate_pop,.cate_part").hide();
    var id = $(this).attr('data-index');
    $("#cate_item"+id).show();
});
$(".cate_pop").hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});
// 上面完成了显示
// 幻灯片  开始
var slider_start = 1;
var slider_length = $("li.slider_item").length;
var Slider = setInterval("showSlider()",3000);
// 获取当前正在显示的位置
function getSliderIndex(){
    var check_old = 0;
    $("li.slider_item").each(function(){
        if($(this).hasClass("slider_item_active")){
            check_old = $(this).index();
        }
    });
    return check_old;
}
function getBaseMessage(){
    var message = new Object();
    message.slider_now = slider_start%slider_length;
    message.slider_css_hide= {'opacity': '0', 'z-index': '0', 'position': 'absolute'};
    message.slider_css_show = {'opacity': '1', 'z-index': '1', 'position': 'absolute'};
    message.slider_speed = 1200;
    message.check_old = getSliderIndex();
    return message;
}
function showSlider(){
    var baseMessage = getBaseMessage();
    var slider_now = baseMessage.slider_now;
    var slider_css_hide= baseMessage.slider_css_hide;
    var slider_css_show = baseMessage.slider_css_show;
    var slider_speed = baseMessage.slider_speed;
    var check_old = baseMessage.check_old;

    if(slider_now){// 非第一组 slider_item_active
        if(check_old != (slider_now-1)){
            $("li.slider_item:eq("+check_old+")").animate(slider_css_hide,slider_speed);
        }
        //操作幻灯片
        $("li.slider_item:eq("+(slider_now-1)+")").animate(slider_css_hide,slider_speed);
        $("li.slider_item:eq("+slider_now+")").animate(slider_css_show,slider_speed);
    }else{// 第一个
        //操作幻灯片
        if(check_old != (slider_length-1)){
            $("li.slider_item:eq("+check_old+")").animate(slider_css_hide,slider_speed);
        }
        $("li.slider_item:eq("+(slider_length-1)+")").animate(slider_css_hide,slider_speed);
        $("li.slider_item:eq("+slider_now+")").animate(slider_css_show,slider_speed);
    }
    // 添加 CSS效果
    $("li.slider_item").removeClass("slider_item_active");
    $("li.slider_item:eq("+slider_now+")").addClass("slider_item_active");
    //操作展示
    $("i.slider_indicator_btn").removeClass("slider_indicator_btn_active");
    $("i.slider_indicator_btn:eq("+slider_now+")").addClass("slider_indicator_btn_active");

    // 递增
    slider_start++;
}
// 放到页面上停止执行
$("li.slider_item").hover(function(){
    clearInterval(Slider);
},function(){
    Slider = setInterval("showSlider()",3000);
});
// 通过小点 切换效果
$("i.slider_indicator_btn").hover(function(){
    var baseMessage = getBaseMessage();
    var slider_now = baseMessage.slider_now;
    var slider_css_hide= baseMessage.slider_css_hide;
    var slider_css_show = baseMessage.slider_css_show;
    var slider_speed = baseMessage.slider_speed;
    var check_old = baseMessage.check_old;
    var check_now = $(this).index();
    clearInterval(Slider);// 清除定时任务
    //显示当前类
    $("i.slider_indicator_btn").removeClass("slider_indicator_btn_active");
    $(this).addClass("slider_indicator_btn_active");
    // 效果展示
    $("li.slider_item:eq("+check_old+")").animate(slider_css_hide,slider_speed);
    $("li.slider_item:eq("+check_now+")").animate(slider_css_show,slider_speed);
    // 改变类
    $("li.slider_item").removeClass("slider_item_active");
    $("li.slider_item:eq("+check_now+")").addClass("slider_item_active");
},function(){
    Slider = setInterval("showSlider()",3000);
});
// 显示内容
$(".slider_main").hover(function(){
    $(".slider_control_item").show();
},function(){
    $(".slider_control_item").hide();
});
$(".slider_control_item").hover(function(){
    $(this).css('background-color', 'rgba(0,0,0,.6)');
    clearInterval(Slider);
},function(){
    $(this).css('background-color', 'rgba(0,0,0,.1)');
    Slider = setInterval("showSlider()",3000);
});
// 左右按键切换
$(".slider_control_prev").click(function(){
    // 左走
    var baseMessage = getBaseMessage();
    //var slider_now = baseMessage.slider_now;
    var slider_css_hide= baseMessage.slider_css_hide;
    var slider_css_show = baseMessage.slider_css_show;
    var slider_speed = baseMessage.slider_speed;
    var check_old = baseMessage.check_old;
    var slider_length = $("li.slider_item").length;
    if(check_old){
        // 不是第一个
        // 改变控制按钮
        $("i.slider_indicator_btn").removeClass("slider_indicator_btn_active");
        $("i.slider_indicator_btn:eq("+(check_old-1)+")").addClass("slider_indicator_btn_active");
        // 改变图片的
        $("li.slider_item").removeClass("slider_item_active");
        $("li.slider_item:eq("+(check_old-1)+")").addClass("slider_item_active");
        // 改变显示效果
        $("li.slider_item:eq("+check_old+")").animate(slider_css_hide,slider_speed);
        $("li.slider_item:eq("+(check_old-1)+")").animate(slider_css_show,slider_speed);
    }else{
        // 第一个
        // 改变控制按钮
        $("i.slider_indicator_btn").removeClass("slider_indicator_btn_active");
        $("i.slider_indicator_btn:eq("+(slider_length-1)+")").addClass("slider_indicator_btn_active");
        // 改变图片的
        $("li.slider_item").removeClass("slider_item_active");
        $("li.slider_item:eq("+(slider_length-1)+")").addClass("slider_item_active");
        // 改变显示效果
        $("li.slider_item:eq(0)").animate(slider_css_hide,slider_speed);
        $("li.slider_item:eq("+(slider_length-1)+")").animate(slider_css_show,slider_speed);
    }
});
// 左右按键切换
$(".slider_control_next").click(function(){
    // 左走
    var baseMessage = getBaseMessage();
    //var slider_now = baseMessage.slider_now;
    var slider_css_hide= baseMessage.slider_css_hide;
    var slider_css_show = baseMessage.slider_css_show;
    var slider_speed = baseMessage.slider_speed;
    var check_old = baseMessage.check_old;
    var slider_length = $("li.slider_item").length;
    if(check_old != (slider_length-1)){
        // 不是最后一个
        // 改变控制按钮
        $("i.slider_indicator_btn").removeClass("slider_indicator_btn_active");
        $("i.slider_indicator_btn:eq("+(check_old+1)+")").addClass("slider_indicator_btn_active");
        // 改变图片的
        $("li.slider_item").removeClass("slider_item_active");
        $("li.slider_item:eq("+(check_old+1)+")").addClass("slider_item_active");
        // 改变显示效果
        $("li.slider_item:eq("+check_old+")").animate(slider_css_hide,slider_speed);
        $("li.slider_item:eq("+(check_old+1)+")").animate(slider_css_show,slider_speed);
    }else{
        // 最后一个
        // 改变控制按钮
        $("i.slider_indicator_btn").removeClass("slider_indicator_btn_active");
        $("i.slider_indicator_btn:eq(0)").addClass("slider_indicator_btn_active");
        // 改变图片的
        $("li.slider_item").removeClass("slider_item_active");
        $("li.slider_item:eq(0)").addClass("slider_item_active");
        // 改变显示效果
        $("li.slider_item:eq("+(slider_length-1)+")").animate(slider_css_hide,slider_speed);
        $("li.slider_item:eq(0)").animate(slider_css_show,slider_speed);
    }
});
// 幻灯片  结束

/*公告切换*/
$(".mod_tab_head>.mod_tab_head_item").mouseover(function(){
    var index = $(this).index();
    // 滑动块滑动
    $(".news_tab_active").css("transform","translateX("+(52*index)+"px)");
    // 下面切换
    $(".mod_tab_content_item").hide();
    $(".mod_tab_content_item:eq("+index+")").show();
});

// 秒杀切换
$(".box_bd").hover(function(){
    $(".sk_controls").show();
},function(){
    $(".sk_controls").hide();
});
// 左侧移动
// 初始化的时候 自动
var base_css = {'width': '9000px', 'transform': 'translateX(-3000px)', 'transition-property': 'transform', 'transition-duration': '0s'};
$(function(){
    var li_clone = $(".sk_list").html();
    $(".sk_list").append(li_clone);
    $(".sk_list").prepend(li_clone);
})
function get_sk_list(){
    var check_now = $(".sk_list").css('transform');//matrix(1, 0, 0, 1, -1000, 0)
    var check_array = check_now.split(',');
    var check_now_number = check_array[4];
    return check_now_number;
}
$(".sk_controls_prev").click(function(){
    var check_now_number = get_sk_list();
    var check_now_new = (check_now_number*1-1000);
    $(".sk_list").css({'transform':'matrix(1, 0, 0, 1, '+check_now_new+', 0)','transition-duration': '0.6s'});
    if(check_now_new >= -3000 || check_now_new <= -6000 ){
        setTimeout(function(){
            $(".sk_list").css(base_css);
        },600);
    }
});
// 右侧移动
$(".sk_controls_next").click(function(){
    var check_now_number = get_sk_list();
    var check_now_new = (check_now_number*1+1000);
    //check_now_new = (check_now_new <= 0)?check_now_new:-2000;
    $(".sk_list").css({'transform':'matrix(1, 0, 0, 1, '+check_now_new+', 0)','transition-duration': '0.6s'});
    if(check_now_new >= 0 || check_now_new <= -3000){
        setTimeout(function(){
            $(".sk_list").css(base_css);
        },600);
    }
});
$(".sk_item_img").hover(function(){
    $(this).next().css('color','#c81623');
},function(){
    $(this).next().css('color','#666666');
});
// 右侧手机显示
// 直播左右转换
function getLiveIndex(){
    var check_old = 0;
    $("li.live_item").each(function(){
        if($(this).hasClass("active")){
            check_old = $(this).index();
        }
    });
    return check_old;
}
var live_length = $(".live_item").length;
var live_css_hide = {'opacity': '0', 'z-index': '0', 'position': 'absolute'};
var live_css_show = {'opacity': '1', 'z-index': '0', 'position': 'absolute'};
// 直播左转
$(".live_btn_pre").click(function(){
    var live_check_old = getLiveIndex();
    $(".live_item").animate(live_css_hide);
    $(".live_item").removeClass("active");
    $(".live_ind_item").removeClass("active");
    if(live_check_old){//!0
        $(".live_item:eq("+(live_check_old-1)+")").animate(live_css_show);
        $(".live_item:eq("+(live_check_old-1)+")").addClass("active");
        $(".live_ind_item:eq("+(live_check_old-1)+")").addClass("active");
    }else{// 0
        $(".live_item:eq("+(live_length-1)+")").animate(live_css_show);
        $(".live_item:eq("+(live_length-1)+")").addClass("active");
        $(".live_ind_item:eq("+(live_length-1)+")").addClass("active");
    }
});

// 直播右转
$(".live_btn_next").click(function(){
    var live_check_old = getLiveIndex();
    $(".live_item").animate(live_css_hide);
    $(".live_item").removeClass("active");
    $(".live_ind_item").removeClass("active");
    if(live_check_old == (live_length-1)){//顶部
        $(".live_item:eq(0)").animate(live_css_show);
        $(".live_item:eq(0)").addClass("active");
        $(".live_ind_item:eq(0)").addClass("active");
    }else{// 0
        $(".live_item:eq("+(live_check_old+1)+")").animate(live_css_show);
        $(".live_item:eq("+(live_check_old+1)+")").addClass("active");
        $(".live_ind_item:eq("+(live_check_old+1)+")").addClass("active");
    }
});
var Live = setInterval("showLive()",3000);
function showLive(){
    var live_check_old = getLiveIndex();
    $(".live_item").animate(live_css_hide);
    $(".live_item").removeClass("active");
    $(".live_ind_item").removeClass("active");
    if(live_check_old){//!0
        $(".live_item:eq("+(live_check_old-1)+")").animate(live_css_show);
        $(".live_item:eq("+(live_check_old-1)+")").addClass("active");
        $(".live_ind_item:eq("+(live_check_old-1)+")").addClass("active");
    }else{// 0
        $(".live_item:eq("+(live_length-1)+")").animate(live_css_show);
        $(".live_item:eq("+(live_length-1)+")").addClass("active");
        $(".live_ind_item:eq("+(live_length-1)+")").addClass("active");
    }
}
$(".live_btn").hover(function(){
    clearInterval(Live);
},function() {
    Live = setInterval("showLive()", 3000);
});

// 爱生活切换
$(function(){
    var ai_html = $(".pt_logo_list_1").html();
    $(".pt_logo_list_1").prepend(ai_html);
    $(".pt_logo_list_1").append(ai_html);
});
$(function(){
    var ai_html = $(".pt_logo_list_2").html();
    $(".pt_logo_list_2").prepend(ai_html);
    $(".pt_logo_list_2").append(ai_html);
});
$(".pt_logo_list").hover(function(){
    $(this).parent().next().show();
},function(){
    $(this).parent().next().hide();
});
$(".pt_logo_btn_wrapper").hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});
// 此处有 bug ，但是懒得改了，发现了，就自己修改吧！哈哈
//matrix(1, 0, 0, 1, -570, 0)
$(".pt_logo_pre").click(function(){
    var obj = $(this).parent().prev().children('ul');
    var check_now = $(obj).css("transform");
    var check_array = check_now.split(',');
    var check_now_number = check_array[4];
    var check_now_new = (check_now_number*1-570);//1710
    $(obj).css({'transform':'matrix(1, 0, 0, 1, '+check_now_new+', 0)','transition-duration': '0.6s'});
    if(check_now_new >= -1710 || check_now_new <= -2280 ){
        setTimeout(function(){
            $(obj).css({'transform':'matrix(1, 0, 0, 1, -1710, 0)','transition-duration': '0s'});
        },600);
    }
});
$(".pt_logo_next").click(function(){
    var obj = $(this).parent().prev().children('ul');
    var check_now = $(obj).css("transform");
    var check_array = check_now.split(',');
    var check_now_number = check_array[4];
    var check_now_new = (check_now_number*1+570);
    $(obj).css({'transform':'matrix(1, 0, 0, 1, '+check_now_new+', 0)','transition-duration': '0.6s'});
    if(check_now_new >= -570 || check_now_new <= -1710 ){
        setTimeout(function(){
           $(obj).css({'transform':'matrix(1, 0, 0, 1, -1710, 0)','transition-duration': '0s'});
        },600);
    }
});


























