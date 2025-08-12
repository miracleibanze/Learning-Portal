"use client";

import { FC, useEffect, useState } from "react";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Login from "@components/Login";
import Register from "@components/Register";
import PopupModal from "@components/designs/PopupModal";
import { signIn, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchUser } from "@redux/slices/userSlice";
import { LoadingBar } from "@app/loading";

const MOCK_USERS = [
  "quinsmith12@gmail.com",
  "michaeljdon@gmail.com",
  "mkgeorge@gmail.com",
];

const VALID_ROUTES = ["login", "register", "production"];

const AuthPage: FC = () => {
  const { authentication }: { authentication: string } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const [isChoosingToContinue, setIsChoosingToContinue] = useState(true);
  const [isChoosingDashboard, setIsChoosingDashboard] = useState(false);
  const [haveChosenUser, setHaveChosenUser] = useState(false);

  const handleSignIn = async (idx: number) => {
    const password = process.env.NEXT_PUBLIC_DEMO_PASSWORD;

    await signIn("credentials", {
      email: MOCK_USERS[idx],
      password,
      redirect: false,
    });

    setHaveChosenUser(true);
  };

  useEffect(() => {
    if (!VALID_ROUTES.includes(authentication)) {
      notFound();
    }
  }, [authentication]);

  useEffect(() => {
    if (!user || user?._id !== session?.user._id) {
      dispatch(fetchUser());
    }
  }, [dispatch, pathname, isChoosingDashboard, session?.user._id]);

  return (
    <section className="w-full min-h-screen flex flex-col bg-gray-50 dark:bg-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white dark:bg-black/70 shadow-sm p-2 flex items-center justify-between px-6">
        <Image
          src="/logo.png"
          alt="LearnTech Logo"
          width={150}
          height={50}
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => router.push("/")}
        />
      </nav>

      {/* Maintenance Modal */}
      {authentication !== "production" && (
        <PopupModal noClose={true} className="flex-center">
          {isChoosingToContinue && (
            <div className="max-w-lg text-center space-y-4">
              <h3 className="h3 text-sky-600 font-bold">⚠ Warning!</h3>
              <p className="body-2 text-gray-700 dark:text-gray-300">
                This website is currently under maintenance.
              </p>
              <p className="body-1 font-bold leading-tight">
                Access is limited to{" "}
                <span className="text-yellow-600">developer-related</span>{" "}
                purposes only.
              </p>
              <div className="p-3 rounded border border-green-600 bg-green-100 dark:bg-green-600/30 text-left">
                <span className="block font-bold mb-1">
                  Valid reasons include:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Hiring me.</li>
                  <li>Seeking inspiration from my work.</li>
                  <li>Evaluating my expertise.</li>
                  <li>Other related reasons.</li>
                </ol>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded shadow"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
                <button
                  className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded shadow"
                  onClick={() => {
                    setIsChoosingDashboard(true);
                    setIsChoosingToContinue(false);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Dashboard Selection */}
          {isChoosingDashboard && (
            <div className="max-w-lg text-center space-y-4">
              <h3 className="h3 text-sky-600 font-bold">
                Welcome to LearnTech!
              </h3>
              {!haveChosenUser ? (
                <>
                  <p className="body-1">
                    Choose a demo account to explore the site without
                    complications.
                  </p>
                  <div className="flex flex-col gap-3 mt-4">
                    {["Student", "Instructor", "Admin"].map((role, idx) => (
                      <button
                        key={role}
                        className={`px-4 py-2 rounded text-white font-medium hover:scale-105 transition-transform ${
                          idx === 0
                            ? "bg-violet-600"
                            : idx === 1
                            ? "bg-green-600"
                            : "bg-cyan-600"
                        }`}
                        onClick={() => handleSignIn(idx)}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="body-1">
                    You have selected a demo account. Here are your details:
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    {session?.user?.picture && (
                      <Image
                        src={session.user.picture}
                        alt="Profile"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="text-left text-sm border-l border-gray-300 pl-3">
                      <p>
                        Name: <strong>{session?.user?.name}</strong>
                      </p>
                      <p>
                        Email: <strong>{session?.user?.email}</strong>
                      </p>
                      <p>
                        Role: <strong>{session?.user?.role}</strong>
                      </p>
                      <p>
                        {session?.user?.role === "instructor"
                          ? "Created"
                          : "Enrolled"}{" "}
                        Courses: <strong>{user?.myCourses?.length ?? 0}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded shadow"
                      onClick={() => setHaveChosenUser(false)}
                    >
                      Back
                    </button>
                    <button
                      className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded shadow"
                      onClick={() => router.push("/iLearn")}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </PopupModal>
      )}

      {/* Auth Pages */}
      {authentication === "production" && <Login />}
      {/* {authentication === "login" && <Login />} */}
      {authentication === "register" && <Register />}
    </section>
  );
};

export default AuthPage;
