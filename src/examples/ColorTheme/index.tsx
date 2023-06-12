import { useMemo } from "react";
import { BeacasEditorProvider, EmailTemplate } from "beacas-editor";
import { BeacasCore } from "beacas-core";
import { Retro } from "beacas-plugins";
import { EditorHeader } from "../../components/EditorHeader";
import { useUpload } from "../../hooks/useUpload";
import { Layout, Select, Space } from "@arco-design/web-react";
import React from "react";
import "beacas-plugins/lib/style.css";
import data from "./template.json";

BeacasCore.auth({
  clientId: "clgnivsuj0018z9ltiixmxf6k",
});

import retroStyle from "@arco-themes/react-beacas-theme-retro/css/arco.css?inline";
import colorPurpleStyle from "@arco-themes/react-beacas-colors-purple/css/arco.css?inline";
import colorCyanStyle from "@arco-themes/react-beacas-colors-cyan/css/arco.css?inline";
import colorOrangeStyle from "@arco-themes/react-beacas-colors-organge/css/arco.css?inline";
import colorRedStyle from "@arco-themes/react-beacas-colors-red/css/arco.css?inline";

export default function MyEditor() {
  const [theme, setTheme] = React.useState<string>("purple");
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

  const matchThemeStyle = useMemo(() => {
    if (theme === "retro") {
      return retroStyle;
    }
    if (theme === "purple") {
      return colorPurpleStyle;
    }
    if (theme === "cyan") {
      return colorCyanStyle;
    }
    if (theme === "orange") {
      return colorOrangeStyle;
    }
    if (theme === "red") {
      return colorRedStyle;
    }
    return "";
  }, [theme]);

  const config = Retro.useCreateConfig({
    onUpload,
    initialValues: initialValues,
    onSubmit: onSubmit,
  });

  return (
    <BeacasEditorProvider {...config}>
      <EditorHeader
        extra={
          <Space>
            <Select
              value={theme}
              onChange={setTheme}
              options={[
                { label: "Retro", value: "retro" },
                { label: "Purple", value: "purple" },
                { label: "Cyan", value: "cyan" },
                { label: "Orange", value: "orange" },
                { label: "Red", value: "red" },
              ]}
            ></Select>
          </Space>
        }
      />

      <Layout.Content>
        <Retro.Layout height={"calc(100vh - 66px)"}></Retro.Layout>
      </Layout.Content>
      <style>{matchThemeStyle}</style>
    </BeacasEditorProvider>
  );
}
