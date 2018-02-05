import * as elix from './elix.js';
const merge = elix.updates.merge;

// TODO: round robbing slideshow, after last pic comes first pic again
// TODO: show picture description text at bottom

import '../src/HcArrowButton.js';

const Base =
  elix.ArrowDirectionMixin(
  elix.CustomTagsMixin(
    elix.SlidingPages
  ));

// Shows how a carousel subclass can define custom tags for the arrows and dots.
class HcCarousel extends Base {
  get defaultState() {
    return Object.assign({}, super.defaultState, {
      selectionWraps: true,
    });
  }
  get [elix.symbols.template]() {
    return `
      <style>
        .thumb {
          margin: .5rem .5rem 0 0;
        }
        .thumb:hover {
          outline: 4px solid #fad73c;
          outline-offset: -4px;
        }
      </style>
      <div>
        ${this[elix.ArrowDirectionMixin.inject](
          super[elix.symbols.template]
        )}
        <img class="thumb" src="./1-thumb.jpg"/>
        <img class="thumb" src="./2-thumb.jpg"/>
        <img class="thumb" src="./3-thumb.jpg"/>
      </div>
    `;
  }
  get tags() {
    return Object.assign({}, super.tags, {
      arrowButton: 'hc-arrow-button',
      // pageDot: 'hc-page-dot'
    });
  }
  get updates() {
    const arrowButtonStyle = {
      height: '38px',
      width: '38px',
      'border-radius': '7.14286rem',
      'border': '1px solid #c2c7cc',
      'background-color': '#fff',
      // border-color: #51a9e0;  <<<- the hover color, dont know where it goes :)
    };
    return merge(super.updates, {
      $: {
        arrowIconLeft: {
          style: arrowButtonStyle,
        },
        arrowIconRight: {
          style: arrowButtonStyle,
        }
      }
    });
  }
}
customElements.define('hc-carousel', HcCarousel);
