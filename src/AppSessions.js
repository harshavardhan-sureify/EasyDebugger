import {React,useState} from 'react'
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TableContainer from "@mui/material/TableContainer";
import Paper from '@mui/material/Paper';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  FormControl,
  IconButton,
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
     
      const copyToClipBoard = (text) => {
          navigator.clipboard.writeText(text).then(() => console.log("fec"));
      };

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
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                  id="outlined-basic"
                  label="uid"
                  variant="outlined"
                  value={uid}
                  onChange={handleUid}
              />

              <TextField
                  id="outlined-basic"
                  label="session_id"
                  variant="outlined"
                  value={sid}
                  onChange={handleSid}
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
                  onChange={(date) => handleEndTime(date)}
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
          </Box>

          <Button
              variant="contained"
              type="submit"
              onClick={() => fetchData()}
              sx={{ mb: 2 }}
          >
              Search
          </Button>
          <br></br>
          {/* {JSON.stringify(data)} */}
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell align="center">user_id</TableCell>
                          <TableCell align="center">uid</TableCell>
                          <TableCell align="center">sesssion_id</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                          {data[0] != null ? (
                              <>
                                  <TableCell align="right">
                                      {data[0].user_id}
                                      <IconButton
                                          size="small"
                                          onClick={() =>
                                              copyToClipBoard(data[0].user_id)
                                          }
                                      >
                                          <ContentCopyIcon fontSize="small" />
                                      </IconButton>
                                  </TableCell>
                                  <TableCell align="right">
                                      {data[0].uid}
                                  </TableCell>
                                  <TableCell align="right">
                                      {data[0].session_id}
                                  </TableCell>
                              </>
                          ) : (
                              <></>
                          )}
                      </TableRow>
                  </TableBody>
              </Table>
          </TableContainer>
      </>
  );
}

export default AppSessions