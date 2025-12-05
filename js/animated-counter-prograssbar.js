/**
 * jQuery Animated Progressbar
 * Author: shakibdshy<shakibdshy@gmail.com>
 * Author URL: https://github.com/shakibdshy
 * Version: 1.0.0
 */

$(function () {
    // context: vùng chứa, duration: thời gian chạy
    function animateProgress($context, duration) {
        // chọn tất cả các thanh tiến trình (progress-bar) trong vùng 
        $context.find("[progress-bar]").each(function(){
            // lưu thanh tiến trình vào biến bar 
            var $bar = $(this);
            // lấy % hiển thị
            var percent = $bar.attr("data-percentage");

            // animate thanh tiến trình
            $bar.find(".progress-fill").animate({ width: percent }, duration);
        
            // animate số phần trăm
            $bar.find(".progress-number-mark").animate(
                // có 2 hiệu ứng
                // di chuyển từ trái qua phải
                {left: percent},
                // số phần trăm tăng dần cho đến giá trị % khai báo
                {
                    duration,
                    step: function(now){
                        // làm tròn
                        var data = Math.round(now);
                        $(this)
                        .find(".percent")
                        .html(data + "%")
                    },
                }
            );
        });
    }

    // khi trang vừa load gọi animateProgress cho mục đầu tiên
    animateProgress($("#firstbar"), 1000);

    // logic để mỗi lần đổi slide thì progressbar đổi lại
    $(".slider").on("afterChange", function(event, slick, currentSlide) {
        var $current = $(slick.$slides.get(currentSlide));

        $current.find("[progress-bar]").each(function() {
            $(this).find(".progress-fill").css({ width: 0});
            $(this).find(".progress-number-mark").css({ left: 0});
        });

        animateProgress($current, 1000);
    })
    
})