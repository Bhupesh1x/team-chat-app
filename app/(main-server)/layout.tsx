import NavigationSidebar from "@/components/navigation/NavigationSidebar";

async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <aside className="w-[72px] hidden md:flex h-full flex-col inset-y-0 fixed z-30">
        <NavigationSidebar />
      </aside>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
}

export default MainLayout;
