import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import Title from "./Title";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function MeasurementsTable({
  data,
  deleteItemById,
  selectItemId,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const deleteItem = (id) => {
    console.log(id);
    deleteItemById(id);
  };

  const selectItem = (id) => {
    selectItemId(id);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <Title>Measurements table</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Abdomen size</TableCell>
            <TableCell>Chest size</TableCell>
            <TableCell>Left hand size</TableCell>
            <TableCell>Right hand size</TableCell>
            <TableCell>Left leg size</TableCell>
            <TableCell>Right leg size</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.size !== 0 &&
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.abdomenSize}</TableCell>
                  <TableCell>{row.chestSize}</TableCell>
                  <TableCell>{row.leftHandSize}</TableCell>
                  <TableCell>{row.rightHandSize}</TableCell>
                  <TableCell>{row.leftLegSize}</TableCell>
                  <TableCell>{row.rightLegSize}</TableCell>
                  <TableCell>
                    <EditIcon
                      onClick={selectItem.bind(this, row.id)}
                      color="secondary"
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteForeverIcon
                      onClick={deleteItem.bind(this, row.id)}
                      color="secondary"
                    />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
