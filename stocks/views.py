from rest_framework import generics
from .models import StockInfo, Article
from .serializers import StockInfoSerializer, StockListSerializer,ArticleListSerializer


class StockDetail(generics.RetrieveAPIView):
    queryset = StockInfo.objects.all()
    serializer_class = StockInfoSerializer

class StockList(generics.ListAPIView):
    queryset = StockInfo.objects.all()
    serializer_class = StockListSerializer

class ArticleList(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleListSerializer