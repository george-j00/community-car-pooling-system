import AdminHeader from "@/components/shared/AdminHeader";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen ">
      <main className="flex-1">{children}</main>
    </div>
  );
}
