from django.db import models


class CleanBot(models.Model):
    """
    Clean Bot Model
    id : id값
    content : 내용
    result : 결과
    score : 점수
    input_time : 서버로 들어온 시간
    """
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    result = models.CharField(max_length=15)
    score = models.FloatField()
    input_time = models.DateTimeField()
