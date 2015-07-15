import d3Scale from 'd3-scale';
import events from 'events';

import Keyboard from '../interactions/keyboard';
import Surface from '../interactions/surface';
import View from './view';
import ViewCollection from './view-collection';


/**
 * @description
 *
 * The `Timeline` class is the main entry point to create a representation of temporal data.
 * A `Timeline` instance can have multiples `View` instances, which are basically a view window on the overall timeline.
 *
 * The timeline hold the current interaction state and is the central hub for keyboard as well as mouse events.
 * States are there to facilitating interactions with the timeline for:
 * - zooming
 * - moving
 * - editing
 *
 * Methods `register`, `render` and `update` call the same methods on all the `View` instances, which call the same methods one on all its `Layer` instances.
 * - `register`: registers a `View` instance onto the timeline (ie. the timeline can `render` and `update` its different views)
 * - `render`: renders the DOM for the element (if has one) and its descendant (here renders the views, ie. render the DOM tree for a view and attach it in the DOM at the right place)
 * - `update`: update the display according to data changes (ie. update the DOM element attached to the DOM tree with render method, based on new data).
 */
export default class BaseTimeline extends events.EventEmitter {
  /**
   * Creates a new `Timeline` instance
   */
  constructor() {
    super();

    this.views = new ViewCollection(this);

    this._state = null;
    this._handleEvent = this._handleEvent.bind(this);
    this._createInteraction(Keyboard, 'body');
  }

  /**
   * Factory method to add interaction modules the timeline should listen to.
   * By default, the timeline listen to Keyboard, and instance a Surface on each container
   * @param ctor {EventSource} the contructor of the interaction module to instanciate
   * @param el {DOMElement} the DOM element to bind to the EventSource module
   * @param options {Object} options to be applied to the ctor (defaults to `{}`)
   */
  _createInteraction(ctor, el, options = {}) {
    const interaction = new ctor(el, options);
    interaction.on('event', this._handleEvent);
  }

  /**
   * Changes the state of the timeline.
   * `State` instances are used to define the application logic by precising specific user interaction cases, and how they impact the overal temporal data representation.
   *
   * @param {BaseState} state - the state in which the timeline must be setted
   */
  set state(state) {
    if (this._state) { this._state.exit(); }
    this._state = state;
    this._state.enter();
  }

  get state(){
    return this._state;
  }

  /**
   * The callback that is used to listen to interactions modules
   * @params {Event} e - a custom event generated by interaction modules
   */
  _handleEvent(e) {
    // emit event as a middleware
    this.emit('event', e);
    // propagate to the state
    if (!this._state) { return; }
    this._state.handleEvent(e);
  }

  /**
   * Add a view to the timeline
   *
   * Views display the view on the timeline in theirs DOM SVG element.
   */
  register(view) {
    this.views.push(view);
    this._createInteraction(Surface, view.$el);
  }

  *[Symbol.iterator]() {
    yield* this.views[Symbol.iterator]();
  }
}
