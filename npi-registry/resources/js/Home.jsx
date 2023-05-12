import React, { useState } from 'react';
import axios from 'axios';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";

export default function Home() {
  const [responseData, setResponseData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);
  const handleSubmit = (event, page) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    let skip = 0;
    setCurrentPage(1);
    formData.set("skip", skip);
    axios.post('/search', {...Object.fromEntries(formData), page})
      .then(response => {
        setResponseData(response.data.data.results);
      })
      .catch(error => {
        console.error(error);
      });
    };
    const handleNext = (event, page) => {
      event.preventDefault();
      const form = document.getElementById('npiSearch');
      const formData = new FormData(form);
      let newPage = currentPage + 1;
      let skip = (newPage - 1) * 50;
      formData.set("skip", skip);
      axios.post('/search', {...Object.fromEntries(formData), page})
        .then(response => {
          setResponseData([...responseData, ...response.data.data.results]);
          setCurrentPage(newPage);
        })
        .catch(error => {
          console.error(error);
        });
    };
    const handleRowClick = (index) => {
      setExpandedRow(index);
    };
  return (
    <div className="container">
      <div className="row my-5">
        <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: '3em' }}>
          <div className="search-container" style={{ display: 'flex', flexDirection: 'row', maxWidth: '300px' }}>
            <form id="npiSearch" onSubmit={(event) => handleSubmit(event, 1)}>
              <input type="text" placeholder="First Name" name="first_name" />
              <input type="text" placeholder="Last Name" name="last_name" />
              <input type="text" placeholder="NPI Number" name="number" />
              <input type="text" placeholder="Taxonomy Description" name="taxonomy_desc" />
              <input type="text" placeholder="City" name="city" />
              <input type="text" placeholder="State" name="state" />
              <input type="text" placeholder="Zip Code" name="postal_code" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      {responseData && (
  <div className="row" style={{ position: 'relative', top: '5em' }}>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>NPI Number</th>
          <th>Taxonomy Description</th>
          <th>City</th>
          <th>State</th>
          <th>Zip Code</th>
        </tr>
      </thead>
      <tbody>
        {responseData.map((result, index) => (
          <React.Fragment key={index}>
            <tr style={{border:"solid 1px black", margin:"1em 0", cursor:"pointer"}}
              onClick={() =>
                setExpandedRows(
                  expandedRows.includes(index)
                    ? expandedRows.filter((i) => i !== index)
                    : [...expandedRows, index]
                )
              }
            >
              <td>{result.basic.first_name}</td>
              <td>{result.basic.last_name}</td>
              <td>{result.number}</td>
              <td>{result.taxonomies[0].desc}</td>
              <td>{result.addresses[0].city}</td>
              <td>{result.addresses[0].state}</td>
              <td>{result.addresses[0].postal_code}</td>
            </tr>
            {expandedRows.includes(index) && (
              <tr >
                <td colSpan="7" style={{border:"solid 1px black", backgroundColor:"lightgray"}}>
                  <p>
                    <strong>Address:</strong> {result.addresses[0].address_1},{' '}
                    {result.addresses[0].address_2}, {result.addresses[0].city},{' '}
                    {result.addresses[0].state} {result.addresses[0].postal_code}
                  </p>
                  <p>
                    <strong>Phone:</strong> {result.addresses[0].telephone_number}
                  </p>
                  <p>
                    <strong>Fax:</strong> {result.addresses[0].fax_number}
                  </p>
                  <p>
                    <strong>License Number:</strong> {result.taxonomies[0].license}
                  </p>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    {responseData.length > 0 && (
        <button onClick={(event) => handleNext(event, currentPage + 1)}>Load More</button>
      )}
  </div>

)}
</div>
)}
