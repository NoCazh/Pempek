import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar className="sticky top-0" />
      <div className="bg-base-100 flex-1 p-4 relative overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
