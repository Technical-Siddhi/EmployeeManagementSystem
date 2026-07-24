const ROLE_PERMISSIONS = {
  admin: new Set(['employees:manage', 'attendance:manage', 'leaves:manage']),
  hr: new Set(['employees:view', 'leaves:approveReject']),
  employee: new Set(['profile:viewOwn', 'attendance:markOwn', 'leaves:applyOwn']),
};

function requireRoles(allowedRoles = []) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json({ msg: 'Unauthorized' });
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    next();
  };
}

function requirePermission(permission) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json({ msg: 'Unauthorized' });

    const permissions = ROLE_PERMISSIONS[role];
    if (!permissions || !permissions.has(permission)) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    next();
  };
}

module.exports = {
  ROLE_PERMISSIONS,
  requireRoles,
  requirePermission,
};

