import {useCurrencyStore} from "../store/store"
import React, {useCallback, useMemo, useState} from "react"
import {Box, Button, makeStyles, TextField} from "@material-ui/core"
import {inputValidations, isWithinRange} from "../helpers/helpers"
import {CurrencyData, CurrencyStore} from "../types/types"
export const EditableTableRows = ({ index, type }: { index: number, type: 'buy' | 'sale' }) => {
    const classes = useStyles()
    const { currencyData, updateCurrency }: CurrencyStore = useCurrencyStore()
    const [editableValues, setEditableValues] = useState(
        currencyData.map((row: CurrencyData) => ({
            buy: row.buy,
            sale: row.sale
        }))
    )
    const initialValue = currencyData.map((row: CurrencyData) => ({
        buy: row.buy,
        sale: row.sale
    }))
    const [changedRows, setChangedRows] = useState(
        currencyData.map(() => ({ buy: false, sale: false }))
    )

    const handleUpdate = (index: number, field: 'buy' | 'sale', value: {buy: number, sale: number}[]) => {
        const newValue = value[index][field]
        updateCurrency(index, field, newValue)
        setChangedRows((prevValues) => {
            const newValues = [...prevValues]
            newValues[index][field] = false
            return newValues
        })
    }

    const handleInputChange = (index: number, field: 'buy' | 'sale', inputValue: number) => {
        const newValues = [...editableValues]
        newValues[index][field] = inputValue
        setEditableValues(newValues)

        setChangedRows((prevValues) => {
            const newValues = [...prevValues]
            newValues[index][field] = true
            return newValues
        })
    }

    const handleCancel = (index: number, field: 'buy' | 'sale') => {
        setEditableValues((prevValues) => {
            const newValues = [...prevValues]
            newValues[index][field] = currencyData[index][field]
            return newValues
        })

        setChangedRows((prevValues) => {
            const newValues = [...prevValues]
            newValues[index][field] = false
            return newValues
        })
    }

    return (
        <Box className={classes.changedInputBox}>
            <TextField
                variant="standard"
                type={'number'}
                className={classes.fieldInput}
                value={editableValues[index][type]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = inputValidations(e.target.value)
                    handleInputChange(index, type, inputValue);
                }}
            />
            {changedRows[index][type] && (
                <Box className={classes.settingsBtn}>
                    <Button
                        disabled={isWithinRange(initialValue[index][type], editableValues[index][type])}
                        className={classes.saveBtn}
                        onClick={() => handleUpdate(index, type, editableValues)}
                    >
                        Save
                    </Button>
                    <Button className={classes.cancelBtn} onClick={() => handleCancel(index, type)}>
                        Cancel
                    </Button>
                </Box>
            )}
        </Box>
    )
};
const useStyles = makeStyles(() => ({
    fieldInput: {
        '& .MuiInputBase-input': {
            '&:focus-visible': {
                border: 'none',
            },
        },
        '& .MuiInput-underline': {
            '&:before': {
                border: 'none',
            },
        },
    },
    changedInputBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        width: '100%',
    },
    saveBtn: {
        padding: '3px 8px',
        backgroundColor: '#168050',
        color: '#fff',

        fontSize: 14,
        fontWeight: 400,
        '&:hover': {
            backgroundColor: '#2eb27b',
        },
        '&:disabled': {
            backgroundColor: '#087749',
        },
    },
    cancelBtn: {
        padding: '3px 5px',
        backgroundColor: '#e1293f',
        color: '#fff',

        fontSize: 12,
        '&:hover': {
            backgroundColor: '#692525',
        },
    },
    settingsBtn: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    }
}));
