import { Flex } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonInput from "antd/es/skeleton/Input";
import { avatarSize } from "../user/[id]/UserInfo";

export default function AccountInfoSkeleton() {
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
