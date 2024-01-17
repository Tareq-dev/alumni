import React from "react";
function Pagination({ selectedOption, setSelectedOption }) {
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="flex items-center">
      <label className="text-gray-700 mr-2 font-semibold">Show :</label>
      <select
        className="border border-gray-300 rounded px-2 py-1"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={75}>75</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}

export default Pagination;
