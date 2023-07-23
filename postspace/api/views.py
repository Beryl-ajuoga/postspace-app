from django.shortcuts import get_list_or_404, get_object_or_404
from django.http import JsonResponse
from .models import Post, Comment



def get_user_posts(request):
    posts = get_list_or_404(Post)
    return JsonResponse([post.to_json() for post in posts], safe=False)


def login_user(request):
    if request.method == 'POST':
        data = request.POST
        username_or_email = data.get('username'),
        password = data.get('password')

        #Checks the login credentials 
        if (username_or_email == 'Bret' or username_or_email == 'bret@example.com') and password == '92988-3874':
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def get_posts(request):
    if request.method == 'POST':
        data = request.POST
        username_or_email = data.get('username')
        password = data.get('password')

        if (username_or_email =='Bret' or username_or_email == 'bret@gmail.com')and password == '92988-3874':
            return JsonResponse({'success':True})
        else:
            return JsonResponse({'error':'Invalid credentials'},statu =401)
    else:
        return JsonResponse({'failed':'No data availabel'})
    

def get_post_comments(request, post_id):
    post = get_object_or_404(Post,  id=post_id)
    comments = Comment.objects.filter(post=post)
    return JsonResponse([comment.to_json() for comment in comments], safe=False)

    

def like_post(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(Post, id=post_id)
        post.likes += 1
        post.save()
    

    return JsonResponse({'success': True, 'message': 'Post liked'})



def increment_post_views(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    # incrementing the view count for post
    post.view_count +=1
    post.save()

    return JsonResponse({'success': True, 'message': f'View count for post {post_id} updated.'})



# Added payment method
def make_payment(request):
    if request.method == 'POST':
        data = request.POST
        amount = data.get('amount')

    return JsonResponse({'success':True, 'message':f'Payment successful. Amount: {amount}'}) 

    


def block_post(request):
    if request.method == 'POST':
        data = request.POST
        user_id =data.get('user_id')
        post_id = data.get('post_id')

        blocked_post.add((user_id, post_id))


        return JsonResponse({'success': True, 'message': 'Post blocked successfully.'})
    

    return JsonResponse({'error': 'Invalid request method'}, status=400)

    
    




