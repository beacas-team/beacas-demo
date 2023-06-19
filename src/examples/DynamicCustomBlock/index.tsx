import { useEffect, useMemo, useState } from "react";
import {
  BeacasEditorProvider,
  EmailTemplate,
  useEditorContext,
} from "beacas-editor";
import { BlockManager, ElementType, NodeUtils, t } from "beacas-core";
import {
  ConfigPanelsMap,
  IconFont,
  Retro,
  ThemeConfigProps,
} from "beacas-plugins";

import "beacas-plugins/lib/style.css";
import "@arco-themes/react-beacas-theme-retro/css/arco.css";
import { EditorHeader } from "../../components/EditorHeader";
import { useUpload } from "../../hooks/useUpload";
import { Layout } from "@arco-design/web-react";
import { Panel } from "./custom/Panel";
import data from "./template.json";
import React from "react";
import { CustomBlockType } from "../constant";
import { DynamicCustomBlock, ProductItem } from "./custom";
import { DynamicCustomElement } from "@/custom-types";
import { fetchProducts } from "./mergetagData";

BlockManager.registerBlocks([DynamicCustomBlock]);
ConfigPanelsMap[CustomBlockType.DYNAMIC_CUSTOM_BLOCK] = Panel;

const mergetags = [
  {
    label: "Order",
    value: "",
    children: [
      {
        label: "Order number",
        value: "order.number",
      },
      {
        label: "Order total",
        value: "order.total",
      },
    ],
  },
  {
    label: "Customer",
    value: "",
    children: [
      {
        label: "Customer name",
        value: "customer.name",
      },
      {
        label: "Customer email",
        value: "customer.email",
      },
    ],
  },
];

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
        payload: {
          data: {},
          type: "standard-social",
          children: [
            {
              data: {},
              type: "standard-social-element",
              children: [{ text: "" }],
              attributes: {
                src: "https://res.cloudinary.com/dfite2e16/image/upload/v1681908489/clgnivsuj0018z9ltiixmxf6k/xkd0kfnytbfywsofk8t6.png",
                href: "",
              },
            },
            {
              data: {},
              type: "standard-social-element",
              children: [{ text: "" }],
              attributes: {
                src: "https://res.cloudinary.com/dfite2e16/image/upload/v1681908521/clgnivsuj0018z9ltiixmxf6k/ulyduaza1votoacctoi3.png",
                href: "",
              },
            },
            {
              data: {},
              type: "standard-social-element",
              children: [{ text: "" }],
              attributes: {
                src: "https://res.cloudinary.com/dfite2e16/image/upload/v1681908543/clgnivsuj0018z9ltiixmxf6k/wtefhsfwaapcdbz7knqw.png",
                href: "",
              },
            },
          ],
          attributes: { "icon-size": "30px" },
        },
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
        type: CustomBlockType.DYNAMIC_CUSTOM_BLOCK,
        icon: (
          <IconFont
            className={"block-list-grid-item-icon"}
            iconName="icon-number"
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

interface DynamicServerData {
  order: {
    number: string;
    total: string;
  };
  customer: {
    name: string;
    email: string;
  };
  products: ProductItem[];
}

export default function MyEditor() {
  const [mergetagsData, setMergetagsData] = useState<DynamicServerData>({
    order: {
      number: "Shopify#1001",
      total: "$100.00",
    },
    customer: {
      name: "Ryan",
      email: "beacas@example.com",
    },
    products: [],
  });

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
  console.log("mergetagsData", mergetagsData);

  const config = Retro.useCreateConfig({
    onUpload,
    initialValues: initialValues,
    onSubmit: onSubmit,
    mergetagsData: mergetagsData,
    mergetags,
    categories,
    clientId: "clgnivsuj0018z9ltiixmxf6k",
  });

  return (
    <BeacasEditorProvider {...config}>
      <DataFetcher setMergetagsData={setMergetagsData} />
      <EditorHeader />

      <Layout.Content>
        <Retro.Layout height={"calc(100vh - 66px)"}></Retro.Layout>
      </Layout.Content>
    </BeacasEditorProvider>
  );
}

const DataFetcher = ({
  setMergetagsData,
}: {
  setMergetagsData: React.Dispatch<React.SetStateAction<DynamicServerData>>;
}) => {
  const { values } = useEditorContext();

  const dynamicCustomBlock = values.content.children.find((item) => {
    if (!NodeUtils.isElement(item)) return false;
    return item.type === CustomBlockType.DYNAMIC_CUSTOM_BLOCK;
  }) as DynamicCustomElement | undefined;

  const selectedIds = dynamicCustomBlock?.data.productIds;

  useEffect(() => {
    if (!selectedIds?.length) return;

    fetchProducts({ productIds: selectedIds }).then((list) => {
      setMergetagsData((old) => {
        return {
          ...old,
          products: list,
        };
      });
    });
  }, [selectedIds, setMergetagsData]);

  return <></>;
};
