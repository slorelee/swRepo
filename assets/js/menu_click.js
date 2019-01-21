var _current_page = '';

$('#menu_apps').click(function(){
    switch_page('apps');
    apps_page_init();
});


$('#menu_about').click(function(){
    switch_page('about');
});

function switch_page(page) {
    _current_page = page;
    $('.pure-menu-item').removeClass('pure-menu-selected');
    $('#menu_' + page).parent().addClass('pure-menu-selected');

    $('.content_page').hide();
    $('#page_' + page).show();
}

