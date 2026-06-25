# Aligne les champs Project sur le parcours owner (voir backlog-dev.md item M1).

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0005_profile_about'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='short_description',
            new_name='summary',
        ),
        migrations.RenameField(
            model_name='project',
            old_name='description',
            new_name='context',
        ),
        migrations.RenameField(
            model_name='project',
            old_name='challenge',
            new_name='problem',
        ),
        migrations.AddField(
            model_name='project',
            name='deep_dive',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='project',
            name='results',
            field=models.TextField(blank=True, default=''),
        ),
    ]
