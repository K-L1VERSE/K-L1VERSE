from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .apps import BotConfig


@api_view(['POST'])
def predictAPI(request):
    # 분석 결과
    analysis_result = BotConfig.pipe(request.data.get('input'))[0]

    score = 0
    result = ""
    for analysis in analysis_result:
        label = analysis['label']
        temp_score = analysis['score']

        # 단순 욕설인 경우 필터링 기준 완화
        if label == "악플/욕설":
            temp_score -= 0.25

        if score < temp_score:
            score = temp_score
            result = label

    # JSON 응답
    if result == "clean":
        return Response({"result": True}, status=status.HTTP_200_OK)
    else:
        return Response({"result": False}, status=status.HTTP_200_OK)
