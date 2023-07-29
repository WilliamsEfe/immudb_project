from rest_framework import serializers

class PatientSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    id = serializers.IntegerField(required=False)
    timestamp = serializers.DateTimeField(required=False)
    email = serializers.EmailField(required=False)
    age = serializers.IntegerField(required=False)
    address = serializers.CharField(max_length=200, required=False)
    city = serializers.CharField(max_length=200, required=False)
    country = serializers.CharField(max_length=200, required=False)
    phone = serializers.CharField(max_length=200, required=False)
    is_active = serializers.BooleanField(required=False)

    def validate(self, data):
        if 'email' not in data and 'phone' not in data:
            raise serializers.ValidationError("Either email or phone must be provided.")
        return data
    

class PatientUpdateSerializer(serializers.Serializer):
    _id = serializers.CharField(required=True)
    document = serializers.DictField()


class PatientSearchSerializer(serializers.Serializer):
    expressions = serializers.ListField(
        child=serializers.DictField(
            child=serializers.ListField(
                child=serializers.DictField(
                    child=serializers.CharField()
                )
            )
        )
    )
    page = serializers.IntegerField()
    perPage = serializers.IntegerField()


class PatientAuditHistorySerializer(serializers.Serializer):
    desc = serializers.BooleanField(required=False)
    page = serializers.IntegerField(required=False)
    perPage = serializers.IntegerField(required=False)