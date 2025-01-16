from django.test import TestCase
from .puzzle.dungeonGet import getDungeon,dungeonToString
# Create your tests here.
class test_getDungeonString(TestCase):
    def test_getDungeonString(self):
        height = 10
        width = 10
        expantionFactor = 0.13
        enemyFactor = 0.083
        blockFactor = 0.1
        nPop = 12
        maxIter = 40
        mutationFactor = 0.5
        maxMoves = 20
        self.assertEqual(dungeonToString(getDungeon(height,width,expantionFactor,enemyFactor,blockFactor,nPop,maxIter,mutationFactor,maxMoves), str == True))