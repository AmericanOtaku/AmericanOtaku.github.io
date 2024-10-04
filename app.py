from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'
YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'

def search_youtube(query):
    params = {
        'part': 'snippet',
        'q': query,
        'type': 'video',
        'key': YOUTUBE_API_KEY,
        'maxResults': 10
    }
    response = requests.get(YOUTUBE_SEARCH_URL, params=params)
    results = response.json()
    videos = []
    for item in results['items']:
        video_id = item['id']['videoId']
        video_title = item['snippet']['title']
        video_link = f'https://www.youtube.com/watch?v={video_id}'
        videos.append({"title": video_title, "link": video_link})
    return videos

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('query')
    videos = search_youtube(query)
    return jsonify(videos)

if __name__ == '__main__':
    app.run(debug=True)