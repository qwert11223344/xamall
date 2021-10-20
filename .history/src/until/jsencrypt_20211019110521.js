import JsEncrypt from 'jsencrypt'

const encrypt = new JsEncrypt()

// 设置公钥
export const _setPublicKey = (publicKey) => {
  encrypt.setPublicKey(publicKey)
}

// 加密
export const _encrypt = (data) => {
  return encrypt.encrypt(data)
}

