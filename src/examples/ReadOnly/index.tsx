import { useMemo } from "react";
import {
  BeacasEditorProvider,
  EmailTemplate,
  useEditorContext,
  useEditorProps,
} from "beacas-editor";
import { BeacasCore, NodeUtils, t } from "beacas-core";
import {
  AttributeField,
  IconFont,
  PluginsProvider,
  Retro,
  SharedComponents,
} from "beacas-plugins";
import "beacas-plugins/lib/style.css";
import "@arco-themes/react-beacas-theme-retro/css/arco.css";

BeacasCore.auth({
  clientId: "clgnivsuj0018z9ltiixmxf6k",
});

import data from "./template.json";
import { EditorHeader } from "../../components/EditorHeader";
import { useUpload } from "../../hooks/useUpload";
import { Button, Grid, Layout } from "@arco-design/web-react";
import React from "react";
import { Space } from "@arco-design/web-react";
import { Card } from "@arco-design/web-react";
import { Path } from "slate";
import { useSlate } from "slate-react";
import { Editor } from "slate";

export default function MyEditor() {
  const { upload } = useUpload();

  const initialValues: EmailTemplate | null = useMemo(() => {
    return {
      subject: data.subject,
      content: data.content as any as EmailTemplate["content"],
    };
  }, []);

  const onUpload = (file: Blob): Promise<string> => {
    return upload(file);
  };

  const onSubmit = async (values: EmailTemplate) => {
    console.log(values);
  };

  const config = Retro.useCreateConfig({
    onUpload,
    initialValues: initialValues,
    onSubmit: onSubmit,
    showSourceCode: true,
    readOnly: true,
  });

  return (
    <BeacasEditorProvider {...config}>
      <EditorHeader />
      <Layout.Content>
        <PluginsProvider>
          <Grid.Row>
            <Grid.Col span={8}>
              <ConfigurationCard />
            </Grid.Col>
            <Grid.Col span={16}>
              <PreviewEmailContainer />
            </Grid.Col>
          </Grid.Row>
        </PluginsProvider>
      </Layout.Content>
    </BeacasEditorProvider>
  );
}

const pagePath = [0];

const ConfigurationCard = () => {
  const { values } = useEditorContext();
  const editor = useSlate();

  const footerContentElementIndex = values.content.children.findIndex(
    (child) => {
      if (!NodeUtils.isElement(child)) return false;
      return child.title === "Footer content";
    }
  );

  const [navigationEntry] = Editor.nodes(editor, {
    match(node, path) {
      if (!NodeUtils.isElement(node)) return false;
      return node.title === "Navigation bar";
    },
    at: pagePath,
    mode: "all",
  });

  return (
    <Card
      style={{ height: "calc(100vh - 66px)" }}
      title="Configuration"
      headerStyle={{ height: 60 }}
    >
      <SharedComponents.FullHeightOverlayScrollbars
        height={"calc(100vh - 160px)"}
      >
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <Card title="Colors">
            <AttributeField.ColorPickerField
              label={"Background color"}
              name={`attributes.background-color`}
              path={pagePath}
            />
            <AttributeField.ColorPickerField
              label={"Content background color"}
              name={`attributes.content-background-color`}
              path={pagePath}
            />
          </Card>
          <Card title="Footer Content">
            <div style={{ height: 250 }}>
              {footerContentElementIndex > -1 && (
                <AttributeField.RichTextField
                  formItem={{
                    layout: "vertical",
                  }}
                  label={null}
                  name={""}
                  pageElement={values.content}
                  path={[...pagePath, footerContentElementIndex]}
                />
              )}
            </div>
          </Card>

          {navigationEntry && (
            <AttributeField.EditPanelListField
              path={navigationEntry[1]}
              headerKey="Navigation"
              header={t("Navbar menus")}
              tabPosition="top"
              name={`children`}
              label=""
              displayType="Card"
              renderItem={(item, childIndex) => (
                <NavbarLink
                  key={childIndex}
                  index={childIndex}
                  path={[...navigationEntry[1], childIndex]}
                />
              )}
              renderHeader={(item: any, index) => item.content || "Custom"}
            />
          )}
        </Space>
      </SharedComponents.FullHeightOverlayScrollbars>
    </Card>
  );
};

function NavbarLink({ index, path }: { index: number; path: Path }) {
  return (
    <div className="NavbarLink">
      <div style={{ marginTop: 10 }} />
      <AttributeField.TextField
        path={[...path, 0]}
        label={t("Text")}
        name={`text`}
      />
      <AttributeField.Link
        label={t("Link address")}
        required
        path={path}
        name={`attributes.href`}
      />
    </div>
  );
}

const PreviewEmailContainer = () => {
  const { universalElementSetting } = useEditorProps();
  const { values, mergetagsData } = useEditorContext();
  const [isDesktop, setIsDesktop] = React.useState(true);
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          height: 60,
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button.Group>
          <Button
            style={{ paddingLeft: "2vw", paddingRight: "2vw" }}
            type={isDesktop ? "outline" : "secondary"}
            onClick={() => setIsDesktop(true)}
          >
            <Space>
              <IconFont iconName="icon-desktop" /> {t("desktop")}
            </Space>
          </Button>
          <Button
            style={{ paddingLeft: "2vw", paddingRight: "2vw" }}
            type={!isDesktop ? "outline" : "secondary"}
            onClick={() => setIsDesktop(false)}
          >
            <Space>
              <IconFont iconName="icon-mobile" /> {t("mobile")}
            </Space>
          </Button>
        </Button.Group>
      </div>
      <div style={{ height: "calc(100vh - 126px)" }}>
        <SharedComponents.PreviewEmail
          isDesktop={isDesktop}
          universalElementSetting={universalElementSetting}
          values={values}
          mergetagsData={mergetagsData}
        />
      </div>
    </div>
  );
};
