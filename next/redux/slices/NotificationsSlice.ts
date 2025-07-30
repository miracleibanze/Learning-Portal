import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  message: string;
  needComfirm?: boolean;
  createdAt: number;
  tag?: string;
  href?: string;
}

interface NotificationsState {
  system: Notification[];
  general: Notification[];
  unreadMessages: string[];
  silent: boolean;
  unreadMessageStatus: boolean;
}

const initialState: NotificationsState = {
  system: [],
  general: [],
  unreadMessages: [],
  silent: true,
  unreadMessageStatus: false,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addSystemNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id" | "createdAt">>
    ) => {
      const { tag } = action.payload;
      state.silent = false;
      if (tag && state.system.some((n) => n.tag === tag)) return;
      const id = Date.now().toString();
      const createdAt = Date.now();
      state.system.push({ ...action.payload, id, createdAt });
    },

    addGeneralNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id" | "createdAt">>
    ) => {
      const { tag } = action.payload;
      state.silent = false;
      if (tag && state.general.some((n) => n.tag === tag)) return;
      const id = Date.now().toString();
      const createdAt = Date.now();
      state.general.push({ ...action.payload, id, createdAt });
    },

    addUnreadMessage: (state, action: PayloadAction<string>) => {
      state.silent = false;
      if (!state.unreadMessages.includes(action.payload)) {
        state.unreadMessages.push(action.payload);
        state.unreadMessageStatus = true;
      }
    },

    removeUnreadMessage: (state, action: PayloadAction<string>) => {
      state.unreadMessages = state.unreadMessages.filter(
        (n) => n !== action.payload
      );
    },

    removeSystemNotification: (state, action: PayloadAction<string>) => {
      state.system = state.system.filter((n) => n.id !== action.payload);
    },

    removeGeneralNotification: (state, action: PayloadAction<string>) => {
      state.general = state.general.filter((n) => n.id !== action.payload);
    },

    clearAllNotifications: (state) => {
      state.system = [];
      state.general = [];
    },

    silenceAllNotifications: (state) => {
      state.silent = true;
    },

    silenceUnreadMessageNotifications: (state) => {
      state.unreadMessageStatus = false;
      const hasActiveGeneral = state.general.length > 0;
      console.log("silenceUnreadMessageNotification off");
      if (!hasActiveGeneral) {
        if (
          state.general.length > 0 &&
          state.general[state.general.length - 1].tag === "unreadMessages"
        )
          state.silent = true;
      }
    },
  },
});

export const {
  addSystemNotification,
  addGeneralNotification,
  removeSystemNotification,
  removeGeneralNotification,
  clearAllNotifications,
  addUnreadMessage,
  removeUnreadMessage,
  silenceAllNotifications,
  silenceUnreadMessageNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
