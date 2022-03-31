import React from "react";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import {
  convertISOStringToLocaleDateString,
  currencyFormatter,
} from "../../utils";
import { Box } from "@mui/material";

const TableRow = styled(MuiTableRow)({
  "& td:last-child, & th:last-child": { borderRight: 0 },
});

const TableCell = styled(MuiTableCell)({
  borderBottom: "1px solid #e1b58c",
  borderRight: "1px solid #e1b58c",
});

const PrimaryText = styled("span")({
  fontFamily: "Segoe UI",
  color: "#1e6296",
  fontSize: 24,
});

const ServicePriceText = styled("span")({
  fontFamily: "Segoe UI",
  color: "#ff6060",
  fontSize: 24,
  marginLeft: 16,
});

const TimeUseText = styled("span")({
  fontFamily: "Segoe UI",
  color: "#c6a788",
  fontSize: 14,
});

const StatusText = styled("span")({
  fontFamily: "Segoe UI",
  fontSize: 20,
});

const ReservationTable = ({ data, historyTable }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <PrimaryText>#</PrimaryText>
            </TableCell>
            <TableCell sx={{ width: "50%" }}>
              <PrimaryText>Service</PrimaryText>
            </TableCell>
            <TableCell>
              <PrimaryText>Time</PrimaryText>
            </TableCell>
            <TableCell>
              <PrimaryText>Status</PrimaryText>
            </TableCell>
            <TableCell>
              <PrimaryText>Stylist</PrimaryText>
            </TableCell>
            <TableCell>
              <PrimaryText>Action</PrimaryText>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { borderBottom: 0 } }}
            >
              <TableCell align="right">
                <PrimaryText>{index + 1}</PrimaryText>
              </TableCell>
              <TableCell>
                <Box>
                  <Box display="flex" flexDirection="row">
                    <PrimaryText>{row.serviceName}</PrimaryText>
                    <ServicePriceText>
                      {currencyFormatter.format(row.price)}
                    </ServicePriceText>
                  </Box>
                  <Box display="flex" flexDirection="row">
                    <TimeUseText>{row.timeUse}</TimeUseText>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                {convertISOStringToLocaleDateString(row.timeRegister)}
              </TableCell>
              <TableCell>
                <StatusText
                  style={{
                    color:
                      String(row.status).toLowerCase() === "finish"
                        ? "#3ecf0a"
                        : "#2082c9",
                  }}
                >
                  {row.status}
                </StatusText>
              </TableCell>
              <TableCell>{row.staffName}</TableCell>
              <TableCell>
                <Box display="flex" justifyContent="center">
                  {historyTable ? (
                    <IconButton size="large">
                      <ReplayCircleFilledIcon />
                    </IconButton>
                  ) : (
                    <IconButton size="large">
                      <CancelIcon />
                    </IconButton>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReservationTable;
