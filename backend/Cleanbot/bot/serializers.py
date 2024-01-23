from rest_framework import serializers


class cleanbotSerializer(serializers.Serializer):
    # {label : string, score : float}
    # 분석 결과(리스트)에 대한 필드 정의
    label=serializers.CharField(),
    score=serializers.FloatField()
