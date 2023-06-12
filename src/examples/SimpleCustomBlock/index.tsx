import { useMemo } from "react";
import {
  BeacasEditorProvider,
  EmailEditorProps,
  EmailTemplate,
} from "beacas-editor";
import {
  BeacasCore,
  BlockManager,
  ElementType,
  NodeUtils,
  t,
} from "beacas-core";
import {
  ConfigPanelsMap,
  IconFont,
  Retro,
  ThemeConfigProps,
} from "beacas-plugins";
import { createEditor } from "slate";
import "beacas-plugins/lib/style.css";
import "@arco-themes/react-beacas-theme-retro/css/arco.css";
import { EditorHeader } from "../../components/EditorHeader";
import { useUpload } from "../../hooks/useUpload";
import { Layout, Message } from "@arco-design/web-react";
import { CustomLogoPanel } from "./custom/Panel";
import data from "./template.json";
import React from "react";
import { SimpleCustomBlock } from "./custom";
import { CustomBlockType } from "../constant";

BeacasCore.auth({
  clientId: "clgnivsuj0018z9ltiixmxf6k",
}).then(() => {
  BlockManager.registerBlocks([SimpleCustomBlock]);
  ConfigPanelsMap[CustomBlockType.SIMPLE_CUSTOM_BLOCK] = CustomLogoPanel;
});

const categories: ThemeConfigProps["categories"] = [
  {
    get label() {
      return t("Content");
    },
    active: true,
    displayType: "grid",
    blocks: [
      {
        type: ElementType.STANDARD_PARAGRAPH,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-text"
          />
        ),
      },
      {
        type: ElementType.STANDARD_IMAGE,
        payload: {},
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-img"
          />
        ),
      },
      {
        type: ElementType.STANDARD_BUTTON,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-button"
          />
        ),
      },
      {
        type: ElementType.STANDARD_DIVIDER,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-divider"
          />
        ),
      },
      {
        type: ElementType.STANDARD_SPACER,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-spacing"
          />
        ),
      },
      {
        type: ElementType.STANDARD_NAVBAR,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-navbar"
          />
        ),
        payload: {
          children: [
            {
              data: {},
              type: "standard-navbar-link",
              children: [
                {
                  text: "Shop",
                },
              ],
              attributes: {
                href: "",
                "font-size": "20px",
              },
            },
            {
              data: {},
              type: "standard-navbar-link",
              children: [
                {
                  text: "About",
                },
              ],
              attributes: {
                href: "",
                "font-size": "20px",
              },
            },
            {
              data: {},
              type: "standard-navbar-link",
              children: [
                {
                  text: "Contact",
                },
              ],
              attributes: {
                href: "",
                "font-size": "20px",
              },
            },
            {
              data: {},
              type: "standard-navbar-link",
              children: [
                {
                  text: "Blog",
                },
              ],
              attributes: {
                href: "",
                "font-size": "20px",
              },
            },
          ],
        },
      },
      {
        type: ElementType.STANDARD_SOCIAL,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-social"
          />
        ),
      },
      {
        type: ElementType.STANDARD_HERO,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-hero"
          />
        ),
      },
      {
        type: ElementType.MARKETING_SHOPWINDOW,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-bag"
          />
        ),
      },
      {
        type: CustomBlockType.SIMPLE_CUSTOM_BLOCK,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-bag"
          />
        ),
      },
    ],
  },
  {
    get label() {
      return t("Layout");
    },
    active: true,
    displayType: "column",
    blocks: [
      {
        get title() {
          return t("1 column");
        },
        payload: [["100%"]],
      },
      {
        get title() {
          return t("2 column");
        },
        payload: [
          ["50%", "50%"],
          ["33%", "67%"],
          ["67%", "33%"],
          ["25%", "75%"],
          ["75%", "25%"],
        ],
      },
      {
        get title() {
          return t("3 column");
        },
        payload: [
          ["33.33%", "33.33%", "33.33%"],
          ["25%", "50%", "25%"],
          ["25%", "25%", "50%"],
          ["50%", "25%", "25%"],
        ],
      },
      {
        get title() {
          return t("4 column");
        },
        payload: [["25%", "25%", "25%", "25%"]],
      },
    ],
  },
];

export default function MyEditor() {
  const editor = createEditor();

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

  const quantityLimitCheck: EmailEditorProps["quantityLimitCheck"] = (
    params
  ) => {
    if (params.element.type === CustomBlockType.SIMPLE_CUSTOM_BLOCK) {
      const quantify = params.pageData.children.filter(
        (item) =>
          NodeUtils.isElement(item) &&
          item.type === CustomBlockType.SIMPLE_CUSTOM_BLOCK
      ).length;
      if (quantify >= 1) {
        Message.warning("Only one this block is allowed");
      }
      return false;
    }
    return true;
  };

  const config = Retro.useCreateConfig({
    onUpload,
    initialValues: initialValues,
    onSubmit: onSubmit,
    categories,
    quantityLimitCheck: quantityLimitCheck,
  });

  return (
    <BeacasEditorProvider {...config}>
      <EditorHeader />

      <Layout.Content>
        <Retro.Layout height={"calc(100vh - 66px)"}></Retro.Layout>
      </Layout.Content>
    </BeacasEditorProvider>
  );
}
