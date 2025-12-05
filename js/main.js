import { partnerLogos, productList, partnerLogoBasePath } from "./data.js";

/* =============== 
    Navigation
=================== */
$(function () {
    // hide show nav
    $(".navbar").hidescroll();

    // mobile dropdown menu
    const toggleBtn = $("#toggle_btn");
    const dropdownMenu = $(".dropdown-menu");

    toggleBtn.click(() => {
        dropdownMenu.toggleClass("open");
    });
});

/* =============== 
    Partner Logos 
=================== */

$(function () {
    const container = document.getElementById("partner-logo-list");

    for(let i = 0; i < 2; i++){
      partnerLogos.forEach((logo) => {
        const img = document.createElement("img");
        img.src = partnerLogoBasePath + logo.fileName;
        img.alt = logo.alt;
        img.classList.add('logo-ticker-image');
        container.appendChild(img);
    });
    } 
            
});
/* =============== 
    Products
=================== */
$(function () {
    //thêm activeTab vào li đầu tiên
    $("li:first").addClass("activeTab");

    // đổi màu activeTab
    $("li").on("click", function () {
       $("li").removeClass("activeTab");
       $('div[id="products-tabs"] ul .r-tabs-state-active').addClass("activeTab");
    })

    $('#products-tabs').responsiveTabs({
        animation: "fade",
        duration: 200, 
    });
});

/* =============== 
    Best Sellers
=================== */
$(function () {
    $(".slider").slick({
        autoplay: true,
        dots: true,
    });
})

/* ================ 
        Stats
  =================== */
$(function () {
  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 2000,
          delay: 16,
        });
        el.classList.add("is-visible");
      }
    });
  };

  const IO = new IntersectionObserver(callback, { threshold: 1 });

  const el = document
    .querySelectorAll(".counter")
    .forEach((node) => IO.observe(node));
});

/* ================ 
  Tất Cả Sản Phẩm
  =================== */
$(function () {
  productList.map((product) => {
    $("#product-items--container").append(`
      <div data-filterable data-filter-category=${product.category}
 class="relative col-span-3 overflow-hidden group hover:shadow-md">
                <div class="portfolio-item">
                  <div>
                    <img
                      src=${product.img}
                      alt="product-img"
                    />

                    <div class="product-item-overlay">
                      <div class="product-details">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      `);
  });

  $.fn.filterjitsu();

    // xử lý active tab
    function getAllUrlParam(url) {
        url = url || window.location.href;

        const param = {};

        // lấy query ở đoạn đằng sau dấu ? (item index = 1 là để lấy đằng sau dấu ?)
        const queryString = url.split("?")[1];

        if(!queryString) {
            return param;
        }

        const [key, value] = queryString.split("=");

        if(key) {
            param[key] = value ? value : "";
        };

        return param;
    }

    const urlParam = getAllUrlParam();

    $("#allProduct-filters a").removeClass("activeFilter");

    const category = urlParam["filter-category"];

    switch (category) {
        case "whitetea":
            $("#f-whitetea").addClass("activeFilter");
        break;
        case ("oolong"):
                $("#f-oolong").addClass("activeFilter");
        break;
        case ("blacktea"):
                $("#f-blacktea").addClass("activeFilter");
        break;
        case ("matcha"):
                $("#f-matcha").addClass("activeFilter");
        break;
        default:
            $("#f-all").addClass("activeFilter");
            break;
    }
});


/* ================ 
  AOS Animation
  =================== */
$(function () {
    AOS.init();

// You can also pass an optional settings object
// below listed default settings
  AOS.init({
  // --- Global ---
  disable: false,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 50, // giảm xuống một chút cho cảm giác mượt hơn

  // --- Per element defaults ---
  offset: 80,         // gần viewport hơn, vào khung là chạy luôn
  delay: 50,          // có hơi tí delay tạo cảm giác mượt (0.05s)
  duration: 800,      // kéo dài animation ~0.8s trông mượt hơn 0.5s
  easing: 'ease-out-quart', // easing ra chậm, vào nhanh, nhìn rất “smooth”
  once: true,         // chỉ animate 1 lần khi scroll xuống
  mirror: false,      // không animate ngược khi scroll lên
  anchorPlacement: 'top-bottom' // bắt đầu khi top phần tử chạm bottom viewport
});

});
