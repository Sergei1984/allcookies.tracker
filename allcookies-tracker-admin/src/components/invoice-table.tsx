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
  calories: string,
  fat: number,
  protein: number
) {
  return { name, calories, fat, protein };
}

const rows = [
  createData('Барабашово', 'Ежик', 6, 24),
  createData('Ice cream sandwich', 'Шоколапки', 9, 37),
  createData('Eclair', 'Шоколапки', 262, 24),
  createData('Cupcake', 'Ежик', 305, 67),
  createData('Gingerbread', 'Бисквитик', 16, 49),
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
                  {row.name}
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
                  {row.calories}
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
