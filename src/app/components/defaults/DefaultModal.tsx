"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";

interface DefaultModelProps {
  title?: string | null;
  children?: React.ReactNode | null;
}

const modalOptions = {
  footer: null,
  width: 400,
  centered: true,
};

/**
 * Default modal component
 * @param {DefaultModelProps} props - The default modal props
 * @param {React.ReactNode} [props.children] - The modal content
 * @returns The default modal component
 */
export default function DefaultModal({
  title = null,
  children = null,
}: DefaultModelProps) {
  const router = useRouter();

  function handleCancel() {
    router.back();
  }

  return (
    <Modal
      title={title}
      open={true}
      onCancel={() => handleCancel()}
      onClose={() => handleCancel()}
      {...modalOptions}
    >
      {children}
    </Modal>
  );
}
