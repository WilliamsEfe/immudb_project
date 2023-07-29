# tests/test_patient_list.py

import json
from django.test import TestCase, RequestFactory
from unittest.mock import patch
from patients.views import PatientList
from patients.serializers import PatientSerializer


class PatientListTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    @patch('requests.post')
    def test_get_success(self, mock_post):
        # Mock the external API response for success scenario
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = []

        # Create a GET request
        request = self.factory.get('/patients/')

        # Instantiate the view and call the get method
        view = PatientList.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 200)

    @patch('requests.post')
    def test_get_failure(self, mock_post):
        # Mock the external API response for failure scenario
        mock_post.return_value.status_code = 400
        mock_post.return_value.json.return_value = {}

        # Create a GET request
        request = self.factory.get('/patients/')

        # Instantiate the view and call the get method
        view = PatientList.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 400)

    @patch('requests.put')
    def test_post_success(self, mock_put):
        # Mock the external API response for success scenario
        mock_put.return_value.status_code = 200  # Changed this line
        mock_put.return_value.json.return_value = {}

        # Data for the post request
        data = {
            'name': 'paul seyi',
            'age': 30,
            'address': 'Hilton',
            'city': 'New York',
            'country': 'United Kingdom',
            'email': 'paulseyi@getfoodcourt.com',
            'phone': '07472118445',
            'is_active': True,
        }

        # Create a POST request
        request = self.factory.post('/patients/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the post method
        view = PatientList.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 201)

    @patch('requests.put')
    def test_post_invalid_data(self, mock_put):
        # Data for the post request
        data = {
            'name': '',
            'age': 30,
            'address': 'LLL',
            'city': 'New York',
            'country': 'United Kingdom',
            'email': 'paulseyi@getfoodcourt.com',
            'phone': '07472119999',
            'is_active': True,
        }

        # Create a POST request
        request = self.factory.post('/patients/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the post method
        view = PatientList.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 400)

    @patch('requests.put')
    def test_post_failure(self, mock_put):
        # Mock the external API response for failure scenario
        mock_put.return_value.status_code = 400
        mock_put.return_value.json.return_value = {}

        # Data for the post request
        data = {
            'name': 'paul seyi',
            'age': 30,
            'address': 'Hilton',
            'city': 'New York',
            'country': 'United Kingdom',
            'email': 'paulseyi@getfoodcourt.com',
            'phone': '07472118445',
            'is_active': True,
        }

        # Create a POST request
        request = self.factory.post('/patients/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the post method
        view = PatientList.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 400)

