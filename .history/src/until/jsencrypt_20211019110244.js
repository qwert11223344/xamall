import JsEncrypt from 'jsencrypt'

const encrypt = new JsEncrypt()

// 设置公钥
const setPublic = (publicKey) => {
  encrypt.setPublicKey(publicKey)
}

// 加密
const encrypt = (data) => {
  encrypt.encrypt(data)
}