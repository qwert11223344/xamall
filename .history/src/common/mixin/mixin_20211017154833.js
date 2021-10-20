
export const goodsDetailMixin = {
  methods: {
    goodsDetails(id) {
      this.$router.push({
        path: "goodsDetail",
        query: {
          productId: id,
        },
      });
    },
  }
}