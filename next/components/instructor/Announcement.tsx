"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { usePathname, useRouter } from "next/navigation";
import { fetchCoursesCreated } from "@redux/slices/coursesSlice";
import { fetchAnnouncements } from "@redux/slices/announcementsSlice";
import { useSession } from "next-auth/react";

export default function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { coursesCreated } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [courseId, setCourseId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (coursesCreated.data.length === 0) return;
    console.log("coursesCreated : ", coursesCreated.data);
    setCourseId(coursesCreated.data[0]._id);
  }, [coursesCreated.data]);

  useEffect(() => {
    if (coursesCreated.data.length === 0) dispatch(fetchCoursesCreated());
  }, [pathname, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/announcements", {
        title,
        description,
        courseId,
      });
      alert("Announcement created successfully");
      dispatch(fetchAnnouncements());
      router.push("/iLearn");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to create announcement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          placeholder="Enter announcement title"
          className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          placeholder="Enter description"
          className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Course</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value as any)}
          className="w-full dark:bg-primary border border-opacityPrimary p-2 rounded outline-none"
        >
          <option value="">Choose related course</option>
          {session?.user.role === "admin" && (
            <>
              <option value="all">All courses</option>
              <option disabled></option>
            </>
          )}
          {coursesCreated.coursesCreatedLoading ? (
            <>
              <option disabled></option>
              <option disabled></option>
              <option disabled>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loading...</option>
              <option disabled></option>
            </>
          ) : coursesCreated.data.length > 0 ? (
            coursesCreated.data.map((course) => (
              <option value={course._id}>{course.title}</option>
            ))
          ) : (
            <option disabled>You have created 0 courses</option>
          )}
        </select>
      </div>

      <button
        type="submit"
        className="bg-secondary text-white px-4 py-2 rounded"
      >
        Create Announcement
      </button>
    </form>
  );
}
