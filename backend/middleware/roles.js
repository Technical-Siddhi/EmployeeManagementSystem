const ROLE_PERMISSIONS = {
  admin: new Set(['employees:manage', 'attendance:manage', 'leaves:manage', 'employees:view', 'leaves:approveReject', 'profile:viewOwn', 'attendance:markOwn', 'leaves:applyOwn']),
  hr: new Set(['employees:view', 'leaves:approveReject', 'employees:manage', 'attendance:manage', 'leaves:manage', 'profile:viewOwn', 'attendance:markOwn', 'leaves:applyOwn']),
  manager: new Set(['employees:view', 'attendance:manage', 'leaves:approveReject', 'profile:viewOwn', 'attendance:markOwn', 'leaves:applyOwn']),
  employee: new Set(['profile:viewOwn', 'attendance:markOwn', 'leaves:applyOwn']),
};

function requireRoles(allowedRoles = []) {
  return (req, res, next) => {
    const rawRole = req.user?.role;
    if (!rawRole) return res.status(401).json({ msg: 'Unauthorized' });

    const normalizedRole = rawRole.toString().toLowerCase().trim();
    const hasPermission = allowedRoles.some(
      (r) => r.toString().toLowerCase().trim() === normalizedRole
    );

    if (!hasPermission) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role permissions' });
    }
    next();
  };
}

function requirePermission(permission) {
  return (req, res, next) => {
    const rawRole = req.user?.role;
    if (!rawRole) return res.status(401).json({ msg: 'Unauthorized' });

    const normalizedRole = rawRole.toString().toLowerCase().trim();
    const permissions = ROLE_PERMISSIONS[normalizedRole];
    if (!permissions || !permissions.has(permission)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
}

module.exports = {
  ROLE_PERMISSIONS,
  requireRoles,
  requirePermission,
};

