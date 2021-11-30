# Generated by Django 3.2.3 on 2021-07-04 04:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StockInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock', models.CharField(max_length=5)),
                ('name', models.CharField(max_length=50)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10000)),
                ('change', models.DecimalField(decimal_places=2, max_digits=100)),
                ('sector', models.CharField(max_length=30)),
                ('industry', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('founded', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='StockData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('T', models.SmallIntegerField()),
                ('indicator', models.CharField(max_length=50)),
                ('rate', models.TextField(max_length=1000)),
                ('stockinfo', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='default_StockInfo', to='stocks.stockinfo')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('description', models.TextField(max_length=5000)),
                ('image', models.ImageField(upload_to='images/')),
                ('stockarticle', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='default_StockArticle', to='stocks.stockinfo')),
            ],
        ),
    ]
