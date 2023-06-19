import { useMemo } from "react";
import { BeacasEditorProvider, EmailTemplate } from "beacas-editor";
import { Minimalist } from "beacas-plugins";
import "beacas-plugins/lib/style.css";
import "@arco-themes/react-beacas-theme-retro/css/arco.css";
import data from "./template.json";
import { EditorHeader } from "../../components/EditorHeader";
import { useUpload } from "../../hooks/useUpload";
import { Layout } from "@arco-design/web-react";
import React from "react";

export default function MyEditor() {
  const { upload } = useUpload();

  const initialValues: EmailTemplate | null = useMemo(() => {
    return {
      subject: data.subject,
      content: data.content as EmailTemplate["content"],
    };
  }, []);

  const onUpload = (file: Blob): Promise<string> => {
    return upload(file);
  };

  const onSubmit = async (values: EmailTemplate) => {
    console.log(values);
  };

  const config = Minimalist.useCreateConfig({
    onUpload,
    initialValues: initialValues,
    onSubmit: onSubmit,
    showSourceCode: true,
    clientId: "clgnivsuj0018z9ltiixmxf6k",
  });

  return (
    <BeacasEditorProvider {...config}>
      <EditorHeader />

      <Layout.Content>
        <Minimalist.Layout height={"calc(100vh - 66px)"}></Minimalist.Layout>
      </Layout.Content>
    </BeacasEditorProvider>
  );
}
