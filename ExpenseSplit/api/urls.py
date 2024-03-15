from .views import Index, user_list, user_creds, groupBasedOnUsername, create_group,update_expense,delete_expense,delete_group
from django.urls import path


urlpatterns = [
    path('',Index),
    path('users/', user_list, name='user-list'),
    path('groups/<str:username>/',groupBasedOnUsername),
    path('create-group/', create_group, name='create-group'),
    path('groups-update/<int:expenseId>/',update_expense,name='group-update'),
    path('expense-delete/<int:expenseId>/',delete_expense),
    path('group-delete/<int:groupId>/',delete_group),
    path('user-creds/<str:username>/',user_creds),
]
