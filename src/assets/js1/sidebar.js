
const sidebar = document.getElementById('sidebar_class');
const toggleBtn = document.getElementById('toggle_btn');
const body = document.body;
let shouldToggle = false; // Flag to determine if 'mini_sidebar' class should be toggled

sidebar.addEventListener('mouseenter', function () {
    if (body.classList.contains('mini_sidebar')) {
        shouldToggle = true;
    }
});

sidebar.addEventListener('mouseleave', function () {
    if (shouldToggle) {
        shouldToggle = false;
    }
});
