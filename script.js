const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const homeContent = `
        <ul class="flex flex-col gap-15 text-base font-normal header-menu-dropdown-list">
            <li class="flex align-center gap-8 header-menu-dropdown-item">
                Main demo
                <div class="badge badge-menu badge-hot">HOT</div>
            </li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">Skincare</li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">
                Simple Modern
                <div class="badge badge-menu badge-hot">HOT</div>
            </li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">
                Simple Fashion
                <div class="badge badge-menu badge-tiktok">tiktok</div>
            </li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">Trendy Style</li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">Minimal Clothings</li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">
                Men's Luxury
                <div class="badge badge-menu badge-hot">HOT</div>
            </li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">Clothing Store</li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">Categories Men’s</li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">Unique Watches</li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">
                Underwear
                <div class="badge badge-menu badge-new">new</div>
            </li>
            <li class="flex align-center gap-8 header-menu-dropdown-item">RTL Demo</li>
        </ul>
    `;

const shopContent = `
        <div class="flex gap-80 header-menu-dropdown-layout">
            <div class="flex flex-col gap-20">
                <h4>Shop Layouts</h4>
                <ul class="flex flex-col gap-10 text-base font-normal header-menu-dropdown-list">
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Filter Left Sidebar</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Filter Right Sidebar</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Filter Dropdown</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Canvas Sidebar</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Full Width</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">List View</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Grid 2 Columns</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Grid 3 Columns</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Grid 4 Columns</li>
                </ul>
            </div>
            <div class="flex flex-col gap-20">
                <h4>Shop Pages</h4>
                <ul class="flex flex-col gap-10 text-base font-normal header-menu-dropdown-list">
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Collection List v1</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Collection List v2</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Load More Button</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Infinite Scrolling</li>
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Panigation Page</li>
                </ul>
            </div>
            <div class="flex gap-20 header-menu-collection">
                <div class="header-menu-collection-image">
                    <button href="#" class="text-sm font-medium btn btn-medium btn-primary">Blazers</button>
                </div>
                <div class="header-menu-collection-image">
                    <button href="#" class="text-sm font-medium btn btn-medium btn-primary">Handbag</button>
                </div>
            </div>
        </div>
    `;

const dropdown = $('.header-menu-dropdown');

$$('.header-menu-item').forEach((item, index) => {
    if (index === 0) {
        item.addEventListener('mouseenter', () => {
            dropdown.innerHTML = homeContent;
            dropdown.style.display = 'block';
            dropdown.style.left = '-5%';
        })

    } else if (index === 1) {
        item.addEventListener('mouseenter', () => {
            dropdown.innerHTML = shopContent;
            dropdown.style.display = 'block';
        })

    }

    item.addEventListener('mouseleave', () => {
        dropdown.style.display = 'none';
    })
})

dropdown.addEventListener('mouseenter', () => {
    dropdown.style.display = 'block';
})

dropdown.addEventListener('mouseleave', () => {
    dropdown.style.display = 'none';
})

const headerActionMiniCart = $('.header-actions').lastElementChild;
const miniCart = $('.mini-cart');
const overlay = $('.overlay');

headerActionMiniCart.addEventListener('mouseenter', () => {
    miniCart.style.display = 'block';
    overlay.style.display = 'block';
    miniCart.classList.toggle('active');
    overlay.classList.toggle('active');
    updateShippingProgress();
})

miniCart.addEventListener('mouseleave', () => {
    miniCart.classList.toggle('active');
    overlay.classList.toggle('active');
    miniCart.style.display = 'none';
    overlay.style.display = 'none';
})

const updateShippingProgress = () => {
    const miniCartShippingLineWidth = $('.mini-cart-shipping-line').offsetWidth;
    // Bỏ qua nếu thẻ đang bị ẩn
    if (miniCartShippingLineWidth === 0) return;

    // Lấy phần trăm tiến độ từ CSS variable và tính ra pixel
    let progressShippingPercent = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--progress-shipping'));
    let progressShippingPixel = (progressShippingPercent / 100) * miniCartShippingLineWidth;

    const gap = 18.409; // width của svg
    let rectSvg = '';

    const totalRectSvg = Math.ceil(progressShippingPixel / gap);
    let currentX = 0;
    for (let i = 0; i < totalRectSvg; i++) {
        rectSvg += `<rect x="${currentX}" y="5.93945" width="18.4088" height="5" transform="rotate(-35 ${currentX} 5.93945)" fill="white" fill-opacity="0.3"/>\n            `;
        currentX += gap;
    }

    let lineShippingContentStr = `
            <svg class="shipping-progress-svg" width="${progressShippingPixel}" height="5" viewBox="0 0 ${progressShippingPixel} 5" style="position: absolute; top: 0; left: 0; z-index: 1; overflow: hidden; border-radius: 10px;" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${rectSvg}
            </svg>
        `;
    // Xóa SVG sọc SVG cũ để thừa do trỏ hover nhiều lần
    const existingSvg = $('.mini-cart-shipping-line').querySelector('.shipping-progress-svg');
    if (existingSvg) {
        existingSvg.remove();
    }
    $('.mini-cart-shipping-line').insertAdjacentHTML('beforeend', lineShippingContentStr);
}

