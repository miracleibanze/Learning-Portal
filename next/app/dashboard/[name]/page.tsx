"use client";

import { FC, useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { UserType } from "@type/User";
import Image from "next/image";
import Profile from "@components/Profile";
import axios from "axios";
import Error from "@app/error";

const page: FC = () => {
  const searchParams = useSearchParams();
  const pin = searchParams.get("pin");

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pin) {
      notFound();
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user`);

        setUser(response.data);
      } catch (err: any) {
        console.log("error found: ", err);
        setError(err.response.data.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pin]);

  if (loading) return <div>Loading profile...</div>;

  if (error) {
    return <Error error={{ message: error }} reset={() => setError(null)} />;
  }

  return (
    <>
      <Profile user={user} />;
    </>
  );
};

export default page;
