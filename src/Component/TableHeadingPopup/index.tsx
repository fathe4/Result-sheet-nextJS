import React, { useEffect, useState } from "react";
import Modal from "../Elements/Modal";

export type attributeType = {
  _id: number;
  attribute_Title: string;
  slug: string;
  vendor: string;
  options: {
    label: string;
    value: string;
  };
};

export default function TableHeadingPopup({ attr, setIfShouldUpdate }: any) {
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const toggle = () => setIsTrue(!isTrue);

  return (
    <>
      {/* <button
        className="text-white font-bold py-1 px-3 rounded text-xs bg-indigo-600 hover:bg-green-dark mr-3 cursor-pointer"
        onClick={() => toggle()}
      >
        Edit
      </button>
      <div
        className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${
          isTrue ? "" : "hidden"
        }`}
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

        </div>
      </div> */}
      <Modal modalId="table-heading-modal" width="w-4/12 max-w-5/12">
        <div className="">
          <form className="p-3 ">
            <label className="text-sm font-medium text-gray-700 my-6">
              Create heading
            </label>

            <div className="flex flex-row gap-6">
              <div className="w-96">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="label"
                  type="text"
                  placeholder="Value"
                  defaultValue={label}
                  onBlur={(e) => setLabel(e.target.value)}
                />
              </div>
              <div className="text-right ">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-5 bg-gray-700 rounded text-white hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Heading
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right	">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Roll</td>
                <td className="py-4 px-6 border-b border-grey-light text-right	">
                  <a
                    href="#"
                    className="text-white font-bold py-1 px-3 rounded text-xs bg-gray-700 mr-2 hover:bg-blue-dark"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="text-white font-bold py-1 px-3 rounded text-xs bg-red-600 hover:bg-blue-dark"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="px-4 py-3 text-right">
            <button className="bg-gray-700 py-2 px-6 text-white rounded hover:bg-slate-900">
              Update
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
