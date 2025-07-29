const isSuperAdmin = (req, res, next) => {
    console.log("admin _id",req.admin?.role)
  if (req.admin?.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied: Super admin only" });
  }
  next();
};

module.exports = isSuperAdmin;
