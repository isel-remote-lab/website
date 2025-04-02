'use client'

import { signOut } from "next-auth/react";

/**
 * Sign out button
 * @returns The sign out button component
 */
export default function SignOutButton() {
    return (
        <button onClick={() => signOut()}>
            Sair
        </button>
    );
}