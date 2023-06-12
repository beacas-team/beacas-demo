import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "@arco-design/web-react";
import { unstable_useBlocker as useBlocker } from "react-router-dom";
import { useEditorContext, useRefState } from "beacas-editor";

interface WarnAboutUnsavedChangesProps {
  dirty?: boolean;
  pageUnload?: boolean;
  onConfirmUnsaved?: () => void;
  onBeforeConfirm?: () => void;
}

export default function WarnAboutUnsavedChanges(
  props: WarnAboutUnsavedChangesProps
) {
  const { pageUnload = true, onBeforeConfirm } = props;
  const { dirty } = useEditorContext();

  const [visible, setVisible] = useState(false);

  const dirtyRef = useRefState(dirty);
  const blocker = useBlocker(!!dirty);

  const openConfirmModal = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (blocker.state === "blocked") {
      openConfirmModal();
    }
  }, [blocker, openConfirmModal]);

  useEffect(() => {
    if (pageUnload) {
      const onCheckUnsaved = (event: Event) => {
        if (dirty) {
          onBeforeConfirm?.();

          event.preventDefault();
          (event.returnValue as any) =
            "Changes that you made may not be saved.";
        }
      };

      window.addEventListener("beforeunload", onCheckUnsaved);

      return () => {
        window.removeEventListener("beforeunload", onCheckUnsaved);
      };
    }
  }, [dirty, pageUnload, onBeforeConfirm]);

  const onCancel = useCallback(() => {
    setVisible(false);
    blocker.reset?.();
  }, [blocker]);

  const onOk = useCallback(() => {
    dirtyRef.current = false;
    blocker.proceed?.();
    onBeforeConfirm?.();
  }, [blocker, dirtyRef, onBeforeConfirm]);

  return (
    <>
      <Modal
        title={"Discard changes?"}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        okText="Discard"
        cancelText="Cancel"
        style={{ zIndex: 10000 }}
      >
        <p>{"Are you sure you want to discard all unsaved changes?"}</p>
      </Modal>
    </>
  );
}
