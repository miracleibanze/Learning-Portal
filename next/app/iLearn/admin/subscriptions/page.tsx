"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { usePathname } from "next/navigation";
import {
  fetchStudents,
  updateOtherUserField,
  updateUserField,
} from "@redux/slices/userSlice";
import { Check, Dot, UserCircle } from "lucide-react";
import Link from "next/link";

export const pricingPlans = [
  {
    title: "Basic Plan",
    price: "$19.99/month",
    description: "Access all courses with limited features.",
  },
  {
    title: "Pro Plan",
    price: "$49.99/month",
    description: "Access all courses and premium features.",
  },
  {
    title: "Single Course",
    price: "$9.99/course",
    description: "Purchase a single course.",
  },
];

const AdminSubscriptions = () => {
  const { students, loading } = useSelector(
    (state: RootState) => state.user.allUsers
  );
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchStudents({ index: pageIndex }));
  }, [pageIndex, dispatch, pathname]);

  // const fetchStudents = async () => {
  //   try {
  //     const { data } = await axios.get("/api/students/index");
  //     setStudents(data);
  //   } catch (error) {
  //     console.error("Error fetching students", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateSubscription = async (userId: string, plan: string) => {
    dispatch(
      updateOtherUserField({
        updates: { subscriptionPlan: plan },
        userId: userId,
      })
    );
  };

  return (
    <div className="sm:p-3 px-0 py-4 max-w-5xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Student Subscriptions</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-opacityPrimary">
              <th className="border p-2"></th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Current Plan</th>
              <th className="border p-2">Change Plan</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {loading && (
              <p className="absolute top-1/2 -translate-y-1/2 right-1/2 -translate-x-1/2">
                <p className="w-20 h-20 rounded-full aspect-square border-y-secondary border-x-primary border-4 flex-0 animate-spin transition-[1s]"></p>
              </p>
            )}
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300">.</td>
                    <td className="border border-gray-300 p-2">...</td>
                    <td className="border border-gray-300 p-2">...</td>
                    <td className="border border-gray-300 p-2">...</td>
                    <td className="border border-gray-300 p-2">...</td>
                  </tr>
                ))
              : students.map((student: any, index) => (
                  <tr key={student._id}>
                    <td className="border p-2">
                      {pageIndex * 12 + index + 1}.
                    </td>
                    <td className="border text-sm p-2 text-sky-600 dark:text-sky-400 hover:underline">
                      <Link href={`/iLearn/profile/${student.username}`}>
                        {student.name}
                      </Link>
                    </td>
                    <td className="border p-2">{student.email}</td>
                    <td className="border p-2">{student.fees}</td>
                    <td className="border !p-0">
                      <select
                        className="border p-2 rounded w-full dark:bg-opacityPrimary"
                        value={student.subscriptionPlan}
                        onChange={(e) =>
                          updateSubscription(student._id, e.target.value)
                        }
                      >
                        {pricingPlans.map((plan) => (
                          <option
                            key={plan.title}
                            value={plan.title}
                            className="w-full flex justify-between items-center gap-3 text-black"
                          >
                            <span>{plan.title}</span>
                            <span>
                              {plan.title === student.subscriptionPlan ? (
                                <Check />
                              ) : (
                                <Dot />
                              )}
                            </span>
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          disabled={pageIndex === 0}
          className="px-3 py-1 bg-primary rounded disabled:opacity-50 disabled:dark:text-black"
          onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
        >
          Previous
        </button>
        <span>Page {pageIndex + 1}</span>
        <button
          disabled={students.length < 12}
          className="px-3 py-1 bg-primary rounded disabled:opacity-50 disabled:dark:text-black"
          onClick={() => setPageIndex((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
