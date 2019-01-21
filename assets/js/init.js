var $wb_root = null;


//file:///D:/Users/slore/Desktop/swRepo/fetchMgr.hta

$wb_root = document.location.href.substring(8);
$wb_root = $wb_root.substring(0, $wb_root.lastIndexOf('/') );
page_init();
i18n_trans();

function page_init() {
    $('#menu_apps').click();
}

function i18n_trans() {
    $('.i18n-text').each(function(){
        $(this).text($i18n[$(this).text()]);
    });

    $('.i18n-html').each(function(){
       // turn the tag names into lowercase(compatibility for IE8)
        var key = $(this).html();
        key = key.replace(/<([^<]+)>/gi, function (x) {
            return x.toLowerCase();
        });
        $(this).html($i18n[key]);
    });

    $('.i18n-title').each(function(){
        $(this).attr('title', $i18n[$(this).attr('title')]);
    });

}
