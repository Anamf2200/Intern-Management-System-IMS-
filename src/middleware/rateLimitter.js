const limiter= require("express-rate-limit")


const internLimiter= limiter({
 windowMs: 15 * 60 * 1000,
  max: 100,
  message:"Too many request, please try again later"

})

const taskLimiter= limiter({
     windowMs: 15 * 60 * 1000,
  max: 100,
  message:"Too many request, please try again later"
})

const uploadLimiter=limiter({
      windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many uploads, try again later."
})


module.exports={internLimiter,taskLimiter,uploadLimiter}