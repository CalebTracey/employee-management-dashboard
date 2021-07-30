import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmployeeDetailsCard from './EmployeeDetailsCard';

const EmployeeDetails = () => {
  const employee = useSelector((state) => state.employees.employeeSelected);
  const teams = useSelector((state) => state.teams.teamsData);

  console.log(employee);

  return !employee ? (
    <Redirect to="/" />
  ) : (
    <div style={{ marginRight: '10%', marginLeft: '10%' }}>
      <EmployeeDetailsCard employee={employee} teams={teams} />
    </div>
  );
};

export default EmployeeDetails;
