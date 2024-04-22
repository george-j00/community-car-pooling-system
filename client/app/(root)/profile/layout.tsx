import ProfileNavLinks from "@/components/shared/ProfileNavLinks";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
    <section className="bg-black h-screen">
    <div className="flex gap-8 wrapper flex-col md:flex-row ">
      <aside className="flex-[2] h-full">
        <nav>
          <ul className="grid gap-3">
            <li>
              <ProfileNavLinks href="/profile/view-profile">
                Profile
              </ProfileNavLinks>
            </li>
            <li>
              <ProfileNavLinks href="/profile/complaint-register">
                Complaint register
              </ProfileNavLinks>
            </li>
            <li>
              <ProfileNavLinks href="/profile/add-car">Add car</ProfileNavLinks>
            </li>
            <li>
              <ProfileNavLinks href="/profile/created-rides">Created Rides</ProfileNavLinks>
            </li>
            <li>
              <ProfileNavLinks href="/profile/rides">Booked Rides</ProfileNavLinks>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="bg-gray-900 flex-[8] text-white p-4 rounded min-h-[300px]">
        {children}
      </div>
    </div>
    </section>
   </>
  );
}
