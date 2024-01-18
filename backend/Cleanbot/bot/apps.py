from django.apps import AppConfig
from transformers import TextClassificationPipeline, BertForSequenceClassification, AutoTokenizer


class BotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bot'

    model_name = 'smilegate-ai/kor_unsmile'

    model = BertForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    pipe = TextClassificationPipeline(
        model=model,
        tokenizer=tokenizer,
        device=0,
        return_all_scores=True,
        function_to_apply='sigmoid'
    )
