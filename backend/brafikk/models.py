from django.db import models

# Create your models here.
class Brafikk(models.Model):
    status = models.TextField()

    def _str_(self):
        return self.status