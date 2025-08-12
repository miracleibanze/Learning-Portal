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

const page: FC = () => {
  const { authentication }: { authentication: string } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const validRoutes: string[] = ["login", "register", "production"];
  const { user } = useSelector((state: RootState) => state.user);
  const [isChoosingToContinue, setIsChoosingToContinue] = useState(true);
  const [isChoosingDashboard, setisChoosingDashboard] = useState(false);
  const [haveChoosenUser, setHaveChoosenUser] = useState(false);

  const handleSignIn = async (idx: number) => {
    const mockUsers = [
      "quinsmith12@gmail.com",
      "michaeljdon@gmail.com",
      "mkgeorge@gmail.com",
    ];

    const password = process.env.NEXT_PUBLIC_DEMO_PASSWORD;

    const result = await signIn("credentials", {
      email: mockUsers[idx],
      password,
      redirect: false,
    });
    setHaveChoosenUser(true);
  };

  if (!validRoutes.includes(authentication)) {
    return notFound();
  }

  useEffect(() => {
    if (!user || user?._id !== session?.user._id) {
      dispatch(fetchUser());
    }
  }, [dispatch, pathname, isChoosingDashboard, session?.user._id]);

  return (
    <section className="w-full min-h-screen flex flex-col">
      <nav className="sticky top-0 z-[1000] w-full bg-white dark:bg-black/70 p-2 flex items-center justify-between px-6">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={50}
          className="w-[10rem]"
          onClick={() => router.push("/")}
        />
      </nav>
      {authentication !== "production" && (
        <PopupModal noClose={true} className="flex-center">
          {isChoosingToContinue && (
            <>
              <h3 className="h3 text-sky-600 font-bold">Warning!</h3>
              <p className="body-2 mb-3">
                This Website is still under mantainance!
              </p>
              <p className="body-1 font-bold leading-tight mb-3">
                Only those for{" "}
                <span className="text-yellow-600 leading-none">Developer</span>
                &nbsp; reasons are allowed.
              </p>
              <div className="p-3 rounded border border-green-600 bg-green-600/30">
                <span className="block font-bold">Reasons like :</span>
                <ol className="body-1 leading-tight px-2 ol">
                  <li>Want to hire me.</li>
                  <li>Want inspiration from my work.</li>
                  <li>Want to check my level of expertise.</li>
                  <li>Other related reasons.</li>
                </ol>
              </div>
              <div className="flex justify-end gap-2 py-3">
                <button
                  className="py-2 px-3 bg-red-600 text-white rounded"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
                <button
                  className="py-2 px-3 bg-sky-600 text-white rounded"
                  onClick={() => {
                    setisChoosingDashboard(true);
                    setIsChoosingToContinue(false);
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          <>
            {isChoosingDashboard && (
              <>
                <h3 className="h3 text-sky-600 font-bold">
                  Welcome to LearnTech!
                </h3>
                {!haveChoosenUser ? (
                  <>
                    <p className="body-1 leading-tight mb-4">
                      I have prepared demo accounts to help you navigate and
                      check all functionalities on website without complication.
                    </p>
                    <div className="p-3 border-l border-zinc-500">
                      <span className="block font-bold">
                        Choose Dashboard you want first :
                      </span>
                      <ol className="body-1 underline flex gap-2 py-4 text-white">
                        <li
                          className="px-4 py-1 rounded bg-violet-600 mb-2 hover:scale-105 transition-all cursor-pointer"
                          onClick={() => {
                            handleSignIn(0);
                          }}
                        >
                          Student
                        </li>
                        <li
                          className="px-4 py-1 rounded bg-green-600 mb-2 hover:scale-105 transition-all cursor-pointer"
                          onClick={() => {
                            handleSignIn(1);
                          }}
                        >
                          Instructor
                        </li>
                        <li
                          className="px-4 py-1 rounded bg-cyan-600 mb-2 hover:scale-105 transition-all cursor-pointer"
                          onClick={() => {
                            handleSignIn(2);
                          }}
                        >
                          Admin
                        </li>
                      </ol>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="body-1 leading-tight mb-4">
                      You have choosen a demo account, You will be using the
                      following information as you continue in websiter.
                    </p>
                    <div className="p-3">
                      {session?.user ? (
                        <>
                          <span className="block font-bold text-sky-600 mb-4">
                            You will have :
                          </span>
                          <div className="flex gap-2">
                            {session.user.picture && (
                              <Image
                                src={session.user.picture}
                                alt="profile"
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded object-cover"
                              />
                            )}
                            <div className=" border-l border-zinc-500 px-2 leading-tight body-2">
                              <p>
                                name: <strong>{session.user.name}</strong>
                              </p>
                              <p>
                                email: <strong>{session.user.email}</strong>
                              </p>
                              <p>
                                role: <strong>{session.user.role}</strong>
                              </p>
                              <p>
                                {`${
                                  session.user.role === "instructor"
                                    ? "enrolled"
                                    : "created"
                                } courses: `}
                                <strong>
                                  {user ? user?.myCourses.length : "0"}
                                </strong>
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <LoadingBar />
                      )}
                    </div>

                    <div className="flex justify-end gap-2 py-3">
                      <button
                        className="py-2 px-3 bg-red-600 text-white rounded"
                        onClick={() => setHaveChoosenUser(false)}
                      >
                        Back
                      </button>
                      <button
                        className="py-2 px-3 bg-sky-600 text-white rounded"
                        onClick={() => {
                          router.push("/iLearn");
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        </PopupModal>
      )}

      {authentication === "production" && <Login />}
      {/* {authentication === "login" && <Login />}
      {authentication === "register" && <Register />} */}
    </section>
  );
};

export default page;
