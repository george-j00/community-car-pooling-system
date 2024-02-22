import ProfileAvatar from "@/components/shared/Avatar";
import EditProfileDialogBox from "@/components/shared/EditProfileDialogBox";
import UserData from "@/components/shared/UserData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
