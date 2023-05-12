const rateLimit =require('express-rate-limit').rateLimit

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 4, // Limit each IP to 4 requests per `window` (here, per 5 minutes)
	
})

module.exports=limiter;