import JsEncrypt from 'jsencrypt'

const encrypt = new JsEncrypt()

// 设置公钥
const setPublic = (publicKey) => {
  encrypt.setPublicKey(publicKey)
}

