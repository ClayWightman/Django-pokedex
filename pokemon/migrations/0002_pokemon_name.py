# Generated by Django 4.0.4 on 2022-04-12 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='name',
            field=models.CharField(default='NOVALIDNAME', max_length=100),
            preserve_default=False,
        ),
    ]
