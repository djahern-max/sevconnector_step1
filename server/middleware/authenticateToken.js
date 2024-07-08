const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Assuming the token is sent as "Bearer <token>"

  if (token == null) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Set the decoded user ID (and any other data) to the request object
    next() // Move to the next middleware or route handler
  } catch (err) {
    res.status(403).send('Invalid token.')
  }
}

module.exports = authenticateToken