// Mobile menu

const menuMbBtn = $('.header-toggle');
const menuMb = $('.header-menu-mb');
const menuMbTitleWrapper = $('.header-menu-mb-title-wrapper');
const menuMbContent = $('.header-menu-mb-content[data-level="1"]');
const mainMenuTitle = menuMbContent?.getAttribute('data-content') || 'Main Menu';

let activeSubMenu = null;
let menuHistory = [];
let currentMenuTitle = mainMenuTitle;

if (menuMbContent) {
    menuMbContent.querySelectorAll('.header-menu-mb-content-subItem').forEach((subMenu) => {
        menuMbContent.appendChild(subMenu);
    });
}

const showMainMenuItems = () => {
    menuMbContent.querySelectorAll('.header-menu-mb-content-item').forEach((item) => {
        item.style.display = 'flex';
    });

    $('.header-menu-mb-languague').style.display = 'flex';
    $('.header-menu-mb-currency').style.display = 'flex';
}

const hideMainMenuItems = () => {
    menuMbContent.querySelectorAll('.header-menu-mb-content-item').forEach((item) => {
        item.style.display = 'none';
    });

    $('.header-menu-mb-languague').style.display = 'none';
    $('.header-menu-mb-currency').style.display = 'none';
}

const renderMobileMenuTitle = (title = mainMenuTitle, isSubMenu = false) => {
    if (!menuMbTitleWrapper) return;

    menuMbTitleWrapper.innerHTML = `
        <div class="flex justify-between align-center header-menu-mb-title" data-title="Main Menu" ${isSubMenu ? 'style="background: #f5f5f5;"' : ''}>
            <div class="flex align-center gap-30">
                ${isSubMenu ? `<div class="flex align-center gap-15">
                    <div class="header-menu-mb-backBtn">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.42578 10.2344C6.59505 10.4036 6.67969 10.6055 6.67969 10.8398C6.67969 11.0612 6.59505 11.25 6.42578 11.4062C6.26953 11.5755 6.07422 11.6602 5.83984 11.6602C5.60547 11.6602 5.41016 11.5755 5.25391 11.4062L0.253906 6.40625C0.0846354 6.25 0 6.0612 0 5.83984C0 5.60547 0.0846354 5.40365 0.253906 5.23438L5.25391 0.234375C5.41016 0.078125 5.60547 0 5.83984 0C6.07422 0 6.26953 0.078125 6.42578 0.234375C6.59505 0.403646 6.67969 0.605469 6.67969 0.839844C6.67969 1.0612 6.59505 1.25 6.42578 1.40625L2.01172 5.82031L6.42578 10.2344Z"
                            fill="var(--heading)"/>
                        </svg>
                    </div>
                    <p class="text-base font-medium" style="color: var(--heading);">${title}</p>
                </div>` : `
                    <p class="text-sm font-semibold">${title}</p>
                    <p class="text-sm font-semibold uppercase">Categories</p>
                `}
            </div>
            <div class="header-menu-mb-closeBtn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.253906 1.40625C0.0846354 1.25 0 1.0612 0 0.839844C0 0.605469 0.0846354 0.403646 0.253906 0.234375C0.410156 0.078125 0.605469 0 0.839844 0C1.07422 0 1.26953 0.078125 1.42578 0.234375L5.83984 4.64844L10.2539 0.234375C10.4102 0.078125 10.6055 0 10.8398 0C11.0742 0 11.2695 0.078125 11.4258 0.234375C11.5951 0.403646 11.6797 0.605469 11.6797 0.839844C11.6797 1.0612 11.5951 1.25 11.4258 1.40625L7.01172 5.82031L11.4258 10.2344C11.5951 10.4036 11.6797 10.6055 11.6797 10.8398C11.6797 11.0612 11.5951 11.25 11.4258 11.4062C11.2695 11.5755 11.0742 11.6602 10.8398 11.6602C10.6055 11.6602 10.4102 11.5755 10.2539 11.4062L5.83984 7.01172L1.42578 11.4062C1.26953 11.5755 1.07422 11.6602 0.839844 11.6602C0.605469 11.6602 0.410156 11.5755 0.253906 11.4062C0.0846354 11.25 0 11.0612 0 10.8398C0 10.6055 0.0846354 10.4036 0.253906 10.2344L4.66797 5.82031L0.253906 1.40625Z"
                        ${isSubMenu ? 'fill="var(--heading)"' : 'fill="var(--white)"'} />
                </svg>
            </div>
        </div>
    `;

    const backBtn = menuMbTitleWrapper.querySelector('.header-menu-mb-backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', closeSubMenu);
    }

    const closeBtn = menuMbTitleWrapper.querySelector('.header-menu-mb-closeBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileMenu);
    }
}

