
export const goodsDetailMixin = {
  methods: {
    goodsDetails(id) {
      if (this.$route.path.indexOf(id) != -1) {
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