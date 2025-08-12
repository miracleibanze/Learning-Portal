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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const { coursesCreated } = useSelector((state: RootState) => state.courses);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!coursesCreated.data.length) {
      dispatch(fetchCoursesCreated());
    } else {
      setCourseId(coursesCreated.data[0]?._id || "");
    }
  }, [coursesCreated.data, pathname, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !courseId) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      await axios.post("/api/announcements", { title, description, courseId });
      dispatch(fetchAnnouncements());
      alert("✅ Announcement created successfully");
      router.push("/iLearn");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to create announcement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded-md text-sm">
          {error}
        </p>
      )}

      {/* Title */}
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          placeholder="Enter announcement title"
          className="w-full border dark:bg-white/10 border-opacityPrimary p-2 rounded-md outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          placeholder="Enter description"
          rows={4}
          className="w-full border dark:bg-white/10 border-opacityPrimary p-2 rounded-md outline-none resize-none"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError("");
          }}
        />
      </div>

      {/* Course Selector */}
      <div>
        <label className="block mb-1 font-semibold">Course</label>
        <select
          value={courseId}
          onChange={(e) => {
            setCourseId(e.target.value);
            if (error) setError("");
          }}
          className="w-full border dark:bg-primary border-opacityPrimary p-2 rounded-md outline-none"
        >
          <option value="">Choose related course</option>
          {session?.user.role === "admin" && (
            <>
              <option value="all">All courses</option>
              <option disabled>────────────</option>
            </>
          )}
          {coursesCreated.coursesCreatedLoading ? (
            <option disabled>Loading courses...</option>
          ) : coursesCreated.data.length > 0 ? (
            coursesCreated.data.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))
          ) : (
            <option disabled>You have created 0 courses</option>
          )}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-md transition-colors"
      >
        Create Announcement
      </button>
    </form>
  );
}
