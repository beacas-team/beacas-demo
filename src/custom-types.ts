import { BasicElement } from "beacas-core";
import { BasicEmailTemplate } from "beacas-editor";
import { CustomBlockType } from "./examples/constant";
import { PluginsCustomEditorTypes } from "beacas-plugins";

type CustomType = typeof CustomBlockType;

interface CustomEmailTemplate extends BasicEmailTemplate {
  subject: string;
}

export interface SimpleCustomElement extends BasicElement {
  type: CustomType["SIMPLE_CUSTOM_BLOCK"];
  data: {
    buttonText: string;
  };
  attributes: {
    src: string;
    "button-color"?: string;
  };
}

export interface DynamicCustomElement extends BasicElement {
  type: CustomType["DYNAMIC_CUSTOM_BLOCK"];
  data: {
    buttonText: string;
    quantity: number;
    type: "products" | "collections";
    productIds: string[];
    collectionIds: string[];
    showComparePrice: boolean;
  };
  attributes: {
    "background-color": string;
    "button-color": string;
    "button-text-color": string;
    "product-name-color": string;
    "product-price-color": string;
    "product-compare-price-color": string;
    "image-border-radius"?: string;
    "image-width"?: string;
    "image-vertical-align"?: string;
    "image-border"?: string;
    border?: string;
    "padding-top"?: string;
    "padding-bottom"?: string;
    "padding-left"?: string;
    "padding-right"?: string;
    "heading-padding"?: string;
  };
}

declare module "beacas-core" {
  export interface CustomTypes {
    Element: SimpleCustomElement | DynamicCustomElement;
  }
}

declare module "beacas-editor" {
  export interface CustomEditorTypes {
    EmailTemplate: CustomEmailTemplate;
    EmailEditorProps: PluginsCustomEditorTypes["EmailEditorProps"];
  }
}
