from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    likes = models.PositiveBigIntegerField(default=0)
    view_count = models.PositiveBigIntegerField(default=0)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')  
    user = models.CharField(max_length=100)
    text = models.TextField()  


    def __str__(self):
        return self.title

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
        }
