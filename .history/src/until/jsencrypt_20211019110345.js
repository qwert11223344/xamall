import JsEncrypt from 'jsencrypt'

const encrypt = new JsEncrypt()

// 设置公钥
const _setPublicKey = (publicKey) => {
  encrypt.setPublicKey(publicKey)
}

// 加密
const _encrypt = (data) => {
  encrypt.encrypt(data)
}