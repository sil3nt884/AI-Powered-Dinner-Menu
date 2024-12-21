const { randomBytes, createSecretKey } = require ('crypto');
const { EncryptJWT, parseJwk } = require ('jose');
aaa


 (async () => {

     const secretKey = createSecretKey (Buffer.from('d35yUEpqa2VKbTRYWCpUVys5OkUsaafd', 'utf8'))  //AES-256 key
     const jwt = new EncryptJWT()
         .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
         .setIssuedAt()
         .setIssuer('homeluu')
         .encrypt(secretKey)



     console.log(await jwt);

})()
