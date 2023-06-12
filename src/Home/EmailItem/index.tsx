import React from "react";
import styles from "./index.module.less";

export interface EmailItemProps {
  item: {
    subject: string;
    thumbnail: string;
    url?: string;
  };
}
export const EmailItem = ({ item }: EmailItemProps) => {
  return (
    <a href={item.url} target="_blank" style={{ color: "#000" }}>
      <div
        className={styles.wrapItem}
        style={{
          backgroundImage: `url(${item.thumbnail})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      >
        <div className={styles.bottom}>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {item.subject}
          </div>
        </div>
      </div>
    </a>
  );
};
