from django.conf import settings
from django.db.models import F
from django.http import FileResponse, Http404, HttpResponse, JsonResponse

from .models import DownloadStat

# platform -> filename inside DOWNLOADS_DIR
FILES = {
    "android": "Droply-debug.apk",
    "mac": "Droply-1.0.0.dmg",
}


def _path(platform):
    name = FILES.get(platform)
    return settings.DOWNLOADS_DIR / name if name else None


def index(request):
    html = settings.FRONTEND_DIST / "index.html"
    if not html.exists():
        return HttpResponse("Frontend not built. Run: cd frontend && npm run build", status=503)
    return HttpResponse(html.read_text(), content_type="text/html")


def info(request):
    counts = dict(DownloadStat.objects.values_list("platform", "count"))
    data = {}
    for platform in FILES:
        path = _path(platform)
        data[platform] = {
            "size_mb": round(path.stat().st_size / 1_000_000) if path and path.exists() else None,
            "downloads": counts.get(platform, 0),
        }
    return JsonResponse(data)


def download(request, platform):
    path = _path(platform)
    if not path or not path.exists():
        raise Http404("File not available")
    if request.method == "GET":
        stat, _ = DownloadStat.objects.get_or_create(platform=platform)
        DownloadStat.objects.filter(pk=stat.pk).update(count=F("count") + 1)
    return FileResponse(open(path, "rb"), as_attachment=True, filename=path.name)
