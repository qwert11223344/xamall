
export const goodsDetailMixin = {
  methods: {
    goodsDetails(prodId, group) {
      this.$router.push({
        path: "goodsDetail",
        query: {
          productId: prodId,
          group,
        },
      });
    },
  }
}

export const messageMixin = {
  methods: {
    //弹出信息
    message(message, type) {
      this.$message({
        message,
        type,
      });
    },
  }
}