
import re
class FloatConverter:
    regex = '[-+]?[0-9]*\.?[0-9]+'
    
    def to_python(self, value):
        return float(value)
        
    def to_url(self, value):
        return str(value)
    


class ParamConverter:
    regex = r'[a-zA-Z]+\=[0-9]+'

    def to_python(self, value):
        params = value.split(',')
        return {param.split('=')[0]:(float(param.split('=')[1]),int(param.split('=')[1]))[param.split('=')[1]% 10!=0]for param in params}
        
    def to_url(self, value):
        return str(value)