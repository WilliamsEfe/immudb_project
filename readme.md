# Medical Records Management Web App

## Description

This is a web application designed to manage medical records. It's designed to perform CRUD (Create, Read, Update, Delete) operations and search functionality for patient data. The application allows users to:

-   Create new patient records
-   Retrieve patient records
-   Update existing patient records
-   Delete patient records
-   Search for patients
-   View a patient's audit history

The backend of the application is built with Django and Django REST Framework, while the frontend is built with React.

## Architecture

The application follows a client-server architecture model with a React frontend and a Django backend. The frontend and backend communicate with each other using HTTP protocols through RESTful API endpoints.

**Backend**

The backend of the application is built using Django and Django REST Framework, which provide a robust framework for building APIs. The backend is designed to handle the following operations:

-   Retrieve a list of all patients (GET request to `/patients/`)
-   Create a new patient record (POST request to `/patients/`)
-   Search for patients (POST request to `/patients/search/`)
-   Update a patient record (PATCH request to `/patient/update/`)
-   Retrieve the audit history of a patient record (POST request to `/patients/{patientId}/audit/`)

The backend does not use a traditional relational database. Instead, it interacts with an external API, the `immudb` to store and retrieve patient data.

The backend server interacts with immudb by making HTTP requests to immudb's API endpoints. Specifically, it uses the immudb REST API, which allows applications to interact with immudb over HTTP. The backend server makes `POST`, `PUT`, and `GET` requests to different immudb API endpoints to create, update, retrieve, and delete patient data.

Here's a breakdown of how each operation works:

1.  **Create (POST):** To create a new patient record, the backend server makes a `PUT` request to the `https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/document` endpoint. The data for the new patient record is included in the body of the request as JSON.
    
2.  **Retrieve (GET):** To retrieve a list of all patients, the backend server makes a `POST` request to the `https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/search` endpoint. The server can also retrieve the audit history of a specific patient by making a `POST` request to the `https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/document/{document_id}/audit` endpoint.
    
3.  **Update (PUT):** To update a patient record, the backend server makes a `POST` request to the `https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/document` endpoint. The ID of the patient record to be updated and the new data are included in the body of the request as JSON.
    
4.  **Search (POST):** To search for patients, the backend server makes a `POST` request to the `https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/search` endpoint. The search expressions are included in the body of the request as JSON.
    

All of these operations are performed in the views defined in the `views.py` file in the `backend/patients` directory. These views correspond to the API endpoints provided by the backend server.

It's important to note that immudb is an immutable database, which means that data cannot be modified or deleted once it's been stored. Instead, updates are performed by creating a new version of the data, and deletions are performed by marking the data as deleted. This ensures that a complete history of all changes to the data is preserved, which can be particularly valuable for use cases like medical records management.

The server's interactions with immudb are secured using authentication and encryption. The server must provide a valid API key in the `Authorization` header of each request, and the data sent in the requests is encrypted to protect patient privacy.

**Frontend**

The frontend of the application is built using React, a popular JavaScript library for building user interfaces. The frontend is designed with the following main components:

-   `Home`: The landing page of the application.
-   `CreatePatient`: A form for creating a new patient record.
-   `SearchPatient`: A form for searching for patients.
-   `PatientsList`: A list of all patients.

The frontend uses React Router for routing, which allows the application to have multiple "pages" without requiring a page reload. The frontend also uses the `axios` library for making API calls to the backend.

## How to Run the Application

### Prerequisites

-   Docker: The application is containerized using Docker, so you'll need to have Docker installed on your machine. You can download Docker from [here](https://www.docker.com/products/docker-desktop).

### Steps to Run the Application

1.  Open a terminal or command prompt.
2.  Navigate to the directory where the application files are located.
3.  Run the following command to start the application:

	`docker-compose up` 

4.  Wait for Docker to build the images and start the containers. Once the containers are up and running, you should be able to access the application at `http://localhost:3000` in your web browser.

### Running Locally

To run the application locally for development, you'll need to have Python, Django, Node.js, and npm installed on your machine.

1.  **Backend**: Navigate to the `backend` directory in your terminal and run `python manage.py runserver` to start the Django development server.
    
2.  **Frontend**: Navigate to the `frontend` directory in another terminal and run `npm install` to install the necessary dependencies, followed by `npm start` to start the React development server.
    

The backend server will be running at `http://localhost:8000`, and the frontend will be running at `http://localhost:3000`.

## API Documentation

The application uses Swagger for API documentation. Once the application is running, you can access the Swagger documentation at `http://localhost:8000/swagger/`. This documentation provides information about each of the backend's API endpoints, including the HTTP methods that each endpoint supports, the parameters that each method accepts, and the responses that each method can return.

## How to Use the Application

1.  **Create a New Patient Record**: Navigate to the "Create" page using the navigation bar at the top of the application. Fill out the form with the patient's details and click the "Submit" button to create a new patient record.
    
2.  **Retrieve Patient Records**: Navigate to the "List" page using the navigation bar. This page will display a list of all patient records.
    
3.  **Update a Patient Record**: To update a patient's record, navigate to the "List" page, find the patient's record, and click the "Update" button. This will take you to a form where you can update the patient's details.
    
4.  **Delete a Patient Record**: To delete a patient's record, navigate to the "List" page, find the patient's record, and click the "Delete" button.
    
5.  **Search for Patients**: Navigate to the "Search" page using the navigation bar. Enter your search terms in the search bar and click the "Search" button to search for patients.
    
6.  **View a Patient's Audit History**: To view a patient's audit history, navigate to the "List" page, find the patient's record, and click the "History" button.
    

## Testing

The application includes tests for the backend.

To run the backend tests, navigate to the `backend` directory in your terminal and run `python manage.py test`. These tests cover functionalities such as retrieving a list of patients, creating new patient records, updating patient records, and searching for patients.

To run the frontend tests, navigate to the `frontend` directory in your terminal and run `npm test`. 

potential improvement given more time:

1.  **Enhanced testing:** If I had some more time, more extensive testing could have be implemented. This could include more comprehensive unit tests for the backend services and React components, integration tests that check the interoperability of different parts of the system, and end-to-end tests that simulate user interaction with the system.
    
2.  **User notifications:** Instead of just showing a status message, we could use a toast notification system for better user feedback in a more aesthetically pleasing manner.
    
3.  **Improved logging:** While some logging might be present, it could be expanded upon. Also, integrating a centralized logging system for production.
    
4.  **Robust error handling:** There's always room to improve error handling. This might include more detailed user-facing error messages, more granular system-level error codes, and fallback strategies in case of failure.
  
5.  **API design:** The RESTful API design could be reviewed for best practices. This includes proper usage of HTTP methods, status codes, URL structures, and payload formats.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.


