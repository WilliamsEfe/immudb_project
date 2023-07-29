# tests/test_patient_update.py

import json
from django.test import TestCase, RequestFactory
from unittest.mock import patch
from patients.views import PatientUpdate
from patients.serializers import PatientUpdateSerializer

class PatientUpdateTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    @patch('requests.post')
    def test_update_success(self, mock_post):
        # Mock the external API response for success scenario
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = {}

        # Data for the post request
        data = {
            '_id': '64c2d87a000000000000000b50327a6d',
            'document': {
                'name': 'paul seyi',
                'age': 30,
                'address': 'Hilton',
                'city': 'New York',
                'country': 'United Kingdom',
                'email': 'paulseyi@getfoodcourt.com',
                'phone': '07472118445',
                'is_active': True,
            },
        }

        # Create a PATCH request
        request = self.factory.patch('/patients/update/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the patch method
        view = PatientUpdate.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 200)

    @patch('requests.post')
    def test_update_failure(self, mock_post):
        # Mock the external API response for failure scenario
        mock_post.return_value.status_code = 400
        mock_post.return_value.json.return_value = {}

        # Data for the post request
        data = {
            '_id': '64c2d87a000000000000000b50327a6d',
            'document': {
                'name': 'paul seyi',
                'age': 30,
                'address': 'Hilton',
                'city': 'New York',
                'country': 'United Kingdom',
                'email': 'paulseyi@getfoodcourt.com',
                'phone': '07472118445',
                'is_active': True,
            },
        }

        # Create a PATCH request
        request = self.factory.patch('/patients/update/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the patch method
        view = PatientUpdate.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 400)
