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
import { Box, Tooltip } from "@mui/material";

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

const HeaderText = styled(PrimaryText)({
  fontSize: 28,
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
  fontSize: 24,
});

const ReservationTable = ({ data, historyTable }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <HeaderText>#</HeaderText>
            </TableCell>
            <TableCell sx={{ width: "40%" }}>
              <HeaderText>Service</HeaderText>
            </TableCell>
            <TableCell>
              <HeaderText>Time</HeaderText>
            </TableCell>
            <TableCell>
              <HeaderText>Status</HeaderText>
            </TableCell>
            <TableCell>
              <HeaderText>Stylist</HeaderText>
            </TableCell>
            <TableCell>
              <HeaderText>Action</HeaderText>
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
                <PrimaryText>
                  {convertISOStringToLocaleDateString(row.timeRegister)}
                </PrimaryText>
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
              <TableCell>
                <PrimaryText>{row.staffName}</PrimaryText>
              </TableCell>
              <TableCell>
                <Box display="flex" justifyContent="center">
                  {historyTable ? (
                    <Tooltip title="Make another reservation">
                      <IconButton size="large">
                        <ReplayCircleFilledIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Cancel reservation">
                      <IconButton size="large">
                        <CancelIcon fontSize="large" />
                      </IconButton>
                    </Tooltip>
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
