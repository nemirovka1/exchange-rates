import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles,
    Box,
} from '@material-ui/core'
import React from 'react'
import { useCurrencyStore } from '../store/store'
import { CurrencyData } from '../types/types'
import {EditableTableRows} from "./EditableTableRows"

export const ExchangeRateTable = () => {
    const classes = useStyles()
    const { currencyData } = useCurrencyStore()

    return (
        <Box className={classes.container}>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell className={classes.tableTitle}>Currency / Current Date</TableCell>
                            <TableCell className={classes.tableTitle} align="right">Buy</TableCell>
                            <TableCell className={classes.tableTitle} align="right">Sale</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currencyData.map((row: CurrencyData, index: number) => (
                            <TableRow key={row.ccy} className={index % 2 === 0 ? classes.evenRow : classes.oddRow}>
                                <TableCell component="th" scope="row" className={classes.currencyTitle}>
                                    {row.ccy} / {row.base_ccy}
                                </TableCell>
                                <TableCell>
                                    <EditableTableRows index={index} type={'buy'}/>
                                </TableCell>
                                <TableCell >
                                    <EditableTableRows index={index} type={'sale'}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableContainer: {
        maxWidth: 950,
        borderRadius: 10,
        boxShadow: '12px 5px 5px #9B9797FF',
        margin: 'auto',
        '& .MuiTableCell-root': {
            padding: 10,
            textAlign: 'start',
        }
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 800,
    },
    currencyTitle: {
        fontSize: 18,
        fontWeight: 400,
    },
    tableRow: {
        backgroundColor: '#9bd4f5',
    },
    evenRow: {
        backgroundColor: 'rgb(245,245,245)',
    },
    oddRow: {
        backgroundColor: '#bcdef5',
    },
}));

