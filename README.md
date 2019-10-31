# Ckeditor::Imgur

A CKEditor plugin that help you upload images to `imgur` in easy way.

`imgur` is a photo storage service for free.

## Installation

You must install [CKEditor](https://github.com/galetahub/ckeditor) first and do following:

Add this line to your application's Gemfile:

    gem 'ckeditor-imgur'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install ckeditor-imgur
    
This plugin requires jquery, if your website is without it, Add the following to pages with editors:
```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
```

## Usage

After ckeditor-imgur installed, add plugin setting to your CKEditor `app/assets/javascripts/ckeditor/config.js`:

```
CKEDITOR.editorConfig = function (config) {
    ...
    config.extraPlugins = 'imgur';
    // Get your client-id from https://api.imgur.com/oauth2/addclient
    config.imgurClientID = '55d8ba08326ec75';
    ...
};
```

That's all. Your CKEditor have a imgur button in insert group.

![ckeditor-imgur demo](http://g.recordit.co/bogXrZl0H0.gif)


## Contributing

1. Fork it ( https://github.com/yfxie/ckeditor-imgur/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
