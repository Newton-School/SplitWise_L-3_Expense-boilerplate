const isAuthenticated = (requiredRole) => (req, res, next) => {
  const userRole = req.user.role;

  // Check if the user's role matches the required role
  if (userRole !== requiredRole) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // User is authenticated and has the required role, proceed to the next middleware
  next();
};

module.exports = isAuthenticated;
