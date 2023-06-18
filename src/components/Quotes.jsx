import {
    Box,
    Button,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    // Pagination,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const renderDataValue = (value) => {
    try {
        const parsedValue = JSON.parse(value);
        return <pre>{JSON.stringify(parsedValue, null, 2)}</pre>;
    } catch (error) {
        return value;
    }
};

const Quotes = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [userId, setUserId] = useState("");
    const [timeStampType, setTimeStampType] = useState("");
    const [startDate, setstartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [colBool, setColBool] = useState([]);

    const copyToClipBoard = (text) => {
        navigator.clipboard.writeText(text).then(() => console.log("fec"));
    };

    const fetchData = () => {
        const urlParams = new URLSearchParams();
        if (!!userId) urlParams.append("user_id", userId);
        if (!!timeStampType && !!startDate)
            urlParams.append(
                "startTime",
                startDate.format("YYYY-MM-DD HH:mm:ss")
            );
        if (!!timeStampType && !!endDate)
            urlParams.append("endTime", endDate.format("YYYY-MM-DD HH:mm:ss"));

        if (!!startDate && !!endDate && !!timeStampType) {
            urlParams.append("timeStamp", timeStampType);
        }

        fetch(`http://localhost/api/Quotes/getQuotes?${urlParams.toString()}`)
            .then((data) => data.json())
            .then((data) => {
                setData(data.data);
                setColBool(new Array(data.data.length).fill(false));
                console.log(data.data[0]);
            });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <TextField
                    placeholder="user id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <FormControl
                    sx={{
                        width: "25%",
                    }}
                >
                    <InputLabel id="demo-simple-select-label">
                        TimeStamp
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={timeStampType}
                        onChange={(e) => setTimeStampType(e.target.value)}
                        label="Timestamp"
                    >
                        <MenuItem value={""}>remove</MenuItem>
                        <MenuItem value={"created_time"}>Created At</MenuItem>
                        <MenuItem value={"modified_time"}>Modified At</MenuItem>
                        <MenuItem value={"updated_at"}>Updated At</MenuItem>
                    </Select>
                </FormControl>
                <DateTimePicker
                    format="DD-MM-YYYY HH:mm:ss"
                    label="Start time stamp"
                    value={startDate}
                    onChange={(e) => setstartDate(e)}
                    disabled={!timeStampType}
                    views={[
                        "year",
                        "month",
                        "day",
                        "hours",
                        "minutes",
                        "seconds",
                    ]}
                />
                <DateTimePicker
                    format="DD-MM-YYYY HH:mm:ss"
                    label="End time stamp"
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                    disabled={!timeStampType}
                    views={[
                        "year",
                        "month",
                        "day",
                        "hours",
                        "minutes",
                        "seconds",
                    ]}
                />
                <Button variant="contained" onClick={() => fetchData()}>
                    Search
                </Button>
            </Box>
            <Table sx={{ border: "1px solid", mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>User Id</TableCell>
                        <TableCell>Party Id</TableCell>
                        <TableCell>Created_time</TableCell>
                        <TableCell>Modified_time</TableCell>
                        <TableCell>Updated_at</TableCell>
                        <TableCell>in app progress status</TableCell>
                        <TableCell>view more</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((val, index) => (
                        <>
                            <TableRow>
                                <TableCell>
                                    {val["user_id"]}
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            copyToClipBoard(val["user_id"])
                                        }
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    {val["party_id"]}
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            copyToClipBoard(val["party_id"])
                                        }
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{val["created_time"]}</TableCell>
                                <TableCell>{val["modified_time"]}</TableCell>
                                <TableCell>{val["updated_at"]}</TableCell>
                                <TableCell>
                                    {val["in_progress_app_status"]}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() =>
                                            setColBool(
                                                colBool.map((col, ind) =>
                                                    ind === index ? !col : col
                                                )
                                            )
                                        }
                                    >
                                        {!colBool[index] ? (
                                            <ExpandMore />
                                        ) : (
                                            <ExpandLess />
                                        )}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                    colSpan={7}
                                >
                                    <Collapse
                                        in={colBool[index]}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Key
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Value
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data &&
                                                    Object.keys(val).map(
                                                        (key) => (
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography>
                                                                        {key}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Box
                                                                        sx={{
                                                                            maxHeight:
                                                                                "200px",
                                                                            overflow:
                                                                                "auto",
                                                                            minWidth:
                                                                                "700px",
                                                                        }}
                                                                    >
                                                                        {typeof val[
                                                                            key
                                                                        ] ===
                                                                        "string"
                                                                            ? renderDataValue(
                                                                                  val[
                                                                                      key
                                                                                  ]
                                                                              )
                                                                            : val[
                                                                                  key
                                                                              ]}
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                            </TableBody>
                                        </Table>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
            {/* <Pagination count={10} variant="outlined" shape="rounded"  /> */}
        </Box>
    );
};

export default Quotes;
