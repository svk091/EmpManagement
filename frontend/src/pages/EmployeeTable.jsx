import DeleteEmployee from "../components/DeleteEmployee";
import EditEmployee from "../components/EditEmployee";

const Th = ({ children }) => <th className="px-2 py-1 border-2">{children}</th>;
const Td = ({ children }) => <td className="px-2 py-1 border-2">{children}</td>;

const EmployeeTable = ({ employees, setEmployees }) => {
  if (!Array.isArray(employees)) {
    return <div>Error: Employees data is not in a valid format.</div>;
  }
  return <>
    <table className="table-auto w-full">
      <thead>
        <tr>
          <Th>Unique Id</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Mobile No</Th>
          <Th>Designation</Th>
          <Th>Gender</Th>
          <Th>Course</Th>
          <Th>Create Date</Th>
          <Th>Action</Th>
        </tr>
      </thead>
      <tbody>
        {
          employees.map((employee) => (
            <tr key={employee._id}>
              <Td>{employee._id}</Td>
              <Td>{employee.name}</Td>
              <Td>{employee.email}</Td>
              <Td>{employee.mobile}</Td>
              <Td>{employee.designation}</Td>
              <Td>{employee.gender}</Td>
              <Td>{employee.course}</Td>
              <Td>{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).format(new Date(employee.createdDate))}</Td>
              <Td>
                <div className="flex space-x-2 items-center">
                  <EditEmployee id={employee._id} />
                  <DeleteEmployee setEmployees={setEmployees} id={employee._id} />
                </div>
              </Td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </>
};

export default EmployeeTable;