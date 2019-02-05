<template lang="pug">
  .item
    p {{ item.id }}
    img(:src='item.src')
</template>

<script>
export default {
  name: 'Item',
  components: {},
  props: {
    item: Object,
    dataIndex: Number,
  },
  data() {
    return {};
  },
  mounted() {
    this.$el.style.opacity = 0;
    this.show();
  },
  methods: {
    show() {
      velocity(this.$el, { opacity: [1, 'linear', 0] }, {
        delay: this.dataIndex * 50,
      });
    },
  },
};
</script>
