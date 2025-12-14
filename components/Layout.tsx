import React from "react";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: 1200, margin: "24px auto" }}>{children}</div>
    </div>
  );
}
