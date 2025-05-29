import Header from "@/components/layout/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="w-full p-5">{children}</main>
    </div>
  );
};

export default Layout;
