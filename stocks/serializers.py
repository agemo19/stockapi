from rest_framework import serializers
from .models import StockInfo, StockData, Article
from django.shortcuts import get_object_or_404

class StockDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StockData
        fields = ('stockinfo', 'T', 'indicator', 'rate')
        # fields = ('indicator', 'rate')

# class StockEPSSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = StockData
#         fields = ('indicator', 'rate')


class StockListSerializer(serializers.ModelSerializer):
    earning = serializers.SerializerMethodField()

    class Meta:
        model = StockInfo
        fields = ('id','stock', 'name','price','change','earning', 'sector', 'industry', 'location', 'founded')
    
    def get_earning(self, obj):
        # get_object_or_404 budas
        # eps = get_object_or_404(StockData, stockinfo_id = obj.id, indicator = 'EPS')
        # stockdata = StockDataSerializer(eps).data
        try:
            eps = StockData.objects.get(stockinfo_id = obj.id, indicator = 'EPS')
            stockdata = StockDataSerializer(eps).data
            return stockdata['rate'].split(',')[-1]
        except StockData.DoesNotExist:
            return 0
        
        
        

class ArticleListSerializer(serializers.ModelSerializer):
    stockarticlename = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = ('id','stockarticle', 'stockarticlename', 'title', 'description', 'image')

    def get_stockarticlename(self, obj):
        return obj.stockarticle.stock


class StockInfoSerializer(serializers.ModelSerializer):
    stockdata = serializers.SerializerMethodField()
    # stocklist = serializers.SerializerMethodField()

    class Meta:
        model = StockInfo
        fields = ('id', 'stock', 'name','price', 'sector', 'industry', 'location','founded','stockdata')

    def get_stockdata(self, obj):
        c_qs = StockData.objects.filter(stockinfo_id = obj.id)
        stockdata = StockDataSerializer(c_qs, many=True).data
        dataOjb = {"period":[],"balance":{},"income":{}}
        
        for i in stockdata:
            if i['T'] == 0:
                dataOjb['period'] = map(int,i['rate'].split(','))
            elif i['T'] == 1:
                dataOjb['balance'][i['indicator']] = map(float,i['rate'].split(','))
            elif i['T'] == 2:
                dataOjb['income'][i['indicator']] = map(float,i['rate'].split(','))
                    
        return dataOjb
    
    # def get_stocklist(self,obj):
    #     c_qs = StockInfo.objects.all()
    #     stocklist = StockListSerializer(c_qs, many=True).data
    #     pvz = list()
    #     for x in stocklist:
    #         pvz.append(x["stock"])
        
    #     return pvz