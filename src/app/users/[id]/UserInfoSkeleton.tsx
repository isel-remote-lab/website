import { Flex } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonInput from "antd/es/skeleton/Input";
import { avatarSize } from "./UserInfo";

export default function UserInfoSkeleton() {
  return (
    <Flex vertical gap="large" align="center">
      <SkeletonAvatar size={avatarSize} />
      <SkeletonInput size={"large"} active />
      <SkeletonInput size={"small"} active />
      <SkeletonInput active />
      <SkeletonInput size={"small"} active />
    </Flex>
  );
}
