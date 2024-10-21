import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="px-4">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer rounded-full overflow-hidden shadow-md">
          <img
            src={currentUser.profilePic}
            alt="Profile Picture"
            className="rounded-full w-full h-full border-4 border-[#878686] object-cover"
          />
        </div>
        <TextInput
          className=""
          type="text"
          placeholder="UserName"
          id="userName"
          defaultValue={currentUser.userName}
        />
        <TextInput
          className=""
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          className=""
          type="password"
          placeholder="Password"
          id="password"
        />
        <Button
          className=""
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Signout</span>
      </div>
    </div>
  );
}
