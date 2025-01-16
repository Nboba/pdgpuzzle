

generaldata={'height':10,'nWidth':10,'expantionFactor':0.13, 'enemyFactor':0.083, 
             'blockFactor':0.1,'nPop':12, 'maxIter':40, 'mutationFactor':0.5, 'maxMoves':20}

limitsData=[(4,10),(4,10),(0.05,0.5),(0.05,0.15),(0.05,0.30),(4,20),(5,60),(5,30),(0.1,0.9)]

def textToFloatInt(value):
     if  type('str') :
         return float(value[0]) if value[0].count('.') == 1 else int(value[0])
     return value
