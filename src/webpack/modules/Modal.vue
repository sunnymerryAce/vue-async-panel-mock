<template lang="pug">
  transition
    .modal
      button(@click='open').open open
      .buttons(v-show="show")
        button.button(@click="emitFilter", data-hashtag='friend') friend
        button.button(@click="emitFilter", data-hashtag='5DOOR') 5DOOR
        button.button(@click="emitFilter", data-hashtag='enjoy') enjoy
        button.button(@click="emitFilter", data-hashtag='memory') memory
</template>

<script>
export default {
  name: 'Modal',
  components: {},
  props: {
    item: Object,
    dataIndex: Number,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {},
  beforeUpdate() {},
  updated() {},
  mounted() {
    this.$el.style.opacity = 0;
    this.panelUpdate();
  },
  methods: {
    panelUpdate() {
      this.$el.style.opacity = 0;
      velocity(
        this.$el,
        { opacity: 1 },
        {
          delay: this.dataIndex * 150,
        },
      );
    },
    open() {
      this.show = true;
    },
    emitFilter(e) {
      if (location.hash.substr(1) === e.target.dataset.hashtag) return;
      this.$emit('filter', { hashtag: e.target.dataset.hashtag });
    },
  },
};
</script>
