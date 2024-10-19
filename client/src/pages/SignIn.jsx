import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
// import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      // return setErrorMessage("All fields are required.");
      return dispatch(signInFailure("All fields are required."));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());

      const res = await fetch(import.meta.env.VITE_BASE_URL2, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // setLoading(false);
      // setErrorMessage(error.message);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-4">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span
              className="px-1 py-1 bg-gradient-to-r from-indigo-500
         via-purple-500 to-pink-500 rounded-lg text-white"
            >
              Your{" "}
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is my demo blog app. Welcome to the MERN-Blog App developed by
            Febin
          </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="User Email"></Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label value="User Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading..</span>
                </>
              ) : (
                "SignIn"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to={"/signup"} className="text-blue-500">
              SignUp
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 " color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
