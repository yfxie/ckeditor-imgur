( function() {
    CKEDITOR.plugins.add( 'imgur',
        {
            lang: ['zh', 'en'],
            init: function( editor )
            {
                ClientID = editor.config.imgurClientID;
                if(!ClientID)
                    alert(editor.lang.imgur.ClientIDMissing);

                var count = 0;
                var $placeholder = $("<div></div>").css({
                    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: "rgba(20, 20, 20, .6)", padding: 5, color: "#fff"
                }).hide();

                editor.on("instanceReady", function (){
                    var $w = $(editor.window.getFrame().$).parent();
                    $w.css({ position:'relative' });
                    $placeholder.appendTo($w);
                });

                editor.ui.addButton( 'Imgur',
                    {
                        label : editor.lang.imgur.label,
                        toolbar : 'insert',
                        command : 'imgur',
                        icon : this.path + 'images/icon.png'
                    });

                editor.addCommand( 'imgur', {
                    exec: function(){
                        $input = $('<input type="file" multiple/>');
                        $input.on("change", function (e) {
                            files = e.target.files;
                            $.each(files, function(i, file){
                                count++;
                                form = new FormData();
                                form.append('image', file);
                                $.ajax({
                                    url: 'https://api.imgur.com/3/image',
                                    headers: { Authorization: "Client-ID " + ClientID },
                                    type: 'POST',
                                    data: form,
                                    cache: false,
                                    contentType: false,
                                    processData: false
                                }).always(function(jqXHR){
                                    count--;
                                    $placeholder.text(count + editor.lang.imgur.uploading).toggle(count != 0);

                                    if(jqXHR.status != 200 ) {
                                        res = $.parseJSON(jqXHR.responseText);
                                    }else{
                                        res = jqXHR;
                                    }

                                    if(res.data.error) {
                                        alert(editor.lang.imgur.failToUpload + res.data.error);
                                    } else {
                                        content = '<img src="' + res.data.link +'"/>';
                                        var element = CKEDITOR.dom.element.createFromHtml(content);
                                        editor.insertElement(element);
                                    }


                                });
                            });
                            $placeholder.text(count + editor.lang.imgur.uploading).fadeIn();
                        });

                        $input.click();

                    }
                });

                editor.on( 'paste', function( evt ) {

                    var data = evt.data,
                    // Prevent XSS attacks
                    tempDoc = document.implementation.createHTMLDocument( '' ),
                    temp = new CKEDITOR.dom.element( tempDoc.body ),
                    imgs, img, i;

                    if (data && data.dataValue && typeof $(data.dataValue).attr("src") != "undefined") {
                        count++;
                        var dataURL = $(data.dataValue).attr("src");

                        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

                        var form = new FormData();
                        form.append('image', dataURL);

                        $.ajax({
                            url: 'https://api.imgur.com/3/image',
                            headers: { Authorization: "Client-ID " + editor.config.imgurClientID },
                            type: 'POST',
                            data: form,
                            cache: false,
                            contentType: false,
                            processData: false
                        }).always(function(jqXHR){
                            count--;
                            $placeholder.text(count + editor.lang.imgur.uploading).toggle(count != 0);

                            if(jqXHR.status != 200 ) {
                                res = $.parseJSON(jqXHR.responseText);
                            }else{
                                res = jqXHR;
                            }

                            if(res.data.error) {
                                alert(editor.lang.imgur.failToUpload + res.data.error);
                            } else {
                                content = '<img src="' + res.data.link +'"/>';
                                var element = CKEDITOR.dom.element.createFromHtml(content);
                                editor.insertElement(element);
                            }
                        });
                        $placeholder.text(count + editor.lang.imgur.uploading).fadeIn();

                        return false;
                    }

                     for ( i = 0; i < evt.data.dataTransfer.getFilesCount(); i++ ) {
                        count++;
                         file = evt.data.dataTransfer.getFile( i );
                        form = new FormData();
                        form.append('image', file);
                        $.ajax({
                            url: 'https://api.imgur.com/3/image',
                            headers: { Authorization: "Client-ID " + editor.config.imgurClientID },
                            type: 'POST',
                            data: form,
                            cache: false,
                            contentType: false,
                            processData: false
                        }).always(function(jqXHR){
                            count--;
                            $placeholder.text(count + editor.lang.imgur.uploading).toggle(count != 0);

                            if(jqXHR.status != 200 ) {
                                res = $.parseJSON(jqXHR.responseText);
                            }else{
                                res = jqXHR;
                            }

                            if(res.data.error) {
                                alert(editor.lang.imgur.failToUpload + res.data.error);
                            } else {
                                content = '<img src="' + res.data.link +'"/>';
                                var element = CKEDITOR.dom.element.createFromHtml(content);
                                editor.insertElement(element);
                            }
                        });
                        $placeholder.text(count + editor.lang.imgur.uploading).fadeIn();
                     }
                });
                
            }
        });
})();