const resetMobileMenuState = () => {
    if (activeSubMenu) {
        activeSubMenu.style.display = 'none';
        activeSubMenu = null;
    }

    menuHistory = [];
    currentMenuTitle = mainMenuTitle;
    showMainMenuItems();
    renderMobileMenuTitle();
}

const closeSubMenu = () => {
    if (!menuHistory.length) {
        resetMobileMenuState();
        return;
    }

    if (activeSubMenu) {
        activeSubMenu.style.display = 'none';
    }

    const previousState = menuHistory.pop();
    if (!previousState?.menu) {
        activeSubMenu = null;
        currentMenuTitle = mainMenuTitle;
        showMainMenuItems();
        renderMobileMenuTitle();
        return;
    }

    activeSubMenu = previousState.menu;
    currentMenuTitle = previousState.title;
    hideMainMenuItems();
    activeSubMenu.style.display = 'flex';
    renderMobileMenuTitle(currentMenuTitle, true);
}

const openSubMenu = (element) => {
    const target = element.getAttribute('data-target');
    if (!target) return;

    const subMenu = menuMbContent.querySelector(`.header-menu-mb-content-subItem[data-content="${target}"]`);
    if (!subMenu) return;

    menuHistory.push({
        menu: activeSubMenu,
        title: currentMenuTitle,
    });

    if (activeSubMenu) {
        activeSubMenu.style.display = 'none';
    } else {
        hideMainMenuItems();
    }

    subMenu.style.display = 'flex';
    activeSubMenu = subMenu;

    currentMenuTitle = element.querySelector('p')?.textContent?.trim() || mainMenuTitle;
    renderMobileMenuTitle(currentMenuTitle, true);
}

const closeMobileMenu = () => {
    menuMb.classList.remove('is-open');
    resetMobileMenuState();
}

const openMobileMenu = () => {
    menuMb.classList.add('is-open');
    resetMobileMenuState();
}

const toggleMenuMobile = () => {
    const isOpening = !menuMb.classList.contains('is-open');
    if (isOpening) {
        openMobileMenu();
        return;
    }

    closeMobileMenu();
}

renderMobileMenuTitle();

if (menuMbBtn) {
    menuMbBtn.addEventListener('click', toggleMenuMobile);
}

$$('.has-subMenu[data-target]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        openSubMenu(item);
    })
})

// slider
const slider = $('.slider');
const sliderPrevBtn = $('.slider-btn-prev');
const sliderNextBtn = $('.slider-btn-next');
const slides = [
    {
        image: './assest/images/stylish-top-trending.webp',
    },
    {
        image: './assest/images/feature-clothing.webp',
    },
    {
        image: './assest/images/feature-sneaker.webp',
    },
];

let currentSlideIndex = 0;

const renderSlide = (index) => {
    const normalizedIndex = (index + slides.length) % slides.length; // index của slide hiện tại (luôn < slides.length)

    const slide = slides[normalizedIndex];

    currentSlideIndex = normalizedIndex;
    slider.style.background = `url("${slide.image}") lightgray center / cover no-repeat`;
};

const goToNextSlide = () => {
    renderSlide(currentSlideIndex + 1);
};

const goToPrevSlide = () => {
    renderSlide(currentSlideIndex - 1);
};


sliderPrevBtn.addEventListener('click', () => {
    goToPrevSlide();
});

sliderNextBtn.addEventListener('click', () => {
    goToNextSlide();
});

renderSlide(0);


// footer
$$('.footer-links h4, .footer-newsletter h4').forEach(title => {
    title.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            title.parentElement.classList.toggle('active');
        }
    });
});

const backToTopBtn = $('.btn-backToTop');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});