import { getPublicKey } from "api/user.js";
import { _setPublicKey } from "until/jsencrypt.js";
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

export const checkFormMixin = {
  data() {
    let checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        //发起请求验证用户名是否重复
        checkRegister({ userName: value }).then((res) => {
          if (res.success === false) {
            return callback(new Error(res.message));
          } else {
            callback();
            this.check.userName = true;
          }
        });
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[a-zA-Z]\w{5,9}$/.test(value)) {
        callback(new Error("字母开头,6~10位,含字母数字或下划线"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
        this.check.pass = true;
      }
    };
    let validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        this.check.phone = true;
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        pass: "",
        checkPass: "",
        phone: "",
      },
    }
  }
}