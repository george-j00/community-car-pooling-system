import CreateRideForm from "@/components/shared/CreateRide"

const page = () => {
  return (
   <>
    <section className="md:wrapper flex flex-col md:flex-row  w-full h-screen">
        <div className="w-full md:w-1/3">
          <CreateRideForm />
        </div>
        <div className="w-full md:w-2/3">
        <p>map thing</p>
        </div>
    </section>
   </>
  )
}

export default page