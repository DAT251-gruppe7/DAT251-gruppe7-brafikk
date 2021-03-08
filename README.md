<p align="center">
  <img src="/assets/images/brafikk.png" class="center" height="140"/>
</p>

## Planning
- [Kanban board](https://github.com/oyjoh/DAT251-gruppe7-brafikk/projects/1)
- [Miro](https://miro.com/welcome/Ddp1pEl55pSpgQHEHqi676VSzTMRVSdOospUS44sKPiLzDjnuVT7OLJnaKSHkO2W)

## Requirements
* Clone repo ```[git clone https://github.com/oyjoh/DAT251-gruppe7-brafikk.git]```
* Python3
* Virtualenv
* Yarn

## Run/install backend
1. Navigate into the diretory ```[cd DAT251-gruppe7-brafikk]```
2. Create virtual environment ```[virtualenv -p python3 venv]```
3. Activate virtual environment ```[source venv/bin/activate]```
4. Install the dependencies ```[pip install -r requirements.txt]```
5. Run this command to start the backend server: ```[python manage.py runserver]``` (You have to run this command while you are sourced into the virtual environment)
* Address [localhost:8000](http://localhost:8000)
* After adding/changing models run ```[python manage.py migrate]```

## Run/install frontend
1. Navigate into the frontend directory ```[cd frontend]```
2. Install the dependencies ```[yarn install]```
3. Build ```[yarn build]``` 
4. Run this command to start the frontend development server: ```[yarn start]``` 
* Address [localhost:3000](http://localhost:3000)

## Useful Links
* [Sample project using react/django](https://librenepal.com/article/django-and-create-react-app-together-on-heroku/)

## Current technology stack
![Stack](/assets/images/temp_stack.png)
