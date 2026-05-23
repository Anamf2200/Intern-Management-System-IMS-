const nodemailer= require("nodemailer")


async function sendEmail(toEmail,filePath,internName){
    try{
  const transporter= nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        }
    })

    const mailOption={
        from:process.env.EMAIL,
        to:toEmail,
        subject: '🎓 Internship Completion Certificate',
        text: `Congratulations ${internName}! Your internship certificate is attached.`,
        attachments:[
            {
                filename:'cettificate.pdf',
                path:filePath
            }
        ]
    }

    const info= await transporter.sendMail(mailOption)
    // console.log("Email sent:", info.messageId);
        return true;
    }

    catch(err){
     console.error("Email error:", err);

    }
  

}

module.exports=sendEmail