import { CustomBlockType } from "@/examples/constant";
import {
  createCustomBlock,
  t,
  components,
  mergeBlock,
  TextElement,
  ElementType,
} from "beacas-core";
import { ElementCategory } from "beacas-core";
import { get } from "lodash";
import * as React from "react";
import { DynamicCustomElement } from "src/custom-types";

const {
  Wrapper,
  Button,
  Section,
  Column,
  Image,
  ForEach,
  Show,
  Text,
  Group,
  ContentEditableBlock,
} = components;

export interface ProductItem {
  id: string;
  title: string;
  image: string;
  comparePrice: string;
  price: string;
}

const defaultData: Pick<DynamicCustomElement, "attributes" | "data"> = {
  attributes: {
    "background-color": "#ffffff",
    "button-text-color": "#ffffff",
    "button-color": "#000000",
    "product-name-color": "#000000",
    "product-price-color": "#000000",
    "product-compare-price-color": "#737373",
    "image-border-radius": "5px",
    "image-width": "150px",
    "padding-top": "20px",
    "padding-bottom": "20px",
    "padding-left": "10px",
    "padding-right": "10px",
    "heading-padding": "10px 25px 10px 25px",
  },
  data: {
    buttonText: "Buy now",
    quantity: 6,
    type: "products",
    productIds: [],
    collectionIds: [],
    showComparePrice: true,
  },
};

export const DynamicCustomBlock = createCustomBlock<DynamicCustomElement>({
  get name() {
    return t("Dynamic Block");
  },
  defaultData: defaultData,
  type: CustomBlockType.DYNAMIC_CUSTOM_BLOCK,
  void: true,
  create: (payload) => {
    const data: DynamicCustomElement = {
      type: CustomBlockType.DYNAMIC_CUSTOM_BLOCK,
      data: {
        ...defaultData.data,
      },
      attributes: {
        ...defaultData.attributes,
      },
      children: [
        {
          type: ElementType.STANDARD_H3,
          data: {},
          attributes: {
            align: "center",
          },
          children: [{ text: "You might also like" }],
        },
      ],
    };
    return mergeBlock(data, payload);
  },
  category: ElementCategory.WRAPPER,
  render(params) {
    const { node, mergetagsData, mode } = params;

    const dataSourceKey = "products";

    const products = get(
      mergetagsData,
      dataSourceKey,
      []
    ) as Array<ProductItem>;
    const { attributes, data } = node;
    const RenderList = ({ item }: { item: ProductItem }) => {
      return (
        <Column width="50%">
          <Image
            border-radius={attributes["image-border-radius"]}
            padding="10px"
            src={item.image}
          />
          <Text
            align="center"
            padding="10px 0px 0px 0px"
            color={attributes["product-name-color"]}
          >
            {item.title}
          </Text>
          <Text
            align="center"
            padding="10px 0px 0px 0px"
            color={attributes["product-price-color"]}
          >
            {item.price}
          </Text>
          <Text
            align="center"
            text-decoration="line-through"
            color={attributes["product-compare-price-color"]}
            padding="10px 0px 0px 0px"
          >
            {item.comparePrice}
          </Text>
          <Button
            href="#"
            background-color={attributes["button-color"]}
            color={attributes["button-text-color"]}
          >
            Buy now
          </Button>
        </Column>
      );
    };
    return (
      <Wrapper
        idx={params.idx}
        data={node.data}
        background-color={attributes["background-color"]}
        padding-top={attributes["padding-top"]}
        padding-bottom={attributes["padding-bottom"]}
        padding-left={attributes["padding-left"]}
        padding-right={attributes["padding-right"]}
      >
        <Section padding="0px">
          <Column padding="0px" border="none" vertical-align="top">
            <ContentEditableBlock node={node.children[0] as TextElement} />
          </Column>
        </Section>
        <Section padding="0px">
          <Group>
            {mode === "testing" ? (
              products.map((item, index) => (
                <RenderList item={item} key={index} />
              ))
            ) : (
              <ForEach dataSource={dataSourceKey} itemName="item">
                <RenderList
                  item={{
                    id: "{{item.id}}",
                    title: "{{item.title}}",
                    image: "{{item.image}}",
                    comparePrice: "{{item.comparePrice}}",
                    price: "{{item.price}}",
                  }}
                />
              </ForEach>
            )}
          </Group>
        </Section>
      </Wrapper>
    );
  },
});
