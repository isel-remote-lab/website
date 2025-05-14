"use client";

import { useTempRole } from "~/contexts/TempRoleContext"
import { Role } from "~/types/role"
import { auth } from "~/server/auth"

export default async function IsAdminAndNotOwnProfile({ email }: { email: string }) {
  
}