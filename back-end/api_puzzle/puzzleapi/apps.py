from django.apps import AppConfig
import sys


class PuzzleapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'puzzleapi'

    def ready(self):
        if 'runserver' in sys.argv:
           if not any(arg.endswith('autoreload') for arg in sys.argv):
                from .recursive_task import start_sched
                start_sched()
           