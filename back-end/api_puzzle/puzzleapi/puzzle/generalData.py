

generaldata={'height':7,'nWidth':7,'expantionFactor':0.1, 'enemyFactor':0.083, 
             'blockFactor':0.1,'nPop':12, 'maxIter':40, 'mutationFactor':0.5, 'maxMoves':12}


def textToFloatInt(value):
     if  type('str') :
         return float(value[0]) if value[0].count('.') == 1 else int(value[0])
     return value
