import React, { useEffect, useState } from 'react';
import { getPatients, patchPatient } from '../../services/patientApiService.js';
import { Container, Typography, List, ListItem, ListItemText, makeStyles, IconButton, Divider, Button, Modal, Backdrop, Fade, TextField, Grid, FormControlLabel, Checkbox  } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import copy from 'clipboard-copy';


const useStyles = makeStyles(theme => ({
  appBar: {
    marginBottom: '30px',
    backgroundColor: theme.palette.secondary.main,
  },
  homeLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  listItem: {
    fontSize: '1.5rem',
    padding: '20px 0',
  },
  divider: {
    margin: '10px 0',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PatientList() {
    const classes = useStyles();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // set this to the number of items per page
  
    const [open, setOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [updateLoading] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [status, setStatus] = useState(null); 
  
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const patientsData = await getPatients(page, itemsPerPage);
        setPatients(patientsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients: ', error);
        setLoading(false);
      }
    };
  

    useEffect(() => {
      const fetchPatients = async () => {
        setLoading(true);
        try {
          const response = await getPatients(page, itemsPerPage);  
          setPatients(response);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching patients: ', error);
          setLoading(false);
        }
      };
      
      fetchPatients();
    }, [page, itemsPerPage]);


  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpen = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
  try {
    const { _id, ...documentWithoutId } = selectedPatient;
    delete documentWithoutId._vault_md;
    const response = await patchPatient(_id, documentWithoutId);
    
    if (!response.error) {  // assuming the server returns an 'error' property on failure
      fetchPatients();
      handleClose();
      setStatus("Patient updated successfully!"); // update the status message on success
    } else {
      console.error('Error updating patient: ', response.error);
      setStatus("Failed to update patient. Please try again."); // update the status message on error
    }

  } catch (error) {
    console.error('Error updating patient: ', error);
    setStatus("Failed to update patient. Please try again."); // update the status message on error
    setUpdateError(error); // Set the error
  }
  };



  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSelectedPatient({ ...selectedPatient, [event.target.name]: value });
  };

  return (
    <Container maxWidth="md">
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {patients.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((patient, index) => (
            <React.Fragment key={index}>
        <ListItem button onClick={() => handleOpen(patient)} className={classes.listItem}>
          <ListItemText 
            primary={patient.name || 'not given'} 
            secondary={`Age: ${patient.age || ''}, Address: ${patient.address || 'not given'}, City: ${patient.city || 'not given'}, Country: ${patient.country || 'not given'}, Email: ${patient.email || 'not given'}, Phone: ${patient.phone || 'not given'}`}
          />
          <ListItemText 
            secondary={`Is Active: ${patient.is_active || 'not given'}, ID: ${patient._id || 'not given'}`} 
          />
          <Button onClick={(e) => {
              e.stopPropagation(); // Prevents triggering the ListItem click event
              copy(patient._id);
            }
          }>
            Copy ID
          </Button>
        </ListItem>

              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
          <Button onClick={handlePreviousPage} disabled={page === 1}>Previous Page</Button>
          <Button onClick={handleNextPage} disabled={patients.length <= page * itemsPerPage}>Next Page</Button>
        </List>
      )}
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
        timeout: 500,
    }}
    >
    <Fade in={open}>
        <div className={classes.paper}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h2>Edit Patient</h2>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </div>
        <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={selectedPatient?.name || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Age"
                  variant="outlined"
                  name="age"
                  value={selectedPatient?.age || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={selectedPatient?.address || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  name="city"
                  value={selectedPatient?.city || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Country"
                  variant="outlined"
                  name="country"
                  value={selectedPatient?.country || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={selectedPatient?.email || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  value={selectedPatient?.phone || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPatient?.is_active || false}
                      onChange={handleChange}
                      name="is_active"
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSave} disabled={updateLoading}>
                {updateLoading ? "Updating..." : "Save"}
              </Button>
              {status && <p>{status}</p>}
              {updateError && <p>Error: {updateError.message}</p>}
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}

