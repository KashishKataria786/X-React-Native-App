import { aj } from "../config/arcjet.js";



export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, 
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot access denied",
          message: "Automated requests are not allowed.",
        });
      } else {
        return res.status(403).json({
          error: "Forbidden",
          message: "Access denied by security policy.",
        });
      }
    }


    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    // Fail closed for security - deny access when protection service is unavailable
    return res.status(503).json({
      error: "Service Unavailable",
      message: "Security service temporarily unavailable. Please try again later.",
    });
  }  
};