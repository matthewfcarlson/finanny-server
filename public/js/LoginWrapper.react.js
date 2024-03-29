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
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var AppWrapper = require('./AppWrapper.react.js');

var LoginWrapper = React.createClass({
  mixins: [ParseReact.Mixin],

  getInitialState: function() {
    return {
      error: null,
      signup: false,
      thinking:false,
    };
  },

  observe: function(props,state) {
    return {
      current_user: ParseReact.currentUser
    };
  },

  renderUsername: function() {
    // this works, and updates correctly
    if(this.data.user){
      return(this.data.current_user.username)
    }
  },

  render: function() {
      console.log(this.data);
    if (this.data.current_user ) {
      return (
        <div>
          <a className='logOut' onClick={this.logOut}>
            <svg viewBox='0 0 60 60'>
              <path d="M0,0 L30,0 L30,10 L10,10 L10,50 L30,50 L30,60 L0,60 Z"></path>
              <path d="M20,23 L40,23 L40,10 L60,30 L40,50 L40,37 L20,37 Z"></path>
            </svg>
          </a>
          <AppWrapper />
        </div>
      );
    }
    return (
      <div>
        <h1>AnyBudget</h1>
        <h2>Powered by Parse + React</h2>
        <div className='loginForm' onKeyDown={this.keyDown}>
          {
            this.state.error ?
            <div className='row centered errors'>{this.state.error}</div> :
            null
          }
          <div className='row'>
            <label htmlFor='username'>Username</label>
            <input ref='username' id='username' type='text' />
          </div>
          <div className='row'>
            <label htmlFor='password'>Password</label>
            <input ref='password' id='password' type='password' />
          </div>
          <div className='row centered'>
            {this.state.thinking ?
                <i className='fa fa-spin fa-gear fa-2x'></i>:
                <a className='button' onClick={this.submit}>
                {this.state.signup ? 'Sign up' : 'Log in'}
                </a>

            }
          </div>

          <div className='row centered'>
            or&nbsp;
            <a onClick={this.toggleSignup}>
              {this.state.signup ? 'log in' : 'sign up'}
            </a>
          </div>
        </div>
      </div>
    );
  },

  submit: function() {
    var self = this;
    var username = React.findDOMNode(this.refs.username).value;
    var password = React.findDOMNode(this.refs.password).value;//.hashCode();
    if (username.length && password.length) {
        self.setState({
          thinking: true
        });
      if (this.state.signup) {
        var u = new Parse.User({
          username: username,
          password: password
        });
        u.signUp().then(function() {
          self.setState({
            error: null,
            thinking:false,
          });
        }, function() {
          self.setState({
            error: 'Invalid account information',
            thinking:false,
          });
        });
      } else {
        Parse.User.logIn(username, password).then(function(us) {
            console.log(Parse.User.current());
            console.log(Parse.CoreManager.getUserController());
          self.setState({
            error: null,
            thinking:false,
            //user: us,
          });
        }, function() {
          self.setState({
            error: 'Incorrect username or password',
            thinking:false,
            //user: null
          });
        });
      }
    } else {
      this.setState({
        error: 'Please enter all fields'
      });
    }
  },

  logOut: function() {
    Parse.User.logOut();
  },

  keyDown: function(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
  },

  toggleSignup: function() {
    this.setState({
      signup: !this.state.signup
    });
  }

});

module.exports = LoginWrapper;
