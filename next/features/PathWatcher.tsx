"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { silenceUnreadMessageNotifications } from "@redux/slices/NotificationsSlice";

const PathWatcher = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const unreadMessageStatus = useSelector(
    (state: RootState) => state.notifications.unreadMessageStatus
  );

  useEffect(() => {
    if (pathname === "/iLearn/discussions" && unreadMessageStatus) {
      dispatch(silenceUnreadMessageNotifications());
    }
  }, [pathname, unreadMessageStatus, dispatch]);

  return null;
};

export default PathWatcher;
