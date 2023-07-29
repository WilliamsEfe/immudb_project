# tests/test_patient_search.py

import json
from django.test import TestCase, RequestFactory
from unittest.mock import patch
from patients.views import PatientSearch
from patients.serializers import PatientSearchSerializer

class PatientSearchTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    @patch('requests.post')
    def test_search_success(self, mock_post):
        # Mock the external API response for success scenario
        mock_post.return_value.status_code = 200  # Mock a successful response
        mock_post.return_value.json.return_value = []

        # Data for the post request
        data = {
            "expressions": [
                {
                "fieldComparisons": [
                    {
                    "field": "_id",
                    "operator": "GE",
                    "value": "64c24fa7000000000000000250327a44"
                    }
                ]
                }
            ],
            "page": 1,
            "perPage": 10,
        }

        # Create a POST request
        request = self.factory.post('/patients/search/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the post method
        view = PatientSearch.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 200)  # The response status code should be 200


    @patch('requests.post')
    def test_search_failure(self, mock_post):
        # Mock the external API response for failure scenario
        mock_post.return_value.status_code = 400
        mock_post.return_value.json.return_value = {}

        # Data for the post request
        data = {
            "expressions": [
                {
                "fieldComparisons": [
                    {
                    "field": "_id",
                    "operator": "GE",
                    "value": "64c24fa7000000000000000250327a44"
                    }
                ]
                }
            ],
            "page": 1,
            "perPage": 10,
        }

        # Create a POST request
        request = self.factory.post('/patients/search/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the post method
        view = PatientSearch.as_view()
        response = view(request)

        # Check the response status code
        self.assertEqual(response.status_code, 400)
