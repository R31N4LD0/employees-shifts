import { Input, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getHourString, getShiftNameByHour, getTableNumber } from "../utils/shifts";

const Shifts = () => {
  const employees = JSON.parse(localStorage.getItem("names"));
  const tables = JSON.parse(localStorage.getItem("tables"));
  const [shiftNameToMount, setShiftNameToMount] = useState();
  const [headTableHours, setHeadTableHours] = useState([]);
  const [employeesShiftLines, setEmployeesShiftLines] = useState();
  
  const shiftHoursRange = {
    morning: {
      min: 0,
      max: 8
    },
    afternoon: {
      min: 8,
      max: 16
    },
    night: {
      min: 16,
      max: 24
    }
  };

  const handleShiftPick = (event) => {
    setShiftNameToMount(event.target.value);
  };

  let mesaInit = 0;

  const handleShiftLine = (range) => {
    const elementArray = [];

    for (let i = range.min; i < range.max; i++) {
      let tableNumber = mesaInit;
      let tableNumber2 = ++mesaInit;
      let tableNumber3 = ++mesaInit;

      if (tableNumber >= tables.length) {
        mesaInit = 0;
        tableNumber = mesaInit;
        tableNumber2 = ++mesaInit;
        tableNumber3 = ++mesaInit;
      }
      if (tableNumber2 >= tables.length) {
        mesaInit = 0;
        tableNumber2 = mesaInit;
        tableNumber3 = ++mesaInit;
      }
      if (tableNumber3 >= tables.length) {
        mesaInit = 0;
        tableNumber3 = 0;
      }

      elementArray.push(tables[tableNumber], tables[tableNumber2], tables[tableNumber3]);

      ++mesaInit;
    }
    
    return elementArray;
  };

  useEffect(()=>{
    setShiftNameToMount("morning");
  },[]);

  useEffect(()=>{
    const range = shiftHoursRange[shiftNameToMount];

    if (range?.min !== undefined && range?.max && employees[shiftNameToMount] && tables?.length >= 3) {
      const elementArray = [];

      for (let i = range.min; i < range.max; i++) {
        const hourInterval = (i < 10) ? `0${i}` : i;
        const hourString = getHourString(i);

        elementArray.push(
          <th key={`${hourInterval}:00_${hourInterval}:20`}>
            {`${hourInterval}:00~${hourInterval}:20`}
          </th>
        );
        elementArray.push(
          <th key={`${hourInterval}:20_${hourInterval}:40`}>
            {`${hourInterval}:20~${hourInterval}:40`}
          </th>
        );
        elementArray.push(
          <th key={`${hourInterval}:40_${hourString}:00`}>
            {`${hourInterval}:40~${hourString}:00`}
          </th>
        );
      }
      setHeadTableHours(elementArray);

      if (
        employees !== null
        && tables !== null
        && tables.length >= 3
        && employees[shiftNameToMount].length >= 3
        && employees[shiftNameToMount] !== undefined
      ) {
        const finalEmployeeShift = {};

        employees[shiftNameToMount].forEach((employeeName, index2, arr2) => {
          const scheduleLineData = handleShiftLine(range);
          finalEmployeeShift[employeeName] = scheduleLineData; 
        });

        setEmployeesShiftLines(finalEmployeeShift);
      }
    }
  }, [shiftNameToMount]);

  return (
      (employees === null || tables === null)
        ? "You need to insert at least 3 employees and  at least 3 tables."
        : <>
          <Input.Wrapper
            label="Shift period" 
            description="Choose the desire shift."
            className="default-label"
          >
            <Input component="select" onChange={handleShiftPick} value={shiftNameToMount}>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </Input>
          </Input.Wrapper>

          <Table verticalSpacing="xs" fontSize="xs">
            <thead>
              <tr>
                <th aria-label="table" />
                {headTableHours}
              </tr>
            </thead>
            
            <tbody>
              {employeesShiftLines &&
                Object.keys(employeesShiftLines).map((employeeNameLine) => {
                  return (<tr key={`line_${employeeNameLine + Date.now()}`}>
                    <td key={`schedule_${employeeNameLine}`}>{employeeNameLine}</td>
                    {
                      employeesShiftLines[employeeNameLine].map((employeeSchedule) => {
                        return(
                          <td key={`${employeeNameLine}_${employeeSchedule}_${Date.now()}`}>
                            {employeeSchedule}
                          </td>
                        );
                      })
                    }
                  </tr>);
                })
              }
            </tbody>
          </Table>
        </>
  );
};

export default Shifts;