import csv
from pokemon.models import Pokemon
f = open('pokemon.csv')
csvreader = csv.reader(f)
next(csvreader) #skips the header
for row in csvreader:
    if not Pokemon.objects.filter(pokemon_id = row[0]).exists():
        print(row[1])
        Pokemon.objects.get_or_create(
            pokemon_id = row[0],
            name = row[1],
            type1 = row[2],
            type2 = row[3],
            total = row[4],
            hp = row[5],
            attack = row[6],
            defense = row[7],
            sp_attack = row[8],
            sp_defense = row[9],
            speed = row[10],
            legendary = row[12],
        )
