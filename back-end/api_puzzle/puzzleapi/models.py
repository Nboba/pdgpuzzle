from django.db import models
from django.core.exceptions import ValidationError
from .puzzle.dungeonGet import solDungeon,getDungeon,getMetadataDugeon
from .puzzle.generalData import generaldata,limitsData,textToFloatInt
from django.contrib.auth.models import User
# Create your models here.
class DataPetition(models.Model):
    id = models.AutoField(primary_key=True)
    height= models.IntegerField()
    nWidth= models.IntegerField()
    expantion_factor= models.FloatField()
    enemy_factor= models.FloatField()
    block_factor= models.FloatField()
    n_pop= models.IntegerField()
    max_iter= models.IntegerField()
    max_moves= models.IntegerField()
    mutation_factor= models.FloatField()

    def __init__(self, **kwargs):
        super(DataPetition, self).__init__(**self.convertValues(**kwargs))
        self.checkLimitsValues()

    def checkLimitsValues(self):
        #Check if the values are in the limits
        values=[self.height,self.nWidth,self.expantion_factor,self.enemy_factor,self.block_factor,self.n_pop,self.max_iter,self.max_moves,self.mutation_factor]
        valueNames=['height','Width','expantion Factor','enemy Factor','block Factor','Population','Iteration','Moves','mutationFactor']
        for value,limit,name in zip(values,limitsData,valueNames):
            if value<limit[0] or value>limit[1]:
                raise ValidationError(f"The \"{name}\" value must be between {limit[0]} and {limit[1]}")
        return True
    
    def getDungeon(self):
        self.checkLimitsValues()
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
    
    def dungeonjson(self):
        return self.getDungeon()

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
    