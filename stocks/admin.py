from django.contrib import admin

from . import models


@admin.register(models.StockData)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'stockinfo', 'T','indicator', 'rate')
   

@admin.register(models.StockInfo)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'stock', 'name', 'price', 'sector', 'location','founded')

@admin.register(models.Article)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'stockarticle', 'title', 'description', 'image')   