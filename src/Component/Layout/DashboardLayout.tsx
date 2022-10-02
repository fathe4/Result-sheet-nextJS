import Link from "next/link";
import React, { ReactNode, useState } from "react";
import UploadResultModal from "../UploadResultModal";
import {
  BiSpreadsheet,
  BiEdit,
  BiTable,
  BiHomeSmile,
  BiUpload,
} from "react-icons/bi";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [currentMenu, setCurrentMenu] = useState("Dashboard");
  const menus = [
    {
      link: "/dashboard/DashboardResultTable",
      name: "Results",
      icon: <BiSpreadsheet />,
    },
    {
      link: "/dashboard/ManageResults",
      name: "Manage Results",
      icon: <BiEdit />,
    },
    {
      link: "/dashboard/CreateTable",
      name: "Create Table",
      icon: <BiTable />,
    },
  ];
  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-900">
          <div className="sidebar-header flex items-center justify-center py-4">
            <div className="flex flex-col">
              <a href="#" className="inline-flex flex-col items-center">
                <Image src="/ngc.jpeg" width={50} height={50} alt="ngc logo" />
                <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">
                  NGC
                </span>
              </a>
            </div>
          </div>
          <div className="sidebar-content px-4 py-6">
            <ul className="flex flex-col w-full">
              <Link href="/dashboard">
                <li
                  className="my-px"
                  onClick={() => setCurrentMenu("Dashboard")}
                >
                  <a
                    href="#"
                    className={[
                      "flex",
                      "flex-row",
                      "items-center",
                      "h-10",
                      "px-3",
                      "rounded-lg",
                      "text-gray-300",
                      currentMenu === "Dashboard"
                        ? "text-gray-900 bg-gray-100"
                        : "hover:bg-gray-100 hover:text-gray-700",
                    ].join(" ")}
                  >
                    <span className="flex items-center justify-center text-lg text-gray-400">
                      <BiHomeSmile className="text-xl" />
                    </span>
                    <span className="ml-3">Dashboard</span>
                  </a>
                </li>
              </Link>
              <li className="my-px">
                <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">
                  Manage
                </span>
              </li>
              {menus.map((menu: any, i: number) => (
                <Link key={i} href={menu.link}>
                  <li
                    className="my-px"
                    onClick={() => setCurrentMenu(menu.name)}
                  >
                    <a
                      href="#"
                      className={[
                        "flex",
                        "flex-row",
                        "items-center",
                        "h-10",
                        "px-3",
                        "rounded-lg",
                        "text-gray-300",
                        currentMenu === menu.name
                          ? "text-gray-900 bg-gray-100"
                          : "hover:bg-gray-100 hover:text-gray-700",
                      ].join(" ")}
                    >
                      <span className="flex items-center justify-center text-lg text-gray-400">
                        {menu.icon}
                      </span>
                      <span className="ml-3">{menu.name}</span>
                    </a>
                  </li>
                </Link>
              ))}

              <li className="my-px">
                <a
                  href="#"
                  className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="flex items-center justify-center text-lg text-green-400">
                    <BiUpload />
                  </span>
                  <label htmlFor="upload-result-modal" className="ml-3">
                    Upload result
                  </label>
                </a>
              </li>
              <li className="my-px">
                <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">
                  Account
                </span>
              </li>
              <li className="my-px">
                <a
                  href="#"
                  className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="ml-3">Profile</span>
                </a>
              </li>
              <li className="my-px">
                <a
                  href="#"
                  className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </span>
                  <span className="ml-3">Notifications</span>
                  <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                    10
                  </span>
                </a>
              </li>
              <li className="my-px">
                <a
                  href="#"
                  className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span className="ml-3">Settings</span>
                </a>
              </li>
              <li className="my-px">
                <a
                  href="#"
                  className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="flex items-center justify-center text-lg text-red-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="ml-3">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <header className="header bg-white shadow py-4 px-4">
            <div className="header-content flex items-center flex-row">
              <form action="#">
                <div className="hidden md:flex relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <input
                    id="search"
                    type="text"
                    name="search"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                    placeholder="Search..."
                  />
                </div>
                <div className="flex md:hidden">
                  <a
                    href="#"
                    className="flex items-center justify-center h-10 w-10 border-transparent"
                  >
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </a>
                </div>
              </form>
              <div className="flex ml-auto">
                <a className="flex flex-row items-center">
                  <span className="flex flex-col ml-2">
                    <span className="truncate w-20 font-semibold tracking-wide leading-none">
                      John Doe
                    </span>
                    <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                      Manager
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </header>
          <div className="main-content flex flex-col flex-grow p-4">
            <h1 className="font-bold text-2xl text-gray-700">{currentMenu}</h1>

            <div className="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
              {children}
              <UploadResultModal />
            </div>
          </div>
          <footer className="footer px-4 py-6">
            <div className="footer-content">
              <p className="text-sm text-gray-600 text-center">
                © Fathe karim 2021. All rights reserved.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;