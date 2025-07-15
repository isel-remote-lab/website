"use client";

import { useRouter } from "next/navigation";
import { DraggableModal, DraggableModalProvider, type DraggableModalProps } from "@cubetiq/antd-modal";
import "@cubetiq/antd-modal/dist/index.css";

interface DefaultModelProps {
  title?: string | null;
  children?: React.ReactNode | null;
  modalInitialSize?: DraggableModalProps;
}

const defaultModalOptions = {
  footer: null,
};

const defaultInitialSize = {
  initialWidth: 400,
  initialHeight: 425,
};

/**
 * Default modal component using DraggableModal
 * @param {DefaultModelProps} props - The default modal props
 * @param {React.ReactNode} [props.children] - The modal content
 * @returns The default modal component
 */
export default function DefaultModal({
  title = null,
  children = null,
  modalInitialSize = defaultInitialSize,
}: DefaultModelProps) {
  const router = useRouter();

  function handleCancel() { 
    try {
      router.back()
    } catch {
      router.push("/")
    }
  }

  return (
    <DraggableModalProvider>
        <DraggableModal
          title={title}
          open
          onCancel={handleCancel}
          {...defaultModalOptions}
          {...modalInitialSize}
        >
          {children}
        </DraggableModal>
    </DraggableModalProvider>
  );
}
