import JsEncrypt from 'jsencrypt'

const encrypt = new JsEncrypt()

const setPublic = (publicKey) => {
  encrypt.setPublicKey(publicKey)
}