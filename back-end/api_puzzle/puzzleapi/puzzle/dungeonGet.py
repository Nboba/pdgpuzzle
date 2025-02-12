# Imports externos
from collections import deque
import numpy as np
# Imports propios
from .scenarioFiller import scenarioFiller,getIntialSol
from .Fi2Pop import FI2Pop
from .solver import solveGame 
import json

# MAIN



def getinitialSolution(nHight,mWidth,expantionFactor):
    borderDungeon = scenarioFiller(nHight,mWidth,expantionFactor)
    return borderDungeon

def getPopulation(borderDungeon,nPop, enemyFactor, blockFactor):
    population = []
    for _ in range(nPop*2):
     population.append(getIntialSol(borderDungeon.copy(),enemyFactor,blockFactor))
    return population

def getDungeon(height:int,nWidth:int,expantionFactor:float,enemyFactor:float,blockFactor:float,nPop:int,maxIter:int,mutationFactor:float,maxMoves:int):
    borderDungeon = getinitialSolution(height,nWidth,expantionFactor)
    population= getPopulation(borderDungeon,nPop,enemyFactor, blockFactor)
    dungeon = FI2Pop(population,maxIter,nPop,mutationFactor,maxMoves)
    return dungeon

def getMetadataDugeon(dungeon):
    if type(dungeon) != np.array:
     dungeon = np.array(jsonToDungeon(dungeon)['dungeon'])

    playerPos = np.stack(np.where(dungeon == 5)).tolist()
    doorPos = np.stack(np.where(dungeon == 4),axis=1).tolist()
    enemyPos = np.stack(np.where(dungeon == 3),axis=1).tolist()
    return playerPos,doorPos,enemyPos

def solDungeon(dungeon):
    if type(dungeon) != np.array:
        dungeon = np.array(jsonToDungeon(dungeon)['dungeon'])
    solutions= solveGame(dungeon,True)
    best,nsol,nMoves=sorterdungeon(solutions)
    return best,nsol,nMoves


def jsonToDungeon(jsonDungeon):
    return json.loads(jsonDungeon)

def dungeonToJson(dungeon):
    return json.dumps({'dungeon':dungeon},sort_keys=True)

def sorterdungeon(solutions):
        best=[]
        solutions= sorted(solutions,key=lambda x: x[1])

        for sol in solutions[0][0]:
            best.append(sol.tolist())
        nsol=len(solutions)
        nMoves=len(best)
        return  best,nsol,nMoves