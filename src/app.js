import './assets/scss/app.scss';
import $ from 'cash-dom';
import { polyfill } from 'es6-promise'
import 'isomorphic-fetch';
import { validator } from './utils/validator';
import HistoryListElement from './components/history';

const eventTypes = [
	'PullRequestEvent',
	'PullRequestReviewCommentEvent',
];

export class App {
  initializeApp() {
    polyfill();
    let self = this;
    
    $('.load-username').on('click', () => {
      let userName = $('.username.input').val();

      if (validator(userName) === 'Not valid') return;

      $('.timeline-item').remove();
      $('.loader').removeClass('is-hidden');

      fetch(`https://api.github.com/users/${userName}`)
        .then(userResponse => userResponse.json())
        .catch(error => console.error('Error:', error))
        .then(userResponse => {
          self.update_profile(userResponse);
          return fetch(`https://api.github.com/users/${userName}/events/public`)
        })
        .then(eventsResponse => eventsResponse.json())
        .catch(error => console.error('Error:', error))
        .then(eventsResponse => {
          self.update_history(eventsResponse)
          $('.loader').addClass('is-hidden');
        })
    })

    $('.timeline').on('click', '.timeline-marker, .timeline-item', function() {
      $(this).parent().find('.timeline-item, .timeline-marker').removeClass('is-primary')
      $(this).addClass('is-primary')
      $(this).children().addClass('is-primary')
    })
  }

  update_profile(profile) {
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', profile.avatar_url)
    $('#profile-url').attr('href', profile.html_url).text(profile.login)
    $('#profile-bio').text(profile.bio || '(no information)')
  }

  update_history(events) {
    $('#user-timeline').append(events.filter(event => eventTypes
        .some(eventType => eventType === event.type))
        .map(HistoryListElement))
  }
}
