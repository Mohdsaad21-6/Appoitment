
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: State for search query

  function getData() {
    axios
      .get("https://670f8b553e715186165860d7.mockapi.io/crud-doctor")
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://670f8b553e715186165860d7.mockapi.io/crud-doctor/${id}`)
      .then(() => getData());
  }

  const setToLocalStorage = (id, name, number) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("number", number);
  };

  useEffect(() => {
    getData();
  }, []);

  // Step 3: Filter data based on search query
  const filteredData = data.filter((eachData) => {
    return (
      eachData.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  });

  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h2 style={{ color: "#471d8ae3",textShadow:"2px 2px 0 rgba(255,255,255,1)" }}>All Patient</h2>
        <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>

      {/* Step 2: Search Input */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          className="form-control"
        />
      </div>

      <table className="table table-hover" id="container1">
        <thead className="table-primary">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="table-secondary">
          {filteredData.map((eachData) => (
            <tr key={eachData.id}>
              <th scope="row">{eachData.id}</th>
              <td>{eachData.name}</td>
              <td>{eachData.number}</td>
              <td>
                <Link to="/update">
                  <button
                    onClick={() =>
                      setToLocalStorage(
                        eachData.id,
                        eachData.name,
                        eachData.number
                      )
                    }
                    className="btn btn-outline-success"
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(eachData.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Read;