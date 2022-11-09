import React, { useState } from "react";
import SelectWrapper from "./SelectWrapper";
import axios from "axios";

const SelectCom = (props) => {
  const [options, setOptions] = useState([]);
  const [pageNo, setPage] = useState(0);
  //Checks if there are more pages to be loaded
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setNextPageLoading] = useState(false);
  const [selectedValue, setSelectedOption] = useState("");

  const loadOptions = async (page) => {
    try {
      const params = {
        page,
        size: 200
      };
      setNextPageLoading(true);
      const {
        data: { data, totalPassengers }
      } = await axios.get(`https://api.instantwebtools.net/v1/passenger`, {
        params
      });
      const dataOptions = data.map(({ _id, name }) => ({
        label: name,
        value: _id
      }));
      const itemsData = options.concat(dataOptions);
      setOptions(itemsData);
      setNextPageLoading(false);
      setHasNextPage(itemsData.length < totalPassengers);
      setPage(page);
    } catch (err) {
      console.log(err); // eslint-disable
    }
  };

  const loadNextPage = async () => {
    await loadOptions(pageNo + 1);
  };

  return (
    <div className="App">
      <div className="dropdown">
        <div className="label">
          <label>Passenger name</label>
        </div>
        <SelectWrapper
          value={selectedValue}
          placeholder="Select"
          isClearable
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          options={options}
          loadNextPage={loadNextPage}
          onChange={(selected) => setSelectedOption(selected)}
        />
      </div>
    </div>
  );
};

export default SelectCom;
