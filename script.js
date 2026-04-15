$(document).ready(function () {
    const homeContent = `
        <ul class="flex flex-col gap-15 text-base font-normal header-menu-dropdown-list">
            <li class="flex align-center gap-8 header-menu-dropdown-item">
                Main demo
                <div class="badge badge-menu badge-hot">HOT</div>
            </li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">Skincare</li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">
                Simple Modern
                <div class="badge badge-menu badge-hot">HOT</div>
            </li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">
                Simple Fashion
                <div class="badge badge-menu badge-tiktok">tiktok</div>
            </li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">Trendy Style</li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">Minimal Clothings</li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">
                Men's Luxury
                <div class="badge badge-menu badge-hot">HOT</div>
            </li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">Clothing Store</li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">Categories Men’s</li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">Unique Watches</li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">
                Underwear
                <div class="badge badge-menu badge-new">new</div>
            </li>
            <li class=" flex align-center gap-8 header-menu-dropdown-item">RTL Demo</li>
        </ul>
    `;

    const shopContent = `
        <div class="flex gap-80 header-menu-dropdown-layout">
            <div class="flex flex-col gap-20">
                <h4>Shop Layouts</h4>
                <ul class="flex flex-col gap-10 text-base font-normal header-menu-dropdown-list">
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Filter Left Sidebar</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Filter Right Sidebar</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Filter Dropdown</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Canvas Sidebar</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Full Width</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">List View</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Grid 2 Columns</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Grid 3 Columns</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Grid 4 Columns</li>
                </ul>
            </div>
            <div class="flex flex-col gap-20">
                <h4>Shop Pages</h4>
                <ul class="flex flex-col gap-10 text-base font-normal header-menu-dropdown-list">
                    <li class="flex align-center gap-8 header-menu-dropdown-item">Collection List v1</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Collection List v2</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Load More Button</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Infinite Scrolling</li>
                    <li class=" flex align-center gap-8 header-menu-dropdown-item">Panigation Page</li>
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

    $('.header-menu-item').hover(
        function () {
            // Lấy index của thẻ được hover (0 là Home, 1 là Shop, v.v...)
            const index = $('.header-menu-item').index(this);
            
            if (index === 0) {
                // Home
                $('.header-menu-dropdown').html(homeContent).css({ 'left': '-5%' }).stop(true, true).fadeIn(200);
            } else if (index === 1) {
                // Shop
                $('.header-menu-dropdown').html(shopContent).stop(true, true).fadeIn(200);
            } else {
                $('.header-menu-dropdown').stop(true, true).delay(100).fadeOut(200);
            }
        },
        function () {
            // Tắt dropdown nếu rời chuột
            $('.header-menu-dropdown').stop(true, true).delay(100).fadeOut(200);
        }
    );

    $('.header-menu-dropdown').hover(
        function () {
            $(this).stop(true, true).fadeIn(200);
        },
        function () {
            $(this).stop(true, true).delay(100).fadeOut(200);
        }
    );
});
