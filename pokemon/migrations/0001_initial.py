# Generated by Django 4.0.4 on 2022-04-12 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pokemon',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('type1', models.CharField(max_length=50)),
                ('type2', models.CharField(max_length=50)),
            ],
        ),
    ]