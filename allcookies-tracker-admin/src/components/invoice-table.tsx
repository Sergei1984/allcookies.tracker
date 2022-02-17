import React from 'react';

import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F4F8F9',
    color: '#4F4F4F',
    border: '1px solid #DDDDDD',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: '1px solid #DDDDDD',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'FFFFFF',
    border: '1px solid #DDDDDD;',
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface InvoiceTableProps {
  invoice: any;
}

const InvoiceTable = ({ invoice }: InvoiceTableProps): JSX.Element => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900 }}>
      <Table sx={{ maxWidth: 900 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left' colSpan={2}>
              ДАТА <br /> 22 ФЕВ 2022
            </StyledTableCell>
            <StyledTableCell align='left' colSpan={2}>
              МЕНЕДЖЕР <br /> ИВАН
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align='center'>ТОЧКА</StyledTableCell>
            <StyledTableCell align='center'>ПРОДУКТ</StyledTableCell>
            <StyledTableCell align='center'>ОСТАТКИ</StyledTableCell>
            <StyledTableCell align='center'>ЗАКАЗ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align='left'>
                <Typography
                  sx={{
                    fontWeight: 'normal',
                    fontSize: '12px',
                    color: '#171717',
                  }}
                >
                  {row.calories}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Typography
                  sx={{
                    fontWeight: 'normal',
                    fontSize: '12px',
                    color: '#171717',
                  }}
                >
                  {row.fat}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Typography
                  sx={{
                    fontWeight: 'normal',
                    fontSize: '12px',
                    color: '#171717',
                    lineHeight: '138.02%',
                  }}
                >
                  {row.protein}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Typography
                  sx={{
                    fontWeight: 'normal',
                    fontSize: '12px',
                    color: '#171717',
                    lineHeight: '138.02%',
                  }}
                >
                  {row.protein}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
