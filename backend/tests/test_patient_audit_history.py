# tests/test_patient_audit_history.py

import json
from django.test import TestCase, RequestFactory
from unittest.mock import patch
from patients.views import PatientAuditHistory
from patients.serializers import PatientAuditHistorySerializer

class PatientAuditHistoryTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    @patch('requests.post')
    def test_audit_history_success(self, mock_post):
        # Mock the external API response for success scenario
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = []

        # Data for the post request
        data = {
            'desc': False,
            'page': 1,
            'perPage': 1,
        }

        # Create a POST request
        request = self.factory.post('/patients/audit-history/64c2d87a000000000000000b50327a6d/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the post method
        view = PatientAuditHistory.as_view()
        response = view(request, document_id='64c2d87a000000000000000b50327a6d')

        # Check the response status code
        self.assertEqual(response.status_code, 200)

    @patch('requests.post')
    def test_audit_history_failure(self, mock_post):
        # Mock the external API response for failure scenario
        mock_post.return_value.status_code = 400
        mock_post.return_value.json.return_value = {}

        # Data for the post request
        data = {
            'desc': False,
            'page': 1,
            'perPage': 1,
        }

        # Create a POST request
        request = self.factory.post('/patients/audit-history/64c2d87a000000000000000b50327a6d/', data=json.dumps(data), content_type='application/json')

        # Instantiate the view and call the post method
        view = PatientAuditHistory.as_view()
        response = view(request, document_id='64c2d87a000000000000000b50327a6d')

        # Check the response status code
        self.assertEqual(response.status_code, 400)
