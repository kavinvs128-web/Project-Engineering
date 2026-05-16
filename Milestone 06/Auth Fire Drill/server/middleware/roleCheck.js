
const roleCheck = (roles) => {
  return (req, res, next) => {
    // BROKEN PART 2: role missing from JWT, so req.user.role is undefined
    if(!roles.includes(req.user?.role)) {
        return res.status(403).json({ error: 'Permission denied', role: req.user?.role });
    }
    next();
  };
};

module.exports = roleCheck;
