import { Button, Grid, Space, Table, Typography } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";
import React, { useCallback, useMemo } from "react";
import { IconDragDotVertical } from "@arco-design/web-react/icon";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import type { ColumnProps } from "@arco-design/web-react/es/Table";
import { ProductsSheet } from "./ProductsSheet";
import { ProductItem } from "..";
import { t } from "beacas-core";
import { ProductRecommendationProps } from ".";

const DragHandle = SortableHandle(() => (
  <IconDragDotVertical
    style={{
      cursor: "move",
      color: "rgb(92 95 98)",
      fontSize: 20,
    }}
  />
));

const arrayMoveMutate = (array: Array<any>, from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to;

  if (startIndex >= 0 && startIndex < array.length) {
    const item = array.splice(from, 1)[0];
    array.splice(startIndex, 0, item);
  }
};

const arrayMove = (array: Array<any>, from: number, to: number) => {
  array = [...array];
  arrayMoveMutate(array, from, to);
  return array;
};

const SortableWrapper = SortableContainer((props: any) => {
  return <tbody {...props} />;
});
const SortableItem = SortableElement((props: any) => {
  return <tr {...props} />;
});

export function ProductPicker(props: ProductRecommendationProps) {
  const selectedProducts = useMemo(
    () =>
      (props.selectedIds || [])
        .map((id) =>
          [...props.products, ...props.products].find((item) => item.id === id)
        )
        .filter(Boolean) as ProductItem[],
    [props.products, props.selectedIds]
  );

  const onDeleteItem = useCallback(
    (id: string) => {
      props.onSelect(props.selectedIds.filter((item) => item !== id));
    },
    [props]
  );

  const columns: ColumnProps<ProductItem>[] = [
    {
      title: t("Content"),
      render: (_, record) => {
        return (
          <Space>
            <div
              style={{
                width: 40,
                height: 40,
                backgroundImage: `url(${record.image})`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                border: "1px solid #e8e8e8",
              }}
            />
            <Typography.Text ellipsis style={{ width: 150 }}>
              {record.title}
            </Typography.Text>
          </Space>
        );
      },
    },
    {
      title: t("Action"),
      render: (_, record) => {
        return (
          <Grid.Row style={{ flexWrap: "nowrap" }} justify="end" align="center">
            <Button
              onClick={() => onDeleteItem(record.id)}
              icon={
                <IconDelete style={{ fontSize: 20, color: "rgb(92 95 98)" }} />
              }
            />
            <Grid.Col span={3} />
            <DragHandle />
          </Grid.Row>
        );
      },
    },
  ];

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove(
        [...props.selectedIds],
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      props.onSelect(newData);
    }
  };

  const DraggableContainer = (props: any) => (
    <SortableWrapper
      useDragHandle
      onSortEnd={onSortEnd}
      helperContainer={() =>
        document.querySelector(".arco-drag-table-container-2 table tbody")
      }
      updateBeforeSortStart={({ node }) => {
        const tds = node.querySelectorAll("td");
        tds.forEach((td) => {
          td.style.width = td.clientWidth + "px";
        });
      }}
      {...props}
    />
  );

  const DraggableRow = (props: any) => {
    const { record, index, ...rest } = props;
    return <SortableItem index={index} {...rest} />;
  };

  const components = {
    body: {
      tbody: DraggableContainer,
      row: DraggableRow,
    },
  };

  return (
    <>
      <div>
        <Grid.Row
          style={{ padding: "10px 16px 0px 16px" }}
          justify="space-between"
          align="center"
        >
          <Typography.Text>{t("Product")}</Typography.Text>
          <ProductsSheet
            {...props}
            onSelect={props.onSelect}
            productIds={props.selectedIds}
          >
            <Button style={{ padding: 0 }} type="text">
              {t("Add product")}
            </Button>
          </ProductsSheet>
        </Grid.Row>
        <Table
          loading={props.loading}
          rowKey="id"
          showHeader={false}
          border={false}
          className="arco-drag-table-container-2"
          components={components}
          columns={columns}
          data={selectedProducts}
          pagination={false}
        />
      </div>
    </>
  );
}
