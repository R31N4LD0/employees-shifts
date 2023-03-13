const handleSaveEmployee = (employeeData, callbackFn) => {
  const savedNames = JSON.parse(localStorage.getItem("names"))
    || {"morning":[],"afternoon":[],"night":[]};

  if (employeeData.name !== "") {
    localStorage.setItem("names", JSON.stringify({
      ...savedNames,
      [employeeData.shift]: [...savedNames[employeeData.shift], employeeData.name]
    }));

    callbackFn(JSON.parse(localStorage.getItem("names")));
  }
};

const handleDeleteEmployee = (employeeData, callbackFn) => {
  const savedNames = JSON.parse(localStorage.getItem("names"));

  if (employeeData.name !== "") {
    const filteredNames = savedNames[employeeData.shift].filter((itemStorage, indexStorage) => {
      return employeeData.index !== indexStorage && itemStorage !== employeeData.name;
    });

    localStorage.setItem("names", JSON.stringify({
      ...savedNames,
      [employeeData.shift]: [...filteredNames]
    }));

    callbackFn(JSON.parse(localStorage.getItem("names")));
  }
};

const handleSaveEditedName = (employeeData, callbackFn) => {
  const savedNames = JSON.parse(localStorage.getItem("names"));
  
  const newShiftList = savedNames[employeeData.shift].map((item, index) => {
    return index === employeeData.index ? employeeData.name : item;
  });
  const newEmployeeList = {
    ...savedNames,
    [employeeData.shift]: newShiftList
  };

  localStorage.setItem("names", JSON.stringify(newEmployeeList));

  callbackFn(newEmployeeList);
};

const handleSaveTable = (tableName, callbackFn) => {
  const savedTables = JSON.parse(localStorage.getItem("tables"))
    || [];

  if (tableName !== "") {
    localStorage.setItem("tables", JSON.stringify([
      ...savedTables,
      tableName
    ]));

    callbackFn(JSON.parse(localStorage.getItem("tables")));
  }
};

const handleDeleteTable = (tableIndex, callbackFn) => {
  const savedTables = JSON.parse(localStorage.getItem("tables"));

  if (tableIndex >= 0) {
    localStorage.setItem("tables", JSON.stringify(
      savedTables.filter((item, index) => index !== tableIndex)
    ));

    callbackFn(JSON.parse(localStorage.getItem("tables")));
  }
};

const handleSaveEditedTable = (tableData, callbackFn) => {
  const savedTables = JSON.parse(localStorage.getItem("tables"));

  const newTableList = savedTables.map((item, index) => {
    return index === tableData.index ? tableData.name : item;
  });

  localStorage.setItem("tables", JSON.stringify(newTableList));
  callbackFn(newTableList);
};

export {
  handleSaveEmployee,
  handleDeleteEmployee,
  handleSaveEditedName,
  handleSaveTable,
  handleDeleteTable,
  handleSaveEditedTable
};