import Image from "next/image"
import { auth } from "~/server/auth"

/**
 * User avatar component
 * @returns The user avatar component
 */
export default async function UserImage() {
    const session = await auth()
   
    if (!session?.user) return null
  
    return <Image src={session.user.image!} alt="User Avatar" width="0" height="0"/>
}