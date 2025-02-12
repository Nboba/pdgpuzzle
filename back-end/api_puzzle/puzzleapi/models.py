from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

from .puzzle.dungeonGet import solDungeon
from .puzzle.dungeonGet import getDungeon
from .puzzle.dungeonGet import getMetadataDugeon
from .puzzle.generalData import generaldata
from .puzzle.generalData import textToFloatInt
from . import validators
import json 


generaldata={'height':7,'nWidth':7,'expantionFactor':0.1, 'enemyFactor':0.083, 
             'blockFactor':0.1,'nPop':12, 'maxIter':40, 'mutationFactor':0.5, 'maxMoves':12}

class DataPetition(models.Model):
    id = models.AutoField(primary_key=True)
    height= models.IntegerField(default=7 ,validators= [validators.validate_height])
    nWidth= models.IntegerField(default=7 ,validators= [validators.validate_nWidth])
    expantion_factor= models.FloatField(default=0.1 ,validators= [validators.validate_expantion_factor])
    enemy_factor= models.FloatField(default=0.083 ,validators= [validators.validate_enemy_factor]) 
    block_factor= models.FloatField(default= 0.1,validators= [validators.validate_block_factor]) 
    n_pop= models.IntegerField(default=12 ,validators= [validators.validate_n_pop])
    max_iter= models.IntegerField(default=20 ,validators= [validators.validate_max_iter])
    max_moves= models.IntegerField(default= 12,validators= [validators.validate_max_moves])
    mutation_factor= models.FloatField(default=0.5 ,validators= [validators.validate_mutation_factor])


    
    def getDungeon(self):
        # Create a dungeon with the values of the petition
        return JSON.dumps({'dungeon':getDungeon(self.height,
                          self.nWidth,
                          self.expantion_factor,
                          self.enemy_factor,
                          self.block_factor,
                          self.n_pop,
                          self.max_iter,
                          self.mutation_factor,
                          self.max_moves).tolist()},sort_keys=True)

    
    @staticmethod
    def getDungeonDummy():
        #Create a dungeon with the general values
        return getMetadataDugeon(getDungeon(generaldata['height'],
                                            generaldata['nWidth'],
                                            generaldata['expantionFactor'],
                                            generaldata['enemyFactor'],
                                            generaldata['blockFactor'],
                                            generaldata['nPop'],
                                            generaldata['maxIter'],
                                            generaldata['mutationFactor'],
                                            generaldata['maxMoves']))
    def __str__(self):
        return f"{self.height}x{self.nWidth} Dungeon with {self.nPop} population and {self.maxIter} iterations"


class DungeonData(models.Model):
    id= models.AutoField(primary_key=True)
    dungeon=models.JSONField()
    n_sol = models.IntegerField()
    min_sol = models.IntegerField()
    player_pos=models.JSONField(default=dict)
    door_pos=models.JSONField(default=dict)
    enemy_pos=models.JSONField(default=dict)
    solution= models.JSONField()
    solution_player= models.JSONField(default=dict)
    record_time = models.TimeField(default='00:00:00')
    record_moves = models.IntegerField(default=0)
    public = models.BooleanField(default=False)
    userId = models.ForeignKey(User, on_delete=models.CASCADE,default=None)


    def calculateSolutions(self):
        self.solution, self.n_sol , self.min_sol = solDungeon(self.dungeon)
        self.player_pos,self.door_pos,self.enemy_pos =getMetadataDugeon(self.dungeon)

    def prepareData(self):
        return {'id':self.id,
                'dungeon':json.loads(self.dungeon)['dungeon'],
                'n_sol':self.n_sol,
                'min_sol':self.min_sol,
                'player_pos':json.loads(self.player_pos)['playerPos'],
                'door_pos':json.loads(self.door_pos)['doorPos'],
                'enemy_pos':json.loads(self.enemy_pos)['enemyPos'],
                'solution':json.loads(self.solution)['solution'],
                'solution_player':self.solution_player,
                'record_time':self.record_time,
                'record_moves':self.record_moves}
        
    

class PetitionManager(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True,)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    dungeon_id = models.ForeignKey(DungeonData, on_delete=models.CASCADE,null=True)
    petition_data = models.ForeignKey(DataPetition, on_delete=models.CASCADE)
    status_p = models.CharField(choices={'P':'pending','C':'completed'},default='P')

    def checkStatus(self):
        return self.status
    