
export const goodsDetailMixin = {
  methods: {
    goodsDetails(id) {
      if (this.$route.path) {
        this.$router.push({
          path: "goodsDetail",
          query: {
            productId: id,
          },
        });
      }
    },
  }
}