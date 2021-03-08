# test_capitalize.py

from django.test import TestCase

def capitalize_string(s):
    if not isinstance(s, str):
        raise TypeError('Please provide a string')
    return s.capitalize()

def test_capitalize_string():
    assert capitalize_string('test') == 'Test'

#def test_capitalize_int():
    #assert capitalize_string(20) == 'Test'
