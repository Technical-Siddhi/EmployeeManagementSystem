/**
 * Resolves the destination dashboard URL based on the user's role.
 * Role matching is case-insensitive.
 *
 * Admin      -> /admin/dashboard
 * HR         -> /hr/dashboard
 * Manager    -> /manager/dashboard
 * Employee   -> /employee/dashboard
 */
export const getDashboardRouteByRole = (role) => {
  if (!role) return '/unauthorized';

  const normalizedRole = role.toString().toLowerCase().trim();

  switch (normalizedRole) {
    case 'admin':
      return '/admin/dashboard';
    case 'hr':
      return '/hr/dashboard';
    case 'manager':
      return '/manager/dashboard';
    case 'employee':
      return '/employee/dashboard';
    default:
      return '/unauthorized';
  }
};
