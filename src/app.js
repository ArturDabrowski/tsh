import './assets/scss/app.scss';
import $ from 'cash-dom';
import { polyfill } from 'es6-promise'
import 'isomorphic-fetch';
import { validator } from './utils/validator';
import HistoryListElement from './components/history';
import ProfileInformation from './components/profile';

const eventTypes = [
	'PullRequestEvent',
	'PullRequestReviewCommentEvent',
];

export class App {
  initializeApp() {
    polyfill();
    let self = this;
    
    $('.load-username').on('click', () => self.onSearchProfile(self));
    $('.username.input').on('keypress', (e) => {
      if(e.which == 13) {
        self.onSearchProfile(self);
      }
    });

    $('.events-container').on('click', '.timeline-marker, .timeline-item', function() {
      $(this).parent().find('.timeline-item, .timeline-marker').removeClass('is-primary');
      $(this).addClass('is-primary');
      $(this).children().addClass('is-primary');
    });
  }

  onSearchProfile(self) {
    let userName = $('.username.input').val();

    if (validator(userName)) {
      $('.username.input').addClass('field-invalid');
      return;
    }
    $('.username.input').removeClass('field-invalid');

    $('.events-container').empty();
    $('.profile-container').empty();
    $('.loader').removeClass('is-hidden');

    fetch(`https://api.github.com/users/${userName}`)
      .then(userResponse => {
        if(userResponse.ok) {
          return userResponse.json();
        }
        $('.profile-container').prepend('<h2 class="subtitle is-4">No such profile</h2>');
        throw new Error('Network response was not ok.');
      })
      .then(userResponse => {
        self.update_profile(userResponse)
        return fetch(`https://api.github.com/users/${userName}/events/public`)
      })
      .then(eventsResponse => {
        if(eventsResponse.ok) {
          return eventsResponse.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(eventsResponse => {
        eventsResponse.length > 0 && self.update_history(eventsResponse)
      })
      .catch(error => console.error('Error:', error))
      .finally(() => $('.loader').addClass('is-hidden'))
    }

  update_profile(profile) {
    $('.profile-container').append(ProfileInformation(profile));
  }

  update_history(events) {
    $('.events-container').prepend('<h2 class="subtitle is-4">History</h2>');
    $('.events-container').append('<div class="timeline"></div>');
    $('.timeline').append(events.filter(event => eventTypes
        .some(eventType => eventType === event.type))
        .map(HistoryListElement));
  }
}
