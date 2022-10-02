import React from "react";

const Filter = ({
  options,
  selectOption,
}: {
  options: any;
  selectOption: Function;
}) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn m-1">
        Filter
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        onChange={(e: any) => console.log(e)}
      >
        {options.map((option: { value: string; label: string }, i: number) => (
          <React.Fragment key={i}>
            <li onClick={() => selectOption(option)}>
              <a>{option.value}</a>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
