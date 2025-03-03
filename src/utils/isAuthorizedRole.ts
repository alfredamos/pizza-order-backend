const authorizedRoles = ['Admin', 'User', 'Staff'];

export const isAuthorizedRole = (role: string) => authorizedRoles.includes(role);
