import {
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Message,
  Modal,
  PageHeader,
  Space,
  Typography,
} from "@arco-design/web-react";
import { IconGithub, IconMenu, IconUser } from "@arco-design/web-react/icon";
import React from "react";
import { EmailTemplate, useEditorContext, useEditorProps } from "beacas-editor";
import { mjmlToJson, useEditorForm } from "beacas-plugins";
import { BeacasCore } from "beacas-core";
import { navigation } from "../main";
import AutoSaveAndRestore from "./AutoSaveAndRestore/AutoSaveAndRestore";
import mjml from "mjml-browser";
import { saveAs } from "file-saver";
import { Uploader } from "@/utils/Uploader";

export const EditorHeader = (props: { extra?: React.ReactNode }) => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [text, setText] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const { values, submit, setValues, mergetagsData } = useEditorContext();
  const { reset } = useEditorForm();

  const onChange = (text: string) => {
    setValues((old) => {
      return {
        ...old,
        subject: text,
      };
    });
  };

  const { universalElementSetting } = useEditorProps();

  const onExportImage = async () => {
    Message.loading("Loading...");
    const html2canvas = (await import("html2canvas")).default;
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    const mjmlStr = BeacasCore.toMJML({
      element: values.content,
      mode: "production",
      universalElements: universalElementSetting?.elements as any,
    });

    const html = BeacasCore.renderWithData(mjml(mjmlStr).html, mergetagsData);

    container.innerHTML = html;
    document.body.appendChild(container);

    const blob = await new Promise<any>((resolve) => {
      html2canvas(container, { useCORS: true }).then((canvas) => {
        return canvas.toBlob(resolve, "png", 0.1);
      });
    });
    saveAs(blob, "demo.png");
    Message.clear();
  };

  const onExportJSON = () => {
    saveAs(
      new Blob([JSON.stringify(values, null, 2)], { type: "application/json" }),
      "beacas.json"
    );
  };

  const onExportMJML = () => {
    const mjmlStr = BeacasCore.toMJML({
      element: values.content,
      mode: "production",
      universalElements: universalElementSetting?.elements as any,
    });

    navigator.clipboard.writeText(mjmlStr);
    saveAs(new Blob([mjmlStr], { type: "text/mjml" }), "beacas.mjml");
  };

  const onExportHTML = () => {
    const mjmlStr = BeacasCore.toMJML({
      element: values.content,
      mode: "production",
      universalElements: universalElementSetting?.elements as any,
    });

    const html = mjml(mjmlStr).html;
    navigator.clipboard.writeText(html);
    saveAs(new Blob([html], { type: "text/html" }), "beacas.html");
  };

  const onImportMJML = async () => {
    const uploader = new Uploader(() => Promise.resolve(""), {
      accept: "text/mjml",
      limit: 1,
    });

    const [file] = await uploader.chooseFile();
    const reader = new FileReader();
    const pageData = await new Promise<[string, EmailTemplate["content"]]>(
      (resolve, reject) => {
        reader.onload = function (evt) {
          if (!evt.target) {
            reject();
            return;
          }
          try {
            const pageData = mjmlToJson(evt.target.result as any);
            resolve([file.name, pageData]);
          } catch (error) {
            reject();
          }
        };
        reader.readAsText(file);
      }
    );

    reset({
      subject: pageData[0],
      content: pageData[1],
    });
  };

  const onImportJSON = async () => {
    const uploader = new Uploader(() => Promise.resolve(""), {
      accept: "application/json",
      limit: 1,
    });

    const [file] = await uploader.chooseFile();
    const reader = new FileReader();
    const emailTemplate = await new Promise<EmailTemplate>(
      (resolve, reject) => {
        reader.onload = function (evt) {
          if (!evt.target) {
            reject();
            return;
          }
          try {
            const template = JSON.parse(
              evt.target.result as any
            ) as EmailTemplate;
            resolve(template);
          } catch (error) {
            reject();
          }
        };
        reader.readAsText(file);
      }
    );

    reset({
      subject: emailTemplate.subject,
      content: emailTemplate.content,
    });
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <PageHeader
          backIcon={<IconMenu />}
          onBack={() => setCollapsed(!collapsed)}
          className="editor-header"
          title={<span style={{ color: "var(--color-white)" }}>Beacas</span>}
          style={{
            backgroundColor: "rgb(var(--primary-6))",
            color: "#fff !important",
          }}
          subTitle={
            <div
              style={{
                height: 40,
                position: "absolute",
                minWidth: 300,
                top: 18,
              }}
            >
              <Typography.Title
                heading={5}
                style={{
                  margin: 0,
                  color: "var(--color-white)",
                }}
                editable={{
                  onChange: onChange,
                }}
              >
                {values.subject}
              </Typography.Title>
            </div>
          }
          extra={
            <div>
              <Space>
                {props?.extra}

                <Dropdown
                  droplist={
                    <Menu>
                      <Menu.Item key="MJML" onClick={onImportMJML}>
                        Import from MJML
                      </Menu.Item>

                      <Menu.Item key="JSON" onClick={onImportJSON}>
                        Import from JSON
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    <strong>Import</strong>
                  </Button>
                </Dropdown>

                <Dropdown
                  droplist={
                    <Menu>
                      <Menu.Item key="Export MJML" onClick={onExportMJML}>
                        Export MJML
                      </Menu.Item>
                      <Menu.Item key="Export HTML" onClick={onExportHTML}>
                        Export HTML
                      </Menu.Item>
                      <Menu.Item key="Export JSON" onClick={onExportJSON}>
                        Export JSON
                      </Menu.Item>
                      <Menu.Item key="Export Image" onClick={onExportImage}>
                        Export Image
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    <strong>Export</strong>
                  </Button>
                </Dropdown>
                <Button
                  href="https://docs.beacas.com/docs/intro?utm_source=demo"
                  target="_blank"
                >
                  <strong>Docs</strong>
                </Button>
                <Button
                  href="https://admin.beacas.com?utm_source=demo"
                  icon={<IconUser />}
                >
                  Login
                </Button>
                <Button
                  target="_blank"
                  style={{ color: "#fff", fontSize: 24 }}
                  type="outline"
                  href="https://github.com/beacas-team/beacas-demo"
                  icon={<IconGithub />}
                />
                <div />
              </Space>
            </div>
          }
        />
        <Layout.Sider
          theme="dark"
          onCollapse={setCollapsed}
          collapsed={collapsed}
          width={250}
          collapsible
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            height: "100vh",
            zIndex: 100,
            maxWidth: collapsed ? 0 : 250,
          }}
        >
          <Menu theme="dark">
            {navigation.map((item, index) => {
              return (
                <Menu.Item key={index.toString()}>
                  <a href={item.path} style={{ display: "block" }}>
                    {item.name}
                  </a>
                </Menu.Item>
              );
            })}
          </Menu>
        </Layout.Sider>
      </div>

      <style>{`
      .editor-header .arco-page-header-back { color: var(--color-white); }
      .editor-header .arco-page-header-back:hover:before { background-color: transparent !important; }
      .editor-header .arco-typography-operation-edit { color: var(--color-white); }
      .editor-header .arco-typography-operation-edit { color: var(--color-white);background-color: transparent; }
      `}</style>

      <Modal
        visible={visible}
        title="Import"
        onCancel={() => setVisible(false)}
      >
        <Input.TextArea value={text} onChange={setText} rows={10} />
      </Modal>
      <AutoSaveAndRestore name="temp" />
    </>
  );
};
