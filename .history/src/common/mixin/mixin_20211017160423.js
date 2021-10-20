
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