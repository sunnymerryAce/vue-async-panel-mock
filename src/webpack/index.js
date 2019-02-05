/**
 * @author Yoichiro Hirano
 * @description Develop Environment Model
 * @created 2018/12/03
 * @link https://
 */

import Vue from 'vue';
import Stories from './modules/Stories.vue';

// import { getIndexValueOfGivenPercentage } from './helper/util';

export default class Index {
  /**
   * constructor
   */
  constructor() {
    this.initialize();
  }

  initialize() {
    this.stories = new Vue({
      el: '#main',
      components: { Stories },
      template: '<stories></stories>',
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.DEV_ENV_MODEL = window.DEV_ENV_MODEL || {};
  window.DEV_ENV_MODEL.INDEX = window.DEV_ENV_MODEL.INDEX || new Index();
});
