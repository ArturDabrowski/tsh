import './assets/scss/app.scss';
import $ from 'cash-dom';
import { polyfill } from 'es6-promise'
import 'isomorphic-fetch';
import { validator } from './validator';

export class App {
  initializeApp() {
    polyfill();
    let self = this;
    
    $('.load-username').on('click', () => {
      let userName = $('.username.input').val();
      // validator(userName);
      if (validator(userName) === 'Not valid') return;

      fetch(`https://api.github.com/users/${userName}`)
        .then(response=> response.json())
        .then(response => {
          self.profile = response;
          self.update_profile();
        })
    })
  }

  update_profile() {
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}
