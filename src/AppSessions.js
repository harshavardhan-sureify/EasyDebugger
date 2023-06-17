import {React,useState} from 'react'
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TableContainer from "@mui/material/TableContainer";
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";


function AppSessions() {
     const [data, setData] = useState({});  
     const [uid,setUid] = useState("");
     const [sid, setSid] = useState("");
     const [timeStampType, setTimeStampType] = useState("");
     const [startDate, setstartDate] = useState(null);
     const [endDate, setEndDate] = useState(null);
     

     const handleUid = (event) =>{
        setUid(event.target.value);
     };
     const handleSid = (event) => {
        setSid(event.target.value);
      };

      function handleStartTime(date){
        setstartDate(date.format("YYYY-MM-DD HH:mm:ss"));
      }

      function handleEndTime(date) {
        setEndDate(date.format("YYYY-MM-DD HH:mm:ss"));
      }

     const fetchData = async () => {
     const params = new URLSearchParams();
        if(uid.length!==0){
            params.append("uid",uid);
        }
        if(sid.length!==0){
            // console.log(sid);
            params.append("session_id",sid);
        }
        if(timeStampType.length!=0)
        params.append("timeStamp",timeStampType);
        if(startDate!=null)
        params.append("startTime",startDate);
        if(endDate !=null)
        params.append("endTime",endDate);
        console.log(params.toString().replace("%E2%80%8B", ""));
       try {
         const response = await fetch(
           "http://localhost/api/Session/session?" +
             params.toString().replace("%E2%80%8B", "")
         );
         const jsonData = await response.json();
         console.log(jsonData.data);
         console.log(data);
         setData(jsonData.data);
       } catch (error) {
         console.log("Error:", error);
       }
     };
  return (
    <>
      <TextField
        id="outlined-basic"
        label="uid"
        variant="outlined"
        value={uid}
        onChange={handleUid}
      />
      <br></br>
      <br></br>
      <TextField
        id="outlined-basic"
        label="session_id"
        variant="outlined"
        value={sid}
        onChange={handleSid}
      />
      <br></br>
      <br></br>
      <br></br>
      <FormControl
        sx={{
          width: "25%",
        }}
      >
        <InputLabel id="demo-simple-select-label">TimeStamp</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeStampType}
          onChange={(e) => setTimeStampType(e.target.value)}
          label="Timestamp"
        >
          <MenuItem value={"created_time"}>Created Time</MenuItem>
          <MenuItem value={"modified_time"}>Modified Time</MenuItem>
        </Select>
      </FormControl>
      <DateTimePicker
        format="DD-MM-YYYY HH:mm:ss"
        label="Start time stamp"
        value={startDate}
        onChange={(date) => handleStartTime(date)}
        disabled={!timeStampType}
        views={["year", "month", "day", "hours", "minutes", "seconds"]}
      />
      <DateTimePicker
        format="DD-MM-YYYY HH:mm:ss"
        label="End time stamp"
        value={endDate}
        onChange={(date) => handleEndTime(date)}
        disabled={!timeStampType}
        views={["year", "month", "day", "hours", "minutes", "seconds"]}
      />
      <br></br>
      <br></br>
      <Button variant="contained" type="submit" onClick={() => fetchData()}>
        Submit
      </Button>
      <br></br>
      {/* {JSON.stringify(data)} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">user_id</TableCell>
              <TableCell align="right">uid</TableCell>
              <TableCell align="right">sesssion_id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>  
                {data[0]!=null?
                <>
              <TableCell align='right'>{data[0].user_id}</TableCell>
              <TableCell align='right'>{data[0].uid}</TableCell>
              <TableCell align='right'>{data[0].session_id}</TableCell>
              </>:<></>
                }
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AppSessions