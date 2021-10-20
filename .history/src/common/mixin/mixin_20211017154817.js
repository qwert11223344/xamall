
export const goodsDetail = {
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