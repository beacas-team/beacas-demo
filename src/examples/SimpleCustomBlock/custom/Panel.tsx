import { Collapse } from "@arco-design/web-react";
import { t } from "beacas-core";
import { useSelectedNode, ActiveTabKeys } from "beacas-editor";
import { Path } from "slate";
import {
  ResponsiveTabs,
  AttributesPanelWrapper,
  CollapseWrapper,
  ResponsiveField,
  AttributeField,
} from "beacas-plugins";
import React from "react";

export const CustomLogoPanel = ({ nodePath }: { nodePath: Path }) => {
  return (
    <AttributesPanelWrapper>
      <ResponsiveTabs
        desktop={
          <AttributesContainer
            mode={ActiveTabKeys.DESKTOP}
            nodePath={nodePath}
          />
        }
        mobile={
          <AttributesContainer
            mode={ActiveTabKeys.MOBILE}
            nodePath={nodePath}
          />
        }
      />
    </AttributesPanelWrapper>
  );
};

function AttributesContainer({
  nodePath,
  mode,
}: {
  mode: ActiveTabKeys;
  nodePath: Path;
}) {
  const { selectedNode } = useSelectedNode();

  if (!selectedNode) return null;

  return (
    <CollapseWrapper defaultActiveKey={["0", "1"]}>
      <Collapse.Item name="0" header={t("Image")}>
        <ResponsiveField
          component={AttributeField.ImageUrl}
          path={nodePath}
          name="src"
        />
      </Collapse.Item>
      <Collapse.Item name="1" header={t("Button")}>
        <AttributeField.TextField
          label={t("Button Text")}
          name="data.buttonText"
          path={nodePath}
        />
        <ResponsiveField
          label={t("Button color")}
          component={AttributeField.ColorPickerField}
          path={nodePath}
          name="button-color"
        />
      </Collapse.Item>
    </CollapseWrapper>
  );
}
