import { Alert, Button, TextInput } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  console.log(imageFileUploadProgress);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const uploadImage = async () => {
    // console.log("uploading...x");
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Image Uploading Failed. File must be less than 2mb and must be an image file"
        );
        setImageFile(null);
        setImageFileUrl(null);
        console.log({ error });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="px-4">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer rounded-full overflow-hidden shadow-md"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress ? (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={1}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152, 192, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          ) : null}
          <img
            src={imageFile ? imageFileUrl : currentUser.profilePic}
            alt="Profile Picture"
            className={`rounded-full w-full h-full border-4 border-[#878686] object-cover ${
              imageFileUploadProgress && imageFileUploadProgress < 100
                ? "opacity-60"
                : "opacity-100"
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

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
