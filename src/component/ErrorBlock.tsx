import { Box, makeStyles, Typography } from "@material-ui/core"

export const ErrorBlock = () => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <Typography className={classes.containerTitle}> Something went wrong ! </Typography>
        </Box>
    )
}
const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 400,
        margin: '50px auto',
        borderRadius: 20,
        backgroundColor: '#c20505',
    },

    containerTitle: {
        fontSize: 20,
        fontWeight: 500,
        color: "white",
    },
}));





