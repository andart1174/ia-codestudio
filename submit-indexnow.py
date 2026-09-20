import urllib.request
import json

payload = {
    "host": "ia-codestudio.com",
    "key": "c7f1a9b24e8d3c015b6a7e8f901234cd",
    "keyLocation": "https://ia-codestudio.com/c7f1a9b24e8d3c015b6a7e8f901234cd.txt",
    "urlList": [
        "https://ia-codestudio.com/",
        "https://ia-codestudio.com/ia-architecte-studio-ultra/",
        "https://ia-codestudio.com/cyber-creative-studio/",
        "https://ia-codestudio.com/how-to-create-3d-video-intro-ai-robot.html",
        "https://ia-codestudio.com/how-to-build-web-apps-with-ai-prompts.html",
        "https://ia-codestudio.com/cyber-arcade/",
        "https://ia-codestudio.com/hyperstudio-3d-4d/"
    ]
}

data = json.dumps(payload).encode('utf-8')
endpoints = ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"]

for ep in endpoints:
    try:
        req = urllib.request.Request(ep, data=data, headers={"Content-Type": "application/json; charset=utf-8"})
        with urllib.request.urlopen(req) as resp:
            print(ep, "HTTP", resp.status)
    except Exception as e:
        print(ep, "result:", e)
