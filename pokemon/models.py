from django.db import models

# Create your models here.
class Pokemon(models.Model):
    pokemon_id = models.IntegerField(primary_key= True)
    name = models.CharField(max_length = 100)
    type1 = models.CharField(max_length = 50)
    type2 = models.CharField(max_length = 50)
    total = models.IntegerField()
    hp = models.IntegerField(default = 0)
    attack = models.IntegerField()
    defense = models.IntegerField()
    sp_attack = models.IntegerField()
    sp_defense = models.IntegerField()
    speed = models.IntegerField()
    legendary = models.BooleanField()
