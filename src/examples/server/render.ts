import { BeacasCore, BlockManager, NodeUtils } from "beacas-core";
import { DynamicCustomBlock } from "../DynamicCustomBlock/custom";
import * as template from "../DynamicCustomBlock/template.json";
import mjml from "mjml";
import fs from "fs";
import path from "path";
import { CustomBlockType } from "../constant";
import { EmailTemplate } from "beacas-editor";
import { DynamicCustomElement } from "@/custom-types";
import { fetchProducts } from "../DynamicCustomBlock/mergetagData";

const main = async () => {
  // will be cached in memory, only call once in the app
  await BeacasCore.auth({
    clientId: "clgnivsuj0018z9ltiixmxf6k",
  });

  // register custom block
  BlockManager.registerBlocks([DynamicCustomBlock]);

  const pageData = template.content as EmailTemplate["content"];

  // mjmlSkeleton & htmlSkeleton can be cached
  const mjmlSkeleton = BeacasCore.toMJML({
    element: pageData,
    mode: "production",
  });
  const htmlSkeleton = mjml(mjmlSkeleton).html;

  // inject dynamic data
  const dynamicData = await getDynamicData(pageData);
  const finalHtml = BeacasCore.renderWithData(htmlSkeleton, dynamicData);

  fs.writeFileSync(
    path.join(process.cwd(), "/dist/server-render.html"),
    finalHtml
  );
};

const getDynamicData = async (pageData: EmailTemplate["content"]) => {
  const dynamicCustomBlock = pageData.children.find((item) => {
    if (!NodeUtils.isElement(item)) return false;
    return item.type === CustomBlockType.DYNAMIC_CUSTOM_BLOCK;
  }) as DynamicCustomElement | undefined;

  const selectedIds = dynamicCustomBlock?.data.productIds;

  const products = await fetchProducts({ productIds: selectedIds || [] });

  return { products };
};

main();
