import { useMemo, useState } from "react";
import { BeacasEditorProvider, EmailTemplate } from "beacas-editor";
import { Retro } from "beacas-plugins";
import { get } from "lodash";
import "beacas-plugins/lib/style.css";
import "@arco-themes/react-beacas-theme-retro/css/arco.css";

import localsData from "beacas-localization/locales/locales.json";

console.log(localsData);

import data from "./template.json";
import { EditorHeader } from "../../components/EditorHeader";
import { useUpload } from "../../hooks/useUpload";
import { Layout, Select } from "@arco-design/web-react";
import React from "react";

export default function MyEditor() {
  const [lang, setLang] = useState<string>("en");

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

  const onSubmit = (values: EmailTemplate) => {
    console.log(values);
  };

  const config = Retro.useCreateConfig({
    onUpload,
    initialValues: initialValues,
    onSubmit: onSubmit,
    localeData: get(localsData, lang),
    clientId: "clgnivsuj0018z9ltiixmxf6k",
  });

  return (
    <BeacasEditorProvider {...config}>
      <EditorHeader
        extra={
          <Select
            value={lang}
            onChange={setLang}
            options={[
              {
                label: "English",
                value: "en",
              },
              {
                label: "中文简体",
                value: "zh-Hans",
              },
            ]}
          ></Select>
        }
      />

      <Layout.Content>
        <Retro.Layout key={lang} height={"calc(100vh - 66px)"}></Retro.Layout>
      </Layout.Content>
    </BeacasEditorProvider>
  );
}
