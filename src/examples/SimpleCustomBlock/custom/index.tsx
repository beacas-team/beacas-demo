import { CustomBlockType } from "@/examples/constant";
import { createCustomBlock, t, components, mergeBlock } from "beacas-core";
import { ElementCategory } from "beacas-core";
import React from "react";
import { SimpleCustomElement } from "@/custom-types";

const { Button, Section, Column, Image } = components;

const defaultData = {
  attributes: {
    src: "",
  },
  data: {
    buttonText: "Save",
  },
};

export const SimpleCustomBlock = createCustomBlock<SimpleCustomElement>({
  get name() {
    return t("Simple Block");
  },
  defaultData: defaultData,
  type: CustomBlockType.SIMPLE_CUSTOM_BLOCK,
  void: true,
  create: (payload) => {
    const data: SimpleCustomElement = {
      type: CustomBlockType.SIMPLE_CUSTOM_BLOCK,
      data: {
        ...defaultData.data,
      },
      attributes: {
        ...defaultData.attributes,
      },
      children: [],
    };
    return mergeBlock(data, payload);
  },
  category: ElementCategory.SECTION,
  render(params) {
    const { node } = params;

    const { data, attributes } = node;

    return (
      <Section idx={params.idx} {...node.attributes} data={node.data}>
        <Column>
          <Image padding="0px 0px 0px 0px" width="100px" src={attributes.src} />
          <Button background-color={attributes["button-color"]} href="#">
            {data.buttonText}
          </Button>
        </Column>
      </Section>
    );
  },
});
