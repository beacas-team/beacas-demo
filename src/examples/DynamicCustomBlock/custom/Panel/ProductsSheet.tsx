import {
  Button,
  Drawer,
  Form,
  Input,
  PaginationProps,
  Space,
  Table,
  Typography,
} from "@arco-design/web-react";
import { ColumnProps } from "@arco-design/web-react/es/Table";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { ProductItem } from "..";
import { useEventCallback } from "beacas-editor";
import { t } from "beacas-core";
import { ProductRecommendationProps } from ".";

const columns: ColumnProps<ProductItem>[] = [
  {
    title: <span>{t(`Products`)}</span>,
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
];

export const ProductsSheet: React.FC<
  {
    products: ProductItem[];
    productIds: string[];
    onSelect: (products: string[]) => void;
    loading: boolean;
    pagination?: PaginationProps;
    children: React.ReactNode;
  } & ProductRecommendationProps
> = (props) => {
  const [keyword, setKeyword] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);

  const onChange = useEventCallback(props.onPaginationChange);

  const onChangePage = useEventCallback(
    (pageNumber: number, pageSize: number) => {
      setPage(pageNumber);
      onChange({
        page: pageNumber,
        size: pageSize,
        keyword: keyword,
      });
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeKeyword = useCallback(
    debounce((keyword: string) => {
      setKeyword(keyword);
      onChange({
        page: page,
        size: props.size || 10,
        keyword: keyword,
      });
    }, 100),
    [onChange, page, props.size]
  );

  return (
    <>
      <Drawer
        bodyStyle={{ padding: 0 }}
        width={400}
        title={<span>{t("Add products")}</span>}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={<Button onClick={() => setVisible(false)}>Save</Button>}
      >
        <Form.Item style={{ padding: 10, marginBottom: 0 }} layout="vertical">
          <Input.Search style={{ width: "100%" }} onChange={onChangeKeyword} />
        </Form.Item>
        <Table
          loading={props.loading}
          // showHeader={false}
          rowKey={(item) => item.id}
          border={false}
          className="arco-drag-table-container-2"
          columns={columns}
          data={props.products}
          pagination={{
            current: page,
            pageSize: props.size || 10,
            total: props.total || 0,
            onChange: onChangePage,
            hideOnSinglePage: true,
            // simple: true,
            ...props.pagination,
          }}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: props.productIds,
            onSelectAll(selected, selectedRows: ProductItem[]) {
              if (selected) {
                props.onSelect([
                  ...new Set([
                    ...props.productIds,
                    ...selectedRows.map((item) => item.id),
                  ]),
                ]);
              } else {
                props.onSelect(
                  props.productIds.filter((id) =>
                    selectedRows.some((row) => row.id === id)
                  )
                );
              }
            },
            onSelect(selected: boolean, record: ProductItem) {
              if (selected) {
                props.onSelect([...props.productIds, record.id]);
              } else {
                props.onSelect(
                  props.productIds.filter((item) => item !== record.id)
                );
              }
            },
          }}
        />
      </Drawer>
      <div onClick={() => setVisible(true)}>{props.children}</div>
    </>
  );
};
