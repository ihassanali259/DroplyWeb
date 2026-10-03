# Deploy Droply on PythonAnywhere (free)

1. Sign up at pythonanywhere.com (Beginner/free). Your site will be https://YOURNAME.pythonanywhere.com
2. Push this folder to GitHub (the installers in `downloads/` are NOT pushed; you upload them in step 6).
3. PythonAnywhere -> Consoles -> Bash:
   ```
   git clone https://github.com/YOU/droply-web.git
   cd droply-web
   mkvirtualenv droply --python=python3.12
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py collectstatic --noinput
   ```
4. Web tab -> Add a new web app -> Manual configuration -> Python 3.12.
   Virtualenv: `/home/YOURNAME/.virtualenvs/droply`
   Source code: `/home/YOURNAME/droply-web`
5. Click the WSGI configuration file link, replace everything with:
   ```python
   import os, sys
   sys.path.insert(0, '/home/YOURNAME/droply-web')
   os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
   os.environ['DJANGO_DEBUG'] = '0'
   os.environ['DJANGO_SECRET_KEY'] = 'paste-a-long-random-string'
   os.environ['DJANGO_ALLOWED_HOSTS'] = 'YOURNAME.pythonanywhere.com'
   from django.core.wsgi import get_wsgi_application
   application = get_wsgi_application()
   ```
6. Files tab -> `/home/YOURNAME/droply-web/downloads/` -> upload `Droply-debug.apk` and `Droply-1.0.0.dmg`.
7. Web tab -> Reload. Visit your URL.

Update later: `git pull`, `python manage.py collectstatic --noinput`, Reload.
After frontend changes run `cd frontend && npm run build` locally and commit `frontend_dist/`.
