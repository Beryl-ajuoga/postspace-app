from django.shortcuts import get_list_or_404, get_object_or_404
from django.http import JsonResponse

from .models import Post

def get_posts(request):
    posts = get_list_or_404(Post)
    return JsonResponse([post.to_json() for post in posts], safe=False)

def login_user(request):
    if request.method == 'POST':
        data = request.POST
        username_or_email = data.get('username')
        password = data.get('password')

        # Check the login credentials (for demonstration purposes, we'll use hardcoded values)
        if (username_or_email == 'Bret' or username_or_email == 'bret@example.com') and password == '92988-3874':
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
