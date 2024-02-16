const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-black">
          {children}
      </div>
    )
  };
  
  export default Layout;
  