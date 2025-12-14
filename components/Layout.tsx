import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          maxWidth: 1200,
          margin: "24px auto",
          width: "100%",
          padding: "0 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
