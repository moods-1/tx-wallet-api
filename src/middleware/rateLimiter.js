import ratelimit from '../config/upstash.js';

const ratelimiter = async(req,res,next) => {
    try {
        // In production these are things to check for rate limiting: userId, IP, etc ...
        // Right now my-rate-limit blocks all users
        const { success } = await ratelimit.limit("my-rate-limit");
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later."
            })
        }
        next();
    } catch (error) {
        console.log("Rate limit error: ", error);
        next(error);
    }
}
export default ratelimiter;