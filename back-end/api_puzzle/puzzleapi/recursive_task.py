from django.http import JsonResponse
from django.db import transaction
from django.contrib.auth.models import User

from .models import DataPetition
from .models import DungeonData
from .models import PetitionManager




def async_generate_dungeons():
    try:
         with transaction.atomic():
            pending_petitions = PetitionManager.objects.filter(status_p='pending').select_for_update( skip_locked=True )
            if pending_petitions.exists():
                for petition in pending_petitions:
                    data_dungeon = petition.petition_data.getDungeon()
                    user=User.objects.get(id=petition.user_id.id)
                    dungeon_data = DungeonData(dungeon=data_dungeon, userId=user)
                    dungeon_data.save()
                    petition.dungeon_id = dungeon_data
                    petition.status_p = 'completado'
                    petition.save()
    except Exception as e:
        return print(f"Error al generar dungeons: {str(e)}")
    
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from django_apscheduler.jobstores import DjangoJobStore
from apscheduler.executors.pool import ThreadPoolExecutor


def start_sched():
    executors = {
        'default': ThreadPoolExecutor( max_workers=1 )
    }
    
    job_defaults = {
        'coalesce': False,  # Permite que se acumulen jobs si es necesario
        'max_instances': 1,  # Solo una instancia a la vez
        'misfire_grace_time': 60,  # Tiempo de gracia para jobs perdidos (en segundos)
    }

    scheduler = BackgroundScheduler(
        executors=executors,
        job_defaults=job_defaults
    )
    
    scheduler.add_jobstore(DjangoJobStore(), "default")
    
    # Aumentamos el intervalo para dar más tiempo entre ejecuciones
    scheduler.add_job(
        async_generate_dungeons,
        trigger=IntervalTrigger(seconds=10,
                                timezone='America/Santiago'),
        id='process_tasks',
        max_instances=1,
        replace_existing=True,
    )
    
    if not scheduler.running:
        scheduler.start()

    print("Task processor started...")




async_generate_dungeons()