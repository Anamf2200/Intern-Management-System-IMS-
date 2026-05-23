const admin= require('firebase-admin')
const serviceAccount= require("./interne-management-system-firebase-adminsdk-fbsvc-6922452b34.json")


admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    storageBucket:"interne-management-system.firebasestorage.app"

})

const bucket= admin.storage().bucket()
module.exports=bucket