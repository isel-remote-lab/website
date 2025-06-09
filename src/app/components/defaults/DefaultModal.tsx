"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";

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
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null!);

  function handleCancel() {
    router.back();
  }

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      title={
        <div
          style={{ width: "100%", cursor: "move" }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
        >
          {title}
        </div>
      }
      open
      onCancel={() => handleCancel()}
      onClose={() => handleCancel()}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      {...modalOptions}
    >
      {children}
    </Modal>
  );
}
