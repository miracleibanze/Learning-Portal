"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { joinRoom } from "@lib/socket";

export default function SocketJoiner() {
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user && user.myCourses) {
      user.myCourses.forEach((courseId: string) => {
        joinRoom(courseId);
      });
    }
  }, [user]);

  return null;
}
