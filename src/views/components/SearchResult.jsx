import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function SearchResult(props) {
  const searchResult = props.result;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Org nr</TableCell>
            <TableCell align="right">Bedriftsnavn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResult.map((result) => (
            <TableRow key={result.organizationNumber}>
              <TableCell component="th" scope="row">
                {result.organizationNumber}
              </TableCell>
              <TableCell align="right">{result.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
