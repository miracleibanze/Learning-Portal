"use client";

import { FC, useEffect, useState } from "react";
import {
  notFound,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { UserType } from "@type/User";
import Image from "next/image";
import Profile from "@components/Profile";
import axios from "axios";
import Error from "@app/error";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchDetailedUser } from "@redux/slices/userSlice";

const page: FC = () => {
  const { username }: { username: string } = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.user.detailedUser
  );

  useEffect(() => {
    if (!username) {
      notFound();
    }
    if (!data || data.username !== username) {
      dispatch(fetchDetailedUser(username));
    }
  }, [dispatch, pathname, username]);

  if (loading) return <div>Loading profile...</div>;

  return (
    <>
      <Profile user={data} />;{JSON.stringify(data)}
    </>
  );
};

export default page;
