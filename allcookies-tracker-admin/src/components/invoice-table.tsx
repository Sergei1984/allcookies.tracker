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
import { v4 as uuidv4 } from 'uuid';

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

interface InvoiceTableProps {
  userActivity: any[];
  date: string;
  creator: any;
}

const InvoiceTable = ({
  userActivity,
  date,
  creator,
}: InvoiceTableProps): JSX.Element => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900 }}>
      <Table sx={{ maxWidth: 900 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left' colSpan={2}>
              <Typography
                sx={{
                  fontSize: '16px',
                  lineHeight: '141%',
                  letterSpacing: '0.1em',
                  color: '#7A7A7A',
                }}
              >
                ДАТА
              </Typography>
              <Typography
                sx={{
                  fontSize: '18px',
                  lineHeight: '141%',
                  letterSpacing: '0.1em',
                  color: '#4F4F4F',
                }}
              >
                {date.toUpperCase()}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align='left' colSpan={2}>
              <Typography
                sx={{
                  fontSize: '16px',
                  lineHeight: '141%',
                  letterSpacing: '0.1em',
                  color: '#7A7A7A',
                }}
              >
                МЕНЕДЖЕР
              </Typography>
              <Typography
                sx={{
                  fontSize: '18px',
                  lineHeight: '141%',
                  letterSpacing: '0.1em',
                  color: '#4F4F4F',
                }}
              >
                {String(creator.name).toUpperCase()}
              </Typography>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell align='center'>
              <Typography
                sx={{
                  fontSize: '18px',
                  lineHeight: '141%',
                  letterSpacing: '0.1em',
                  color: '#4F4F4F',
                }}
              >
                ТОЧКА
              </Typography>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Typography
                sx={{
                  fontSize: '18px',
                  lineHeight: '141%',
                  letterSpacing: '0.1em',
                  color: '#4F4F4F',
                }}
              >
                ПРОДУКТ
              </Typography>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Typography
                sx={{
                  fontSize: '18px',
                  lineHeight: '141%',
                  letterSpacing: '0.1em',
                  color: '#4F4F4F',
                }}
              >
                ОСТАТКИ
              </Typography>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Typography
                sx={{
                  fontSize: '18px',
                  lineHeight: '141%',
                  letterSpacing: '0.1em',
                  color: '#4F4F4F',
                }}
              >
                ЗАКАЗ
              </Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userActivity.length ? (
            userActivity?.map((item) => {
              return item?.products?.map((product: any, index: number) => {
                return (
                  <StyledTableRow key={uuidv4()}>
                    <StyledTableCell align='left'>
                      <Typography
                        sx={{
                          fontWeight: 'normal',
                          fontSize: '12px',
                          color: '#0C0C0C',
                        }}
                      >
                        {index === 0 && item.selling_point.title}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      <Typography
                        sx={{
                          fontWeight: 'normal',
                          fontSize: '12px',
                          color: '#0C0C0C',
                        }}
                      >
                        {product.product.title}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Typography
                        sx={{
                          fontWeight: 'normal',
                          fontSize: '12px',
                          color: '#0C0C0C',
                          lineHeight: '138.02%',
                        }}
                      >
                        {product.remaining_quantity}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Typography
                        sx={{
                          fontWeight: 'normal',
                          fontSize: '12px',
                          color: '#0C0C0C',
                          lineHeight: '138.02%',
                        }}
                      >
                        {product.order_quantity}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              });
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell align='center' colSpan={4}>
                В этот день не работал{' '}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
