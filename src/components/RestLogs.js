import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TableCell, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";

export default function Restlogs() {
    const [formData, setFormData] = useState({});
    const [startdate, setstartdate] = useState("");
    const [enddate, setenddate] = useState("");
    const [tags, settags] = React.useState([]);
    const [output, setoutput] = useState([]);
    const [Empty, setEmpty] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        "Params",
        "Response",
        "rtime",
        "user_converted_time",
        "headers_passed",
        "response_code",
    ];
    function handelstartDate(date) {
        setstartdate(date.format("YYYY-MM-DD HH:mm:ss"));
    }
    function handelendDate(date) {
        setenddate(date.format("YYYY-MM-DD HH:mm:ss"));
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        settags(typeof value === "string" ? value.split(",") : value);
    };
    function handleSubmit(e) {
        setEmpty(false);
        e.preventDefault();
        console.log(startdate, enddate);
        console.log(tags);
        formData["tags"] = tags;
        formData["startDate"] = startdate;
        formData["endDate"] = enddate;
        console.log(formData);
        var url;
        if (formData["userid"]) {
            url = `http://localhost/api/Restlogsapi/getUsers?userId=${encodeURIComponent(
                formData.userid
            )}`;
        }
        if (formData["uri"] && !formData["userid"]) {
            url = `http://localhost/api/Restlogsapi/getUsers?uri=${encodeURIComponent(
                formData.uri
            )}`;
        }
        if (formData["tags"] && tags.length > 0) {
            const tagsParam = tags
                .map((tag) => `${encodeURIComponent(tag)}`)
                .join(",");
            url += `&tags=${tagsParam}`;
        }
        if (formData["startDate"]) {
            url += `&startdate=${encodeURIComponent(startdate)}`;
        }
        if (formData["endDate"]) {
            url += `&enddate=${encodeURIComponent(enddate)}`;
        }
        if (formData["uri"] && formData["userid"]) {
            url += `&uri=${encodeURIComponent(formData.uri)}`;
        }
        console.log(url);
        fetch(url)
            .then((response) => {
                var res = response.json();
                console.log(res);
                return res;
            })
            .then((response) => {
                console.log(response);
                if (response.length === 0) {
                    setEmpty(true);
                }
                setoutput(response);
                return response;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <>
            <DemoContainer components={["DateTimePicker"]}>
                <div
                    style={{
                        display: "flex",
                        gap: "50px",
                        justifyContent: "center",
                    }}
                >
                    <TextField
                        label="User ID"
                        sx={{ width: "300px" }}
                        name="userid"
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="URI"
                        sx={{ width: "300px" }}
                        name="uri"
                        onChange={handleInputChange}
                    />
                    <FormControl>
                        <InputLabel id="demo-multiple-checkbox-label">
                            Tag
                        </InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple="multiple"
                            value={tags}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                            sx={{ width: "300px" }}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox
                                        checked={tags.indexOf(name) > -1}
                                    />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </DemoContainer>
            <DemoContainer components={["DateTimePicker"]} sx={{ m: 2 }}>
                <div
                    style={{
                        display: "flex",
                        gap: "50px",
                        justifyContent: "center",
                    }}
                >
                    <TextField
                        label="IP address"
                        sx={{ width: "300px" }}
                        name="ipaddress"
                        onChange={handleInputChange}
                    />
                    <DateTimePicker
                        label="Start date"
                        sx={{ width: "300px" }}
                        name="startdate"
                        onChange={(date) => handelstartDate(date)}
                        required
                    />
                    <DateTimePicker
                        label="End date"
                        sx={{ width: "300px" }}
                        name="enddate"
                        onChange={(date) => handelendDate(date)}
                        required
                    />
                </div>
            </DemoContainer>
            <Button
                variant="contained"
                size="large"
                sx={{ width: "300px", m: 2 }}
                onClick={(e) => handleSubmit(e)}
            >
                Submit
            </Button>
            {Empty ? (
                <div>No Results found</div>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            {output.length > 0 &&
                                Object.keys(output[0]).map((item) => {
                                    return (
                                        <TableCell
                                            style={{ textAlign: "center" }}
                                        >
                                            {item && item.toUpperCase()}
                                        </TableCell>
                                    );
                                })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {output.length > 0 &&
                            output.map((item, key) => {
                                if (key > 1) {
                                    return (
                                        <TableRow>
                                            <TableCell
                                                style={{ textAlign: "center" }}
                                            >
                                                {item.user_id}
                                            </TableCell>
                                            {item.params ? (
                                                <Table>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Auth ID :{" "}
                                                        {item.params.auth_id}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        UID : {item.params.uid}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Page Seq No :{" "}
                                                        {
                                                            item.params
                                                                .page_sequence_number
                                                        }
                                                    </TableCell>
                                                </Table>
                                            ) : null}
                                            {item.uri && (
                                                <TableCell
                                                    style={{
                                                        textAlign: " center",
                                                    }}
                                                >
                                                    {item.uri}
                                                </TableCell>
                                            )}
                                            <TableCell
                                                style={{ textAlign: "center" }}
                                            >
                                                {item.method}
                                            </TableCell>
                                            <TableCell
                                                style={{ textAlign: "center" }}
                                            >
                                                {item.questions.question_text}
                                            </TableCell>
                                            {item.rtime && (
                                                <TableCell
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item.rtime}
                                                </TableCell>
                                            )}
                                            {item.user_converted_time && (
                                                <TableCell
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item.user_converted_time}
                                                </TableCell>
                                            )}
                                            {item.response_code && (
                                                <TableCell
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item.response_code}
                                                </TableCell>
                                            )}
                                            {item.headers_passed && (
                                                <Table>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Browser :{" "}
                                                        {
                                                            item.headers_passed
                                                                .Browser
                                                        }
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Content-Type :{" "}
                                                        {
                                                            item.headers_passed[
                                                                "Content-Type"
                                                            ]
                                                        }
                                                    </TableCell>
                                                </Table>
                                            )}
                                            {item.ip_address && (
                                                <TableCell
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item["ip_address"]}
                                                </TableCell>
                                            )}
                                            {item.response}
                                        </TableRow>
                                    );
                                }
                            })}
                    </TableBody>
                </Table>
            )}
        </>
    );
}
