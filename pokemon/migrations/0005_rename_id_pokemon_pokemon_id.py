# Generated by Django 4.0.4 on 2022-04-12 20:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon', '0004_pokemon_attack_pokemon_defense_pokemon_legendary_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pokemon',
            old_name='id',
            new_name='pokemon_id',
        ),
    ]