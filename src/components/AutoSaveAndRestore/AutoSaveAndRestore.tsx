import React, { useEffect, useRef, useState } from "react";
import { useInterval, useLocalStorage } from "react-use";
import { Modal } from "@arco-design/web-react";

import {
  EmailEditorProps,
  useEditorContext,
  useEventCallback,
} from "beacas-editor";
import { isEqual } from "lodash";
import WarnAboutUnsavedChanges from "../WarnAboutUnsavedChanges";
import { useEditorForm } from "beacas-plugins";

function AutoSaveAndRestore({ name }: { name: string }) {
  const { dirty, initialValues, values, inited } = useEditorContext();
  const [isStale, setIsStale] = useState<boolean>(false);
  const { reset } = useEditorForm();
  const [cacheValues, setCacheValues] = useLocalStorage<
    EmailEditorProps["initialValues"] | null
  >(name, null);
  const cacheValuesRef = useRef<any>(cacheValues);
  const lastCacheEmailRef = useRef<any>(null);

  const [visible, setVisible] = useState(Boolean(cacheValues));

  useEffect(() => {
    if (!inited) return;
    // only check staleness onMount
    if (!isEqual(cacheValuesRef.current, initialValues)) {
      setIsStale(true);
    }
  }, [cacheValues, inited, initialValues]);

  useEffect(() => {
    if (dirty) {
      setCacheValues(values);
    }
  }, [dirty, values, setCacheValues]);

  useInterval(() => {
    if (dirty) {
      if (isEqual(values, lastCacheEmailRef.current)) return;
      lastCacheEmailRef.current = values;
      setCacheValues(values);
    }
  }, 5000);

  const onRecover = () => {
    if (cacheValues) {
      reset(cacheValues);
      setCacheValues(null);
      setVisible(false);
    }
  };

  const onDiscard = () => {
    setCacheValues(null);
    setVisible(false);
  };

  const onConfirmUnsaved = useEventCallback(() => {
    setCacheValues(null);
  });

  return (
    <>
      <Modal
        title={"Recovering unsaved local changes"}
        visible={Boolean(visible && isStale)}
        onOk={onRecover}
        okText="Recover"
        cancelText="Discard"
        onCancel={onDiscard}
        style={{ zIndex: 10000 }}
      >
        <p>{`Do you want to recover unsaved local changes?`}</p>
      </Modal>
      <WarnAboutUnsavedChanges onBeforeConfirm={onConfirmUnsaved} />
    </>
  );
}

export default AutoSaveAndRestore;
