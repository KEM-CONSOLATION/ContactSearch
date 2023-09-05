// import React, { useState } from "react";
// import Table from "react-bootstrap/Table";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { data } from "./data.js";

// function App() {
//   const [contacts, setContacts] = useState(data);
//   const [search, setSearch] = useState("");

//   // const sortName = () => {
//   //   setContacts(
//   //     data.sort((a, b) => {
//   //       return a.first_name.toLowerCase() < a.first_name.toLowerCase()
//   //         ? -1
//   //         : a.first_name.toLowerCase() > a.first_name.toLowerCase()
//   //         ? 1
//   //         : 0;
//   //     })
//   //   );
//   // };

//   return (
//     <div>
//       <Container>
//         <h1 className="text-center mt-4">Contact Keeper</h1>
//         <Form>
//           <InputGroup className="my-3">
//             {/* onChange for search */}
//             <Form.Control
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search contacts"
//             />
//           </InputGroup>
//         </Form>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data
//               .filter((item) => {
//                 return search.toLowerCase() === ""
//                   ? item
//                   : item.phone.toLowerCase().includes(search);
//               })
//               .map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.first_name}</td>
//                   <td>{item.last_name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.phone}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "./data.js";

function App() {
  const itemsPerPage = 10; // Number of items to display per page
  const [contacts, setContacts] = useState(data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredContacts = data.filter((item) => {
    return search.toLowerCase() === ""
      ? true
      : item.phone.toLowerCase().includes(search);
  });

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedContacts = filteredContacts.slice(startIndex, endIndex);

    return displayedContacts.map((item, index) => (
      <tr key={index}>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
      </tr>
    ));
  };

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">Contact Keeper</h1>
        <Form>
          <InputGroup className="my-3">
            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts"
            />
          </InputGroup>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </Table>
        <div className="text-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn btn-sm mx-1 ${
                currentPage === index + 1 ? "btn-primary" : "btn-light"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
