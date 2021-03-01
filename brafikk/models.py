from django.db import models

# Create your models here.
class Brafikk(models.Model):
    title = models.CharField(max_length=50, default="notitle")
    status = models.TextField(default="nostatus")

    def _str_(self):
        return self.status