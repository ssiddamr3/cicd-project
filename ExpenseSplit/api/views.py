from django.shortcuts import render,HttpResponse, get_object_or_404
from .models import Users, Groups
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.forms.models import model_to_dict

# Create your views here.
def Index(request):
    return HttpResponse('It is working')


def user_list(request):
    users = Users.objects.all()
    data = {'users': list(users.values())}
    return JsonResponse(data)

def user_creds(request, username):
    user = Users.objects.filter(username=username).first()
    if user:
        user_dict = model_to_dict(user)
        return JsonResponse(user_dict)
    else:
        return JsonResponse({'error': 'User not found'}, status=404)

def groupBasedOnUsername(request,username):
    groups = list(Groups.objects.filter(username=username).values())
    return JsonResponse({'groups': groups})

@csrf_exempt
def create_group(request):
    if request.method == 'POST':
        group_id = request.POST.get('groupid')
        username_str = request.POST.get('username')
        expenses = request.POST.get('expenses')
        member_1 = request.POST.get('member_1')
        member_2 = request.POST.get('member_2')
        member_3 = request.POST.get('member_3')
        user, created = Users.objects.get_or_create(username=username_str)
        new_group = Groups(
            groupid=group_id,
            username=user,
            expenses=expenses,
            member_1=member_1,
            member_2=member_2,
            member_3=member_3
        )
        new_group.save()
        return JsonResponse({'message': 'Group created successfully'})
    return JsonResponse({'message': 'GET request received, use POST to create a group'})
@csrf_exempt
def update_expense(request,expenseId):
    group = get_object_or_404(Groups,pk=expenseId)
    data = json.loads(request.body.decode('utf-8'))
    
    if 'expenses' in data:
        group.expenses = data['expenses']
    
    if 'member_1' in data:
        group.member_1 = data['member_1']
    
    if 'member_2' in data:
        group.member_2 = data['member_2']
    
    if 'member_3' in data:
        group.member_3 = data['member_3']
    
    group.save()
    
    return JsonResponse({'message': 'Group updated successfully'})


@csrf_exempt
def delete_expense(request,expenseId):
    expenseItem = Groups.objects.get(pk=expenseId)
    expenseItem.delete()
    return JsonResponse({'message': 'Expense deleted successfully'})

@csrf_exempt
def delete_group(request,groupId):
    groups = Groups.objects.filter(groupid=groupId)
    groups.delete()
    return JsonResponse({'message':'Group deleted successfully'})



