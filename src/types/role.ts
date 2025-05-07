/**
 * The role of the user.
 */
export enum Role {
  STUDENT = "student",
  TEACHER = "teacher",
  ADMIN = "admin",
}

/**
 * The enum of the role letter.
 */
export enum RoleLetter {
  STUDENT = "S",
  TEACHER = "T",
  ADMIN = "A",
}

/**
 * Convert a role letter to a role.
 * @param roleLetter - The letter of the role.
 * @returns The role.
 */
export function roleLetterToRole(roleLetter: RoleLetter): Role {
  switch (roleLetter) {
    case RoleLetter.STUDENT:
      return Role.STUDENT;
    case RoleLetter.TEACHER:
      return Role.TEACHER;
    case RoleLetter.ADMIN:
      return Role.ADMIN;
  }
}
