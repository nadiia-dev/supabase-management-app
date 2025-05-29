import Header from "@/components/layout/header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
