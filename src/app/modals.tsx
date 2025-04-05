"use client"

import { usePathname } from "next/navigation"
import AccountModal from "./components/modals/AccountModal"
import { useSession } from "next-auth/react"

export default function Modals() {
    const pathname = usePathname()

    console.log("Modals pathname", pathname)

    const isAccountModal = pathname.includes("/account")

    const session = useSession()

    const { data: user } = session
    const { name, email, image, role } = user?.user || {}

    return (
        isAccountModal && 
        (<AccountModal
            name={name!}
            email={email!}
            role={role!}
            image={image!}
            />
        )
    )
}