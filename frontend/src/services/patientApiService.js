import axios from 'axios';
const baseURL = 'http://localhost:8000';

export const createPatient = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/patients/`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating patient: ', error);
    }
}

export const getPatients = async (page, perPage) => {
    try {
      const response = await axios.get(`${baseURL}/patients?page=${page}&perPage=${perPage}`);
      if (response.data.revisions && Array.isArray(response.data.revisions)) {
        return response.data.revisions
          .map(revision => revision.document)
          .filter(document => document.name && document.age);
      } else {
        console.error('Unexpected response structure: ', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching patients: ', error);
    }
  }

export const searchPatients = async (expressions, page, perPage) => {
    const data = {
      "expressions": expressions.map(expr => ({
        "fieldComparisons": [expr]
      })),
      "page": page,
      "perPage": perPage,
    };
    try {
        const response = await axios.post(`${baseURL}/patients/search/`, data);
        return {
            revisions: response.data.revisions,
            status: response.status,
          };
    } catch (error) {
        console.error('Error searching patients: ', error);
    }
}

export const getPatientHistory = async (patientId, desc, page, perPage) => {
    try {
        const response = await axios.post(`${baseURL}/patients/${patientId}/audit/`, {
            desc,
            page,
            perPage
        });
        return {
            revisions: response.data.revisions,
            status: response.status,
          };
    } catch (error) {
        console.error('Error fetching patient history: ', error);
    }
}


export const patchPatient = async (_id, documentWithoutId) => {
    try {
      const response = await axios.patch(`${baseURL}/patient/update/`, {
        "_id": _id,
        "document": documentWithoutId
      });
      if (response.status === 200) {
        return response;
      } else {
        throw new Error('Error updating patient');
      }
    } catch (error) {
      throw new Error('Error updating patient');
    }
};
  
