export const resolveUserRole = (user) => {
  if (!user) return "Guest";

  const role = user.role;

  if (role === "ADMIN" || role === "Admin") {
    return "Admin";
  } else if (role === "USER" || role === "User") {
    return "User";
  }

  return "User";
};

export const USER_ROLES = {
  ADMIN: "Admin",
  USER: "User",
  PREMIUM: "Premium",
};

export function getDisplayName(user) {
  if (!user) return "";
  return user.name || user.fullName || user.username || user.email || "User";
}
