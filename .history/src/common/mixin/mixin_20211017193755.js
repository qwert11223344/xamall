
export const goodsDetailMixin = {
  methods: {
    goodsDetails(prodId, groupId) {
      this.$router.push({
        path: "goodsDetail",
        query: {
          productId: prodId,
          groupId: groupId
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