import { auth } from "./auth";

interface changeRoleProps {
  newRole: string
}

/**
 * Function to change the role of a user
 * @param {string} newRole - The new role to be assigned to the user
 * @returns {Promise<void | null>} - Returns null if the session is not available
 */
export default async function changeRole(newRole: string) {
    const session = await auth()
    
    if (!session?.user) return null
                
    session.user.role = newRole
}