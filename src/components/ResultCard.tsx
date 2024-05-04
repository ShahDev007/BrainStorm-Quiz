import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AnswerObject } from "../App";

type ResultCardProps = {
  data: AnswerObject[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  console.log("Finaldata", data);

  return (
    <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell align="right">Correct Answer</StyledTableCell>
            <StyledTableCell align="right">Your Answer</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <StyledTableRow key={user.question}>
              <StyledTableCell component="th" scope="row" dangerouslySetInnerHTML={{ __html: user.question }}/>
              <StyledTableCell align="right" dangerouslySetInnerHTML={{ __html: user.answer }}/>
              <StyledTableCell align="right" dangerouslySetInnerHTML={{ __html: user.correctAnswer }}/>
              <StyledTableCell align="right" dangerouslySetInnerHTML={{ __html: user.correct? "True" : "False" }}/>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
