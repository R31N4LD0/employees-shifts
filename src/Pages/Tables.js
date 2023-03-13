import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, Input, List, ThemeIcon } from "@mantine/core";
import { IconCards } from "@tabler/icons-react";
import { handleSaveTable, handleDeleteTable, handleSaveEditedTable } from "../utils/actionButtons";

const Tables = () => {
  const tableRef = useRef();
  const [table, setTable] = useState("");
  const [isEdit, setIsEdit] = useState([false, -1]);
  const [tablesList, setTablesList] = useState(JSON.parse(localStorage.getItem("tables")));

  const handleChangeName = (event) => {
    setTable(event.target.value);
  };

  const handleEditTable = (tableName, tableIndex) => {
    setTable(tableName);
    setIsEdit([true, tableIndex]);

    tableRef.current.focus();
  };

  return (
    <Grid>
      <Grid.Col>
        <Input.Wrapper
          id="input-table"
          label="Table description"
          description="Press enter to save."
        >
          <Input
            ref={tableRef}
            id="input-table"
            placeholder="Enter the new Table Description"
            value={table}
            onChange={handleChangeName}
            onKeyUp={(e) => {
              if (e.key === "Escape") {
                setTable("");
              } else if (e.key === "Enter") {
                if (isEdit[0]) {
                  handleSaveEditedTable({name: e.target.value, index: isEdit[1]}, setTablesList);
                  setIsEdit([false, -1]);
                  tableRef.current.focus();
                } else {
                  handleSaveTable(e.target.value, setTablesList);
                }

                setTable("");
              }
            }}
          />
        </Input.Wrapper>

        {
          tablesList &&
          (
            <List
              icon={
                <ThemeIcon color="green" size={24} radius="xl">
                  <IconCards size="1rem" />
                </ThemeIcon>
              }
            >
            {
              tablesList.map((tableName, tableIndex) => {
                return (
                  <List.Item key={`table_${tableName}_tableIndex`}>
                    <span>{tableIndex} - {tableName}</span>

                    <Button
                      color="violet"
                      radius="xl"
                      size="xs"
                      type="button"
                      className="events-item"
                      onClick={() => {
                        handleDeleteTable(tableIndex, setTablesList);
                        setIsEdit([false, -1]);
                        setTable("");
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
                        handleEditTable(tableName, tableIndex);
                      }}
                    >
                      Edit
                    </Button>
                  </List.Item>
                );
              })
            }
            </List>
          )
        }
      </Grid.Col>
    </Grid>
  );
};

export default Tables;