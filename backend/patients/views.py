import json
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
import os
from .serializers import PatientSerializer, PatientUpdateSerializer, PatientSearchSerializer, PatientAuditHistorySerializer

from dotenv import load_dotenv
from drf_yasg.utils import swagger_auto_schema


load_dotenv()

class PatientList(APIView):
    """
    List all patients, or create a new patient.
    """
    serializer_class = PatientSerializer

    def get(self, request, format=None):
        headers = {
            'accept': 'application/json',
            'X-API-Key': os.getenv(''),
            'Content-Type': 'application/json',
        }
        data = json.dumps({"page":1,"perPage":100})
        response = requests.post('https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/search', headers=headers, data=data)
        
        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response(response.json(), status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(request_body=PatientSerializer,)
    def post(self, request, format=None):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            headers = {
                'accept': 'application/json',
                'X-API-Key': os.getenv(''),
                'Content-Type': 'application/json',
            }
            data = json.dumps(serializer.validated_data)
            response = requests.put('https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/document', headers=headers, data=data)
            if response.status_code == 200:
                return Response(response.json(), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PatientSearch(APIView):
    """
    Search for patients in the collection.
    """
    @swagger_auto_schema(request_body=PatientSearchSerializer)
    def post(self, request, format=None):
        # Get query parameters
        serializer = PatientSearchSerializer(data=request.data)
        if serializer.is_valid():
            expressions = serializer.validated_data['expressions']
            page = serializer.validated_data['page']
            per_page = serializer.validated_data['perPage']
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Prepare headers and data
        headers = {
            'accept': 'application/json',
            'X-API-Key': os.getenv('IMMUD_API_KEY'),
            'Content-Type': 'application/json',
        }
        data = {
            "query": {
                "expressions": expressions,
            },
            "page": page,
            "perPage": per_page
        }

        # Make the API request
        response = requests.post(
            'https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/search',
            headers=headers, 
            data=json.dumps(data)
        )

        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response(response.json(), status=status.HTTP_400_BAD_REQUEST)



class PatientUpdate(APIView):
    """
    Update a patient record.
    """
    @swagger_auto_schema(request_body=PatientUpdateSerializer)
    def patch(self, request, format=None):
        # Extract data from request
        serializer = PatientUpdateSerializer(data=request.data)
        document_id = None
        new_data = None
        if serializer.is_valid():
            document_id = serializer.validated_data['_id']
            new_data = serializer.validated_data['document']
        if not document_id or not new_data:
            return Response({'error': 'Both _id and document are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare headers and data
        headers = {
            'accept': 'application/json',
            'X-API-Key': os.getenv('IMMUD_API_KEY'),
            'Content-Type': 'application/json',
        }
        data = json.dumps({
            "document": new_data,
            "query": {
                "expressions": [{
                    "fieldComparisons": [{
                        "field": "_id",
                        "operator": "EQ",
                        "value": document_id
                    }]
                }]
            }
        })

        response = requests.post('https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/document', headers=headers, data=data)

        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response(response.json(), status=status.HTTP_400_BAD_REQUEST)


class PatientAuditHistory(APIView):
    """
    Retrieve the audit history of a specific patient document.
    """
    @swagger_auto_schema(query_serializer=PatientAuditHistorySerializer(), operation_description="Retrieve the audit history of a specific patient document")
    def post(self, request, *args, **kwargs):
        serializer = PatientAuditHistorySerializer(data=request.data)
        if not serializer.is_valid():
            return JsonResponse({'error': 'Invalid or missing parameters'}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare headers and data
        headers = {
            'accept': 'application/json',
            'X-API-Key': os.getenv('IMMUD_API_KEY'),
            'Content-Type': 'application/json',
        }
        data = {
            'desc': serializer.validated_data.get('desc', True),
            'page': serializer.validated_data.get('page', 1),
            'perPage': serializer.validated_data.get('perPage', 100),
        }
        document_id = kwargs['document_id']
        response = requests.post(f'https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/document/{document_id}/audit', headers=headers, data=json.dumps(data))

        if response.status_code == 200:
            return JsonResponse(response.json(), status=status.HTTP_200_OK, safe=False)
        else:
            return JsonResponse(response.json(), status=status.HTTP_400_BAD_REQUEST)