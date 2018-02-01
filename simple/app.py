import requests
import json

TEAM_ID = 7
REPOSITORY_URL = "https://github.com/infomiho/changecode"
REGISTER_URL = "http://52.233.158.172/change/api/en/account/register"
LOGIN_URL = "http://52.233.158.172/change/api/hr/account/login"
DETAILS_URL = "http://52.233.158.172/change/api/hr/team/details/%d" % (TEAM_ID)
CONFIRM_URL = "http://52.233.158.172/change/api/hr/team/confirm?id=%d&repository=%s" % (TEAM_ID, REPOSITORY_URL)

def register():
    register_data = {
	    "Teamname": "Dilseksicari",
	    "Password": "rafinerijskajuzina",
	    "Members": [
		    {"name":"Martin","surname": "Džida","mail": "martin.dzida@fer.hr"},
		    {"name":"Livio","surname": "Benčik","mail": "livio.bencik@fer.hr"},
		    {"name":"Mihovil","surname": "Ilakovac","mail": "mihovil.ilakovac@fer.hr"},
		    {"name":"Pavao","surname": "Jerebić","mail": "pavao.jerebic@fer.hr"}
	    ]
    }
    response = json.loads(requests.post(REGISTER_URL, register_data).text)
    if response['Errors'] : 
        print("Errors: ", *response['Errors'])
    else:
        print("Success:", team_data)

def login():
    login_data = {
        "Teamname": "Dilseksicari",
	    "Password": "rafinerijskajuzina"
    }
    response = json.loads(requests.post(LOGIN_URL, login_data).text)
    if response['Errors'] : 
        print("Errors: ", *response['Errors'])
    else:
        team_data = json.loads(response['Result'])
        print("Success:", team_data)
        return team_data['AuthorizationToken']

def details(token):
    response = json.loads(requests.get(DETAILS_URL, headers = {"X-Authorization": token}).text)
    if response['Errors'] : 
        print("Errors: ", *response['Errors'])
    else:
        team_data = json.loads(response['Result'])
        print("Success:", team_data)

def confirm(token):
    response = json.loads(requests.get(CONFIRM_URL, headers = {"X-Authorization": token}).text)
    if response['Errors'] : 
        print("Errors: ", *response['Errors'])
    else:
        team_data = json.loads(response['Result'])
        print("Success:", team_data)

if __name__ == '__main__':
    register()
    token = login()
    details(token)
    confirm(token)