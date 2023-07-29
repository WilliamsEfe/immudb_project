from django.urls import path
from . import views

urlpatterns = [
    path('patients/', views.PatientList.as_view(), name='patient-list'),
    path('patients/search/', views.PatientSearch.as_view(), name='patient-search'),
    path('patient/update/', views.PatientUpdate.as_view(), name='patient-update'),
    path('patients/<str:document_id>/audit/', views.PatientAuditHistory.as_view(), name='patient-audit-history'),
]
