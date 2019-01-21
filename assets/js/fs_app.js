var APP = {
    New:function(name) {
        var app = {};
        app.name = name;
        app.path = 'data' + '/' + name;
        function load_file(file) {
            return load_text_file(app.path + '/' + file);
        };
        app.load_info = function() {
            return load_file('info.js');
        };
        app.info = {};
        app.info_s = app.load_info();
        if ( app.info_s != '') {
            eval( app.info_s);
            app.info = info;
            if (typeof(fetch_init) == 'function') app.info['fetch_init'] = fetch_init;
        }
        return app;
    }
}
