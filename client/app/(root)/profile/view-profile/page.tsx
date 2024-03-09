import EditProfileDialogBox from "@/components/shared/EditProfileDialogBox";
import UserData from "@/components/shared/UserData";

const page = () => {
  return (
    <>
      <section className="flex justify-center leading-loose">
          <UserData />
          <EditProfileDialogBox />
      </section>
    </>
  );
};

export default page;
