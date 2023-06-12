import { useMemo } from "react";
import { BeacasEditorProvider, EmailTemplate } from "beacas-editor";
import { BeacasCore } from "beacas-core";
import { Retro } from "beacas-plugins";
import "beacas-plugins/lib/style.css";
import "@arco-themes/react-beacas-theme-retro/css/arco.css";

BeacasCore.auth({
  clientId: "clgnivsuj0018z9ltiixmxf6k",
});

import data from "./template.json";
import { EditorHeader } from "../../components/EditorHeader";
import { useUpload } from "../../hooks/useUpload";
import { Layout } from "@arco-design/web-react";
import React from "react";

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

const mergetagsData = {
  order: {
    number: "Shopify#1001",
    total: "$100.00",
  },
  customer: {
    name: "Ryan",
    email: "beacas@example.com",
  },
  products: [
    {
      title: "#product 1",
      image:
        "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815715/nqqreectuzi3lxv7dxsp.png",
    },
    {
      title: "#product 2",
      image:
        "http://res.cloudinary.com/dwkp0e1yo/image/upload/v1683815875/mevpkdxft8z6cyjicnd6.png",
    },
  ],
};

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

  const onSubmit = (values: EmailTemplate) => {
    console.log(values);
  };

  const config = Retro.useCreateConfig({
    onUpload,
    initialValues: initialValues,
    onSubmit: onSubmit,
    mergetagsData: mergetagsData,
    mergetags: mergetags,
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
