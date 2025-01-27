from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

from .puzzle.dungeonGet import solDungeon
from .puzzle.dungeonGet import getDungeon
from .puzzle.dungeonGet import getMetadataDugeon
from .puzzle.generalData import generaldata
from .puzzle.generalData import textToFloatInt
from . import validators


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
    max_moves= models.IntegerField(default= 0.5,validators= [validators.validate_max_moves])
    mutation_factor= models.FloatField(default=12 ,validators= [validators.validate_mutation_factor])

    def __init__(self, **kwargs):
        super(DataPetition, self).__init__(**self.convertValues(**kwargs))

    
    def getDungeon(self):
        # Create a dungeon with the values of the petition
        return getDungeon(self.height,
                          self.nWidth,
                          self.expantion_factor,
                          self.enemy_factor,
                          self.block_factor,
                          self.n_pop,
                          self.max_iter,
                          self.mutation_factor,
                          self.max_moves)


    @staticmethod
    def convertValues(**params):
        #Convert the values of the petition to the needed type and add the general values
        params= {**generaldata,**params}
        params = [(param[0],textToFloatInt(param[1])) if (type(param[1]) == list) else param for param in params.items()]
        return dict(params)
    
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
    dungeon=models.JSONField()
    n_sol = models.IntegerField()
    min_sol = models.IntegerField()
    solution= models.JSONField()
    solution_player= models.JSONField()
    record_time = models.TimeField(default='00:00:00')
    record_moves = models.IntegerField(default=0)
    public = models.BooleanField(default=False)
    #userId = models.ForeignKey('User', on_delete=models.CASCADE)
    def __init__(self, **kwargs):
        super(DungeonData, self).__init__(**kwargs)
        self.calculateSolutions()
        self.solution_player = dict()
        self.record_time = '00:00:00'
        self.record_moves = 0
        self.public = False

    def calculateSolutions(self):
        solu, nSol, minSol = solDungeon(self.dungeon)
        self.solution = solu
        self.n_sol = nSol
        self.min_sol = minSol
        
    

class PetitionManager(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True,)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    dungeon_id = models.ForeignKey(DungeonData, on_delete=models.CASCADE)
    petition_data = models.ForeignKey(DataPetition, on_delete=models.CASCADE)
    status_p = models.CharField(choices={'P':'pending','C':'completed'},default='P')

    def checkStatus(self):
        return self.status
    