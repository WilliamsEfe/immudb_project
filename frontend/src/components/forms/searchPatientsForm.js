import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import {
  searchPatients,
  getPatientHistory,
} from "../../services/patientApiService.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 800,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    zIndex: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  largeIcon: {
    fontSize: 60,
  },
  input: {
    marginTop: theme.spacing(2),
  },
}));

export default function PatientManagement() {
  const classes = useStyles();
  const [functionality, setFunctionality] = useState("");
  const [expressions, setExpressions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [patientId, setPatientId] = useState("");
  const [desc, setDesc] = useState(true);
  const [result, setResult] = useState([]);
  const [newExpression, setNewExpression] = useState({
    field: "",
    operator: "",
    value: "",
  });

  const handleFunctionalityChange = (event) => {
    setFunctionality(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = {
      expressions: expressions.map((expr) => ({
        fieldComparisons: [expr],
      })),
      page: page,
      perPage: perPage,
    };

    try {
      const response = await searchPatients(expressions, page, perPage);
      if (response.status === 200) {
        setResult(response.revisions);
      }
    } catch (error) {
      console.error("Error searching patients: ", error);
    }
  };

  const handleSearchHistory = async (e) => {
    e.preventDefault();
    try {
      const response = await getPatientHistory(patientId, desc, page, perPage);
      if (response.status === 200) {
        setResult(response.revisions);
      }
    } catch (error) {
      console.error("Error fetching patient history: ", error);
    }
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, newExpression]);
    setNewExpression({ field: "", operator: "", value: "" }); // clear the form
  };

  const handleNewExpressionChange = (event) => {
    setNewExpression({
      ...newExpression,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteExpression = (index) => {
    const newExpressions = [...expressions];
    newExpressions.splice(index, 1);
    setExpressions(newExpressions);
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Grid container spacing={3} align="center">
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-functionality-label">
                Functionality
              </InputLabel>
              <Select
                labelId="select-functionality-label"
                id="select-functionality"
                value={functionality}
                onChange={handleFunctionalityChange}
                autoWidth
              >
                <MenuItem value={"search"}>Search Patients</MenuItem>
                <MenuItem value={"history"}>Patient History</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {functionality === "search" ? (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Field"
                  name="field"
                  value={newExpression.field}
                  onChange={handleNewExpressionChange}
                />
                <TextField
                  label="Operator"
                  name="operator"
                  value={newExpression.operator}
                  onChange={handleNewExpressionChange}
                />
                <TextField
                  label="Value"
                  name="value"
                  value={newExpression.value}
                  onChange={handleNewExpressionChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddExpression}
                >
                  Add Expression
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      {expressions.map((expression, index) => (
                        <TableRow key={index}>
                          <TableCell>{expression.field}</TableCell>
                          <TableCell>{expression.operator}</TableCell>
                          <TableCell>{expression.value}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDeleteExpression(index)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <HistoryIcon className={classes.largeIcon} />
                <Typography variant="h5">Retrieve Patient History</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  label="Patient ID"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  z-index={0}
                />
                <TextField
                  className={classes.input}
                  label="Page"
                  type="number"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                />
                <TextField
                  className={classes.input}
                  label="Per Page"
                  type="number"
                  value={perPage}
                  onChange={(e) => setPerPage(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={desc}
                      onChange={(e) => setDesc(e.target.checked)}
                      name="desc"
                      color="primary"
                    />
                  }
                  label="Descending"
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSearchHistory}
                  zIndex={0}
                >
                  Retrieve History
                </Button>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            {result.length > 0 ? (
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.document._id}</TableCell>
                        <TableCell>{item.document.name}</TableCell>
                        <TableCell>{item.document.age}</TableCell>
                        <TableCell>{item.document.city}</TableCell>
                        <TableCell>{item.document.email}</TableCell>
                        <TableCell>{item.document.phone}</TableCell>
                        <TableCell>{item.document.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">No results found</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
