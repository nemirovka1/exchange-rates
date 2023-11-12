import useSWR from "swr";
import { API_ENDPOINT, fetcher } from "../API/api";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { ExchangeRateTable } from "./ExchangeRateTable";
import { CurrencyConverter } from "./CurrencyConverter";
import { ErrorBlock } from "./ErrorBlock";

export function MainPage() {
    const classes = useStyles();
    const { data, error } = useSWR(API_ENDPOINT, fetcher);

    if (error) {
        localStorage.removeItem("requestCounter");
        return <ErrorBlock />;
    }

    if (!data) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box className={classes.container}>
            <Typography className={classes.containerTitle}>Exchange Rates</Typography>
            <Box className={classes.content}>
                <ExchangeRateTable />
                <CurrencyConverter />
            </Box>
            <footer className={classes.footer}>
                <Typography className={classes.footerTitle}>
                    2023 all right reserved
                </Typography>
            </footer>
        </Box>
    );
}

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    },
    containerTitle: {
        fontSize: 20,
        fontWeight: 500,
        textAlign: "center",
        margin: "10px 0",
    },
    content: {
        overflow: 'hidden',
        borderTop: "1px solid black",
        flex: 1,
        padding: 10,
    },
    footer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: "1px solid black",
        height: 100,
    },
    footerTitle: {
        fontSize: "1rem",
    },
}));
