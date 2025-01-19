from django.db import models
from django.core.exceptions import ValidationError
from .puzzle.dungeonGet import solDungeon,getDungeon
from .puzzle.generalData import generaldata,limitsData,textToFloatInt
from django.contrib.auth.models import User
# Create your models here.
class DataPetition(models.Model):
    id = models.AutoField(primary_key=True)
    height= models.IntegerField()
    nWidth= models.IntegerField()
    expantionFactor= models.FloatField()
    enemyFactor= models.FloatField()
    blockFactor= models.FloatField()
    nPop= models.IntegerField()
    mutationFactor= models.FloatField()
    maxIter= models.IntegerField()
    maxMoves= models.IntegerField()

    def __init__(self, **kwargs):
        super(DataPetition, self).__init__(**self.convertValues(**kwargs))
        self.checkLimitsValues()

    def checkLimitsValues(self):
        #Check if the values are in the limits
        values=[self.height,self.nWidth,self.expantionFactor,self.enemyFactor,self.blockFactor,self.nPop,self.maxIter,self.maxMoves,self.mutationFactor]
        valueNames=['height','Width','expantion Factor','enemy Factor','block Factor','Population','Iteration','Moves','mutationFactor']
        for value,limit,name in zip(values,limitsData,valueNames):
            if value<limit[0] or value>limit[1]:
                raise ValidationError(f"The \"{name}\" value must be between {limit[0]} and {limit[1]}")
        return True
    
    def getDungeon(self):
        self.checkLimitsValues()
        # Create a dungeon with the values of the petition
        return getDungeon(self.height,self.nWidth,self.expantionFactor,self.enemyFactor,self.blockFactor,self.nPop,self.maxIter,self.mutationFactor,self.maxMoves)
    
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
        return getDungeon(generaldata['height'],generaldata['nWidth'],generaldata['expantionFactor'],generaldata['enemyFactor'],generaldata['blockFactor'],generaldata['nPop'],generaldata['maxIter'],generaldata['mutationFactor'],generaldata['maxMoves'])
    def __str__(self):
        return f"{self.height}x{self.nWidth} Dungeon with {self.nPop} population and {self.maxIter} iterations"


class DungeonData(models.Model):
    dungeon=models.JSONField()
    nSol = models.IntegerField()
    minSol = models.IntegerField()
    solution= models.JSONField()
    solutionPlayer= models.JSONField(default=dict())
    recordTime = models.TimeField(default='00:00:00')
    recordMoves = models.IntegerField(default=0)
    public = models.BooleanField(default=False)
    #userId = models.ForeignKey('User', on_delete=models.CASCADE)
    def __init__(self, **kwargs):
        super(DungeonData, self).__init__(**kwargs)
        self.calculateSolutions()
        self.solutionPlayer = dict()
        self.recordTime = '00:00:00'
        self.recordMoves = 0
        self.public = False

    def calculateSolutions(self):
        solu, nSol, minSol = solDungeon(self.dungeon)
        self.solution = solu
        self.nSol = nSol
        self.minSol = minSol
        
    

class PetitionManager(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True,)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    dungeonId = models.ForeignKey(DungeonData, on_delete=models.CASCADE)
    petitionData = models.ForeignKey(DataPetition, on_delete=models.CASCADE)
    statusP = models.CharField(choices={'P':'pending','C':'completed'},default='P')

    def checkStatus(self):
        return self.status
    