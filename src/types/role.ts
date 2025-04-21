/**
 * The role of the user.
 */
export type Role = "student" | "teacher" | "admin";

/**
 * The letter of the role.
 */
export type RoleLetter = "S" | "T" | "A";

/**
 * Convert a role letter to a role.
 * @param roleLetter - The letter of the role.
 * @returns The role.
 */
export function roleLetterToRole(roleLetter: RoleLetter): Role {
  switch (roleLetter) {
    case "S":
      return "student";
    case "T":
      return "teacher";
    case "A":
      return "admin";
  }
}
