from django.db import models

# Create your models here.

class StockData(models.Model):
    stockinfo = models.ForeignKey('StockInfo', related_name='default_StockInfo', on_delete=models.PROTECT)
    T = models.SmallIntegerField()
    indicator = models.CharField(max_length=50)
    rate = models.TextField(max_length=1000)

    def __str__(self):
	    return self.stockinfo.stock

class StockInfo(models.Model):
    stock = models.CharField(max_length=5)
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10000, decimal_places=2)
    change = models.DecimalField(max_digits=100, decimal_places=2)
    sector = models.CharField(max_length=30)
    industry = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    founded = models.IntegerField()

    def __str__(self):
	    return self.stock

class Article(models.Model):
    stockarticle = models.ForeignKey('StockInfo', related_name='default_StockArticle', on_delete=models.PROTECT)
    title = models.CharField(max_length=300)
    description = models.TextField(max_length=5000)
    image = models.ImageField(upload_to="images/")

    