import React from "react";
import Logo from "./logo.svg";
import { Card, PageHeader } from "@arco-design/web-react";
import { Layout } from "@arco-design/web-react";
import "@arco-themes/react-beacas-theme-retro/css/arco.css";
import { Space } from "@arco-design/web-react";

import template1 from "./templates/template1.json";
import template2 from "./templates/template2.json";
import template3 from "./templates/template3.json";
import template4 from "./templates/template4.json";
import template5 from "./templates/template5.json";
import template6 from "./templates/template6.json";
import template7 from "./templates/template7.json";
import template8 from "./templates/template8.json";
import { EmailItem } from "./EmailItem";
import { Grid } from "@arco-design/web-react";

import SimpleImg from "./images/simple.png";
import ColorThemeImg from "./images/color-theme.png";
import LocalizationImg from "./images/localization.png";
import DynamicDataImg from "./images/dynamic-data.png";
import ResponsiveViewImg from "./images/responsive.png";
import DynamicCustomBlock from "./images/dynamic-block.png";
import frozenImg from "./images/frozen.png";
import readonlyImg from "./images/readonly.png";

const features = [
  {
    subject: "Simple",
    thumbnail: SimpleImg,
    url: "/simple",
  },
  {
    subject: "ReadOnly Mode",
    thumbnail: readonlyImg,
    url: "/read-only",
  },
  {
    subject: "Color theme",
    thumbnail: ColorThemeImg,
    url: "/color-theme",
  },
  {
    subject: "Localization",
    thumbnail: LocalizationImg,
    url: "/localization",
  },
  {
    subject: "Dynamic data",
    thumbnail: DynamicDataImg,
    url: "/dynamic-data",
  },
  {
    subject: "Responsive view",
    thumbnail: ResponsiveViewImg,
    url: "/responsive-view",
  },
  {
    subject: "Dynamic custom block",
    thumbnail: DynamicCustomBlock,
    url: "/dynamic-custom-block",
  },
  {
    subject: "Frozen Header and Footer",
    thumbnail: frozenImg,
    url: "/dynamic-custom-block",
  },
];

export const list = [
  template1,
  template2,
  template3,
  template4,
  template5,
  template6,
  template7,
  template8,
].map((item) => {
  return {
    id: item.id,
    subject: item.subject,
    thumbnail: item.thumbnail,
    content: item.content,
    url: "/template?id=" + item.id,
  };
});

export const Home = () => {
  const LogoCom = Logo as any;
  return (
    <div>
      <PageHeader
        style={{ backgroundColor: "#fff", padding: 0 }}
        title={
          <div style={{ paddingLeft: 20 }}>
            <LogoCom style={{ width: 190 }} />
          </div>
        }
      />
      <Layout.Content style={{ padding: 20 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card style={{ backgroundColor: "#fff" }} title="Templates">
            <Grid.Row>
              {list.map((item, index) => {
                return (
                  <Grid.Col xs={1} sm={1} md={4} lg={6}>
                    <EmailItem item={item} />
                  </Grid.Col>
                );
              })}
            </Grid.Row>
          </Card>

          <Card style={{ backgroundColor: "#fff" }} title="Features">
            <Grid.Row>
              {features.map((item, index) => {
                return (
                  <Grid.Col xs={1} sm={1} md={4} lg={6}>
                    <EmailItem item={item} />
                  </Grid.Col>
                );
              })}
            </Grid.Row>
          </Card>
        </Space>
      </Layout.Content>
    </div>
  );
};
