from rest_framework.response import Response
from rest_framework.decorators import api_view

from .apps import BotConfig
from .serializers import cleanbotSerializer

@api_view(['POST'])
def predictAPI(request):
    # 분석 결과
    analysis_result = BotConfig.pipe(request.data.get('input'))[0]

    # 시리얼 라이즈
    # serializer = cleanbotSerializer({'result': analysis_result})

    # JSON 응답
    return Response(analysis_result)
