import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PatientsList from '../src/screens/patientsList';
import { getPatients } from '../src/services/patientApiService';

jest.mock('../src/services/patientApiService');

test('renders PatientsList', async () => {
  getPatients.mockResolvedValueOnce([
      { name: 'Patient 1', age: 30 },
      { name: 'Patient 2', age: 40 }
  ]);

    render(<PatientsList />);
    
    const listItem1 = await screen.findByText(/Patient 1/);
    const listItem2 = await screen.findByText(/Patient 2/);

    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
});
