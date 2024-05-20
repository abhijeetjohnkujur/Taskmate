import Navbar from "./_components/Navbar";

const dashboardlayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="h-screen ">
        <Navbar />
        {children}
    </div>
  )
}

export default dashboardlayout;