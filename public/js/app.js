/*
 *  Copyright (c) 2015, Parse, LLC. All rights reserved.
 *
 *  You are hereby granted a non-exclusive, worldwide, royalty-free license to
 *  use, copy, modify, and distribute this software in source code or binary
 *  form for use in connection with the web services and APIs provided by Parse.
 *
 *  As with any software that integrates with the Parse platform, your use of
 *  this software is subject to the Parse Terms of Service
 *  [https://www.parse.com/about/terms]. This copyright notice shall be
 *  included in all copies or substantial portions of the software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *  IN THE SOFTWARE.
 *
 */

var React = require('react');
var Parse = require('parse');

// Insert your app's keys here:
//Parse.initialize('APPLICATION_ID', 'JAVASCRIPT_KEY');
Parse.initialize("mattico-finanny");
var port = window.location.port;
var url = window.location.protocol + '//' + window.location.hostname +':'+port+ '/parse';
//alert(url);
Parse.serverURL = url;


var LoginWrapper = require('./LoginWrapper.react.js');
$(function(){
React.render(
  <LoginWrapper />,
  document.getElementById('app')
);
});

String.prototype.hashCode = function(){
  var str = this;
    var hash = 33;
    var char = ' ';
    for (var i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = char + (hash << 6) + (hash << 16) - hash;
    }
    return window.btoa(hash.toString());
}
