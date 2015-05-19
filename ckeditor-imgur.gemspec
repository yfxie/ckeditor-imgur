# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'ckeditor/imgur/version'

Gem::Specification.new do |spec|
  spec.name          = "ckeditor-imgur"
  spec.version       = Ckeditor::Imgur::VERSION
  spec.authors       = ["JSON"]
  spec.email         = ["yfxie@me.com"]
  spec.summary       = %q{CKEditor image upload plugin}
  spec.description   = %q{A CKEditor plugin that help you upload image to imgur in easy way}
  spec.homepage      = "https://github.com/yfxie/ckeditor-imgur"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
end
