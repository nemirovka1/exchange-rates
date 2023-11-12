import React, {useCallback, useMemo, useState } from "react"
import { Box, makeStyles, MenuItem, Select, TextField, Button } from "@material-ui/core"
import { useCurrencyStore } from "../store/store"
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import {currencies} from "../API/api"
import {inputValidations} from "../helpers/helpers";

export const CurrencyConverter = () => {
    const classes = useStyles()
    const { currencyData } = useCurrencyStore()
    const [inputValue, setInputValue] = useState<number>()
    const [selectedFromCurrency, setSelectedFromCurrency] = useState('UAH')
    const [selectedToCurrency, setSelectedToCurrency] = useState('CHF')
    const [conversionResult, setConversionResult] = useState<number>()
    const [swag, setSwag] = useState(false)

    const handleConversion = useCallback(() => {
        if (!selectedFromCurrency || !selectedToCurrency) return null;

        const value = currencyData.find(el => el.ccy === selectedFromCurrency || el.ccy === selectedToCurrency);
        if (value && inputValue) {
            const rate = swag ? value.sale : value.buy;
            const result = (inputValue * rate).toFixed(2);
            setConversionResult(parseFloat(result));
        }
    }, [selectedFromCurrency, selectedToCurrency, inputValue, swag, currencyData]);

    const handleSwap = useCallback(() => {
        setInputValue(conversionResult);

        setSwag(prevSwag => !prevSwag);

        const temp = selectedFromCurrency;
        setSelectedFromCurrency(selectedToCurrency);
        setSelectedToCurrency(temp);
    }, [selectedFromCurrency, selectedToCurrency, conversionResult]);

    return (
        <Box className={classes.container}>
           <Box className={classes.currencyBox}>
               <Box className={classes.selectBox}>
                   <TextField
                       value={inputValue}
                       id="change-input"
                       label={'Change'}
                       variant="standard"
                       type="number"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           const inputValue = inputValidations(e.target.value);
                           setInputValue(inputValue)
                       }}
                   />
                   <Select value={selectedFromCurrency} onChange={(e: React.ChangeEvent<{ value: unknown }>) => setSelectedFromCurrency(e.target.value as string)}>
                       {currencies.map((el) => (
                           <MenuItem key={el} value={el}>
                               {el}
                           </MenuItem>
                       ))}
                   </Select>
               </Box>
               <Box className={classes.swapBox}>
                   <Button onClick={handleSwap} data-testid='swap-button'>
                       <SwapHorizIcon />
                   </Button>
               </Box>
               <Box className={classes.selectBox}>
                   <TextField
                       value={conversionResult}
                       label={'Get'}
                       id="get-input"
                       variant="standard"
                       type="text"
                       InputProps={{
                           readOnly: true,
                       }}
                   />
                   <Select data-testid='select-to' value={selectedToCurrency} onChange={(e: React.ChangeEvent<{ value: unknown }>) => setSelectedToCurrency(e.target.value as string)}>
                       {currencies.map((el) => (
                           <MenuItem key={el} value={el}>
                               {el}
                           </MenuItem>
                       ))}
                   </Select>
               </Box>
           </Box>
            <Button className={classes.convertBtn} onClick={handleConversion} data-testid="convert-button">Convert</Button>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto',
        gap: 40,
        marginTop: 70,
        '@media (max-width: 1000px)': {
            marginTop: 50,
            width: 400,
        },
    },
    currencyBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        '@media (max-width: 800px)': {
            flexDirection: 'column',
            gap: 10,
        },
    },
    selectBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
    },
    swapBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    convertBtn: {
        padding: '3px 8px',
        backgroundColor: '#168050',
        color: '#fff',

        fontSize: 14,
        fontWeight: 400,
        '&:hover': {
            backgroundColor: '#2eb27b',
        },
    }
}));
