import { getPublicKey } from "api/user.js";
import { _setPublicKey } from "until/jsencrypt.js";
import { checkRegister } from "api/user.js";
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

export const setPublicKeyMixin = {
  created() {
    getPublicKey().then((res) => {
      if (res.code === 200) {
        // this.publicKey = res.data.publicKey;
        _setPublicKey(res.data.publicKey);
      }
    });
  },
}

