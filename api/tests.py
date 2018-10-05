# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from .models import Todo

class ModelTestCase(TestCase):

    def setUp(self):
        # we need an api client to run the tests
        self.client = APIClient()

        # create a default todo in order to be able to test the GET functionality
        self.client.post(
            reverse('create'),
            {'name': 'Base todo'},
            format="json"
        )

    def test_api_can_create_a_todo(self):
        new_todo_data = {'name': 'New awesome todo'}
        response = self.client.post(
            reverse('create'),
            new_todo_data,
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_a_todo(self):
        todo = Todo.objects.get()
        response = self.client.get(
            reverse(
                'details',
                kwargs={'pk': todo.pk}
            ),
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, todo)

    def test_api_can_update_a_todo(self):
        todo = Todo.objects.get()
        updated_todo_data = {'name': 'updated name for the todo'}
        response = self.client.put(
            reverse(
                'details',
                kwargs={'pk': todo.id}
            ),
            updated_todo_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_can_delete_a_todo(self):
        todo = Todo.objects.get()
        response = self.client.delete(
            reverse(
                'details',
                kwargs={'pk': todo.id}
            ),
            format='json',
            follow=True
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

# Create your tests here.
