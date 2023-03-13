import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, Group, Input, List, ThemeIcon, Title } from "@mantine/core";
import { IconMoon, IconSunrise, IconSunHigh } from "@tabler/icons-react";
import { handleDeleteEmployee, handleSaveEditedName, handleSaveEmployee } from "../utils/actionButtons";

const Employees = () => {
  const nameRef = useRef();
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState([false, -1]);
  const [shift, setShift] = useState("morning");
  const [namesList, setNamesList] = useState(JSON.parse(localStorage.getItem("names")));

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleShiftPick = (event) =>{
    setShift(event.target.value);
    nameRef.current.focus();
  };

  const handleEditEmployee = (employeeData, callbackFn) =>{
    setIsEdit([true, employeeData]);
    nameRef.current.focus();
    setName(employeeData.name);
    setShift(employeeData.shift);
  };

  return (
    <Grid>
      <Grid.Col xs={12}>
        <Grid>
          <Grid.Col xs={6}>
            <Input.Wrapper
              label="Shift period" 
              description="Choose the desire shift."
              className="default-label"
            >
              <Input disabled={isEdit[0]} component="select" onChange={handleShiftPick} value={shift}>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="night">Night</option>
              </Input>
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col xs={6}>
            <Input.Wrapper
              id="input-name"
              label="Employee name"
              description="Press enter to save."
            >
              <Input
                ref={nameRef}
                id="input-name"
                placeholder="Enter the new Employee Name"
                value={name}
                onChange={handleChangeName}
                onKeyUp={(e) => {
                  if (e.key === "Escape") {
                    setName("");
                  } else if (e.key === "Enter") {
                    if (isEdit[0]) {
                      handleSaveEditedName({
                        index: isEdit[1].index,
                        name: e.target.value,
                        shift: isEdit[1].shift
                      }, setNamesList);

                      setIsEdit([false, -1]);
                      nameRef.current.focus();
                    } else {
                      handleSaveEmployee({ name: e.target.value, shift}, setNamesList);
                    }

                    setName("");
                  }

                }}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>

        {
          namesList &&
          (
              Object.keys(namesList).map((nameShift) => {
                return (
                  <React.Fragment key={`list_${nameShift}`}>
                    <Title order={1} size="h4">{nameShift}</Title>

                    <List
                      key={`employees_${nameShift}`}
                      icon={
                        (nameShift === "night" && <ThemeIcon color="indigo" size={24} radius="xl">
                          <IconMoon size="1rem" />
                        </ThemeIcon>)
                        || (nameShift === "afternoon" && <ThemeIcon color="yellow" size={24} radius="xl">
                          <IconSunHigh size="1rem" />
                        </ThemeIcon>)
                        || (nameShift === "morning" && <ThemeIcon color="teal" size={24} radius="xl">
                          <IconSunrise size="1rem" />
                        </ThemeIcon>)
                      }
                    >
                    {namesList[nameShift] &&
                      namesList[nameShift].map((nameEmployee, indexEmployee) => {
                        return (
                          <List.Item key={`employee_${nameShift}_${nameEmployee}`} className="employee-item">
                              <span className="employee-name">{indexEmployee} - {nameEmployee}</span>

                              {/* <Group> */}
                              <Button
                                color="violet"
                                radius="xl"
                                size="xs"
                                type="button"
                                className="events-item"
                                onClick={() => {
                                  handleDeleteEmployee({
                                    index: indexEmployee,
                                    name: nameEmployee,
                                    shift: nameShift
                                  }, setNamesList);
                                  
                                  setIsEdit([false, -1]);
                                  setName("");
                                }}
                              >
                                Delete
                              </Button>
          
                              <Button
                                color="teal"
                                radius="xl"
                                size="xs"
                                type="button"
                                className="events-item"
                                onClick={() => {
                                  handleEditEmployee({
                                    index: indexEmployee,
                                    name: nameEmployee,
                                    shift: nameShift
                                  }, setNamesList);
                                }}
                              >
                                Edit
                              </Button>
                              {/* </Group> */}
                          </List.Item>
                        );
                      })
                    }
                    </List>
                  </React.Fragment>
                );
              })
          )
        }
      </Grid.Col>
    </Grid>
  );
};

export default Employees;