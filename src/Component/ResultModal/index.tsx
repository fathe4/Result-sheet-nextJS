import React, { useEffect, useState } from "react";
import Modal from "../Elements/Modal";

const ResultModal = ({
  group,
  date,
  roll,
}: {
  group: string;
  date: string;
  roll: string;
}) => {
  const [studentResult, setStudentResult] = useState<any>({});
  const [filterStudentResult, setFilterStudentResult] = useState<any>({});
  const [searchByName, setSearchByName] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    // if (studentResult === {}) {
    fetch(
      `http://localhost:3000/api/results/studentResult?date=${date}&&group=${group}&&roll=${roll}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStudentResult(data);
        setFilterStudentResult(data);
      })
      .finally(() => setIsLoading(false));
    // }
  }, [date, group, roll, searchByName]);

  const filterByName = (searchText: string) => {
    if (searchText == "") return setIsLoading(true);
    const filterResult = Object.fromEntries(
      Object.entries(studentResult).filter(([key]) => key.includes(searchText))
    );
    console.log(filterResult);
    filterResult && setFilterStudentResult(filterResult);
    return setStudentResult(filterStudentResult);
  };
  return (
    <Modal modalId="my-modal-5">
      <h3 className="font-bold text-lg">{studentResult.name} Marksheet</h3>
      <p className="py-4">
        Update or delete {studentResult.name} result of {studentResult.date}
      </p>
      <div>
        <div className="flex-1 pr-4">
          <div className="relative">
            <input
              type="search"
              onChange={(e) => filterByName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Search by name"
            />
            <div className="absolute top-0 left-0 inline-flex items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-400"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <table className="w-full sm:bg-white rounded-lg overflow-hidden  my-5">
            <thead className="text-white">
              <tr className="bg-base-content flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Value</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {filterStudentResult &&
                Object.entries(filterStudentResult).map(
                  ([key, value]: any, i: number) => {
                    if (key != "id") {
                      return (
                        <tr
                          key={i}
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                        >
                          <td className="border-grey-light border hover:bg-gray-100 p-3">
                            {key}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                            {value}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                            Edit
                          </td>
                        </tr>
                      );
                    }
                  }
                )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-action">
        <label htmlFor="my-modal-5" className="btn">
          Update
        </label>
        <label className="btn bg-error border-0">Delete</label>
      </div>
    </Modal>
  );
};

export default ResultModal;
