from django.urls import path
from .views import StockDetail, StockList, ArticleList

app_name = 'stock_api'

urlpatterns = [
    path('stock/<int:pk>/', StockDetail.as_view(), name='stock'),
    path('stocks/', StockList.as_view(), name='stocklist'),
    path('articles/', ArticleList.as_view(), name='articlelist'),
]
