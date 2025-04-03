import { auth } from "~/server/auth";
import { Avatar, Card, Flex, Image } from "antd";
import Title from "antd/es/typography/Title";

/**
 * Account page component
 * @returns {JSX.Element | null} - The account page component
 */
export default async function Account() {
    const session = await auth();

    if (!session?.user) return null;

    const { name, email, image} = session.user;
    
    if (!name || !email) return null;

    const avatarSize = 250;

    return (
    <Flex wrap gap="large" align="center">
      <Avatar size={avatarSize}>
        <Image
          src={image ?? undefined}
          alt="User Avatar"
          width={avatarSize}
          height={avatarSize}
        />
      </Avatar>
      <Card>
        <Title level={3} style={{ margin: 0 }}>
          {name}
        </Title>
        <Title level={4}>{email}</Title>
      </Card>
    </Flex>
    );
}
