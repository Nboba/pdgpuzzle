from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


limitsData=[(4,10),(4,10),(0.05,0.5),(0.05,0.15),(0.05,0.30),(4,20),(5,60),(5,30),(0.1,0.9)]

def validate_username(value):
    if not value.isalnum():
        raise ValidationError(
            _('%(value)s is not a valid username'),
            params={'value': value},
        )
    
def validate_password(value):
    if len(value)<8:
        raise ValidationError
        _('%(value)s is not a valid password'),
        params={'value': value},
    if not any(char.isdigit() for char in value):
        raise ValidationError
        _('%(value)s is not a valid password'),
        params={'value': value},
    if not any(char.isupper() for char in value):
        raise ValidationError
        _('%(value)s is not a valid password'),
        params={'value': value},       
    if not any(char.islower() for char in value):
        raise ValidationError
        _('%(value)s is not a valid password'),
        params={'value': value},
    if not any(char in ['!','@','#','$','%','^','&','*','(',')'] for char in value):
        raise ValidationError
        _('%(value)s is not a valid password'),
        params={'value': value},


def validate_data(value,index):
    if not limitsData[index][0]<=value<=limitsData[index][1]:
        raise ValidationError
        _('%(value)s is not a valid data'),
        params={'value': value},

def validate_height(value):
    validate_data(value,0)

def validate_nWidth(value):
    validate_data(value,1)

def validate_expantion_factor(value):
    validate_data(value,2)

def validate_enemy_factor(value):
    validate_data(value,3)

def validate_block_factor(value):
    validate_data(value,4)

def validate_n_pop(value):
    validate_data(value,5)

def validate_max_iter(value):
    validate_data(value,6)

def validate_max_moves(value):
    validate_data(value,7)

def validate_mutation_factor(value):
    validate_data(value,8)

