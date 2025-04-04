import ProfilePage from "~/app/components/pages/ProfilePage";
import { auth } from "~/server/auth";

/**
 * Account page component
 * @returns {JSX.Element | null} - The account page component
 */
export default async function AccountPage() {
    const session = await auth();
    const { name, email, role, image} = session!.user;
    
    if (!name || !email) return null;

    return ProfilePage({ name, email, role, image });
}
