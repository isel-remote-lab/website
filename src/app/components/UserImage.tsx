import Image from "next/image"
import { auth } from "~/server/auth"

/**
 * User avatar component
 * @returns The user avatar component
 */
export default async function UserImage() {
    const session = await auth()
    return <Image src={session!.user.image!} alt="User Avatar" width="0" height="0"/>
}