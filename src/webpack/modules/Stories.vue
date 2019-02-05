<template lang="pug">
  section
    Modal(@filter="filter")
    transition-group(
      ref='list',
      name='storiesList',
      tag='div',
      ).stories
      Item(
        v-for="(item, index) in visibleStories",
        :key="`panel-${index}`",
        :item="item",
        :data-index="index",
        ref="item")
    button(v-show='!allVisible', @click="visiblePanelLength += interval") more
</template>

<script>
import Constant from '../helper/Constant';
import Item from './Item.vue';
import Modal from './Modal.vue';

export default {
  name: 'Stories',
  components: {
    Item,
    Modal,
  },
  data() {
    return {
      allStories: [],
      filteredStories: [],
      max: Constant.INITIAL_PANEL_LENGTH,
      visiblePanelLength: Constant.INITIAL_PANEL_LENGTH,
    };
  },
  computed: {
    allVisible() {
      return this.visibleStories.length >= this.filteredStories.length;
    },
    visibleStories() {
      return this.filteredStories.slice(0, this.visiblePanelLength);
    },
    interval() {
      return Constant.INITIAL_PANEL_LENGTH;
    },
    hash() {
      return location.hash;
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const response = await this.getJSON();
      // 配列に格納
      Object.entries(response.data).forEach(([key, value]) => {
        this.allStories.push(value);
      });
      this.filteredStories = this.allStories;
      if (this.hash) this.filter({ hashtag: this.hash.substr(1) });
    },
    // JSON取得
    getJSON() {
      return axios.get(`${Constant.GET_JSON_PATH}`);
    },
    // ハッシュタグで絞り込み
    filter({ hashtag }) {
      const isSameHash = hash => hash === hashtag;
      this.filteredStories = _.chain(this.allStories)
        .filter(story => _.some(story.hashtags, isSameHash))
        .shuffle()
        .value();
      // 表示件数を初期化
      this.visiblePanelLength = this.interval;
      // ハッシュをアンカーに設定
      location.hash = hashtag;
      // 表示アニメーション
      if (this.$refs.item) this.$refs.item.forEach(item => item.show());
    },
  },
};
</script>
