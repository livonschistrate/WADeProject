from rdflib import Graph, Literal, Namespace, RDF, URIRef
import discogs_client
import re
import time

mo = Namespace("http://purl.org/ontology/mo/")
dc = Namespace("http://purl.org/dc/elements/1.1/")
foaf = Namespace("http://xmlns.com/foaf/0.1/")

discogs = discogs_client.Client('vire', user_token="qaynTmHYDSRNGIXlTDZbaEYmKOKQIIShdOpmFiMc")

artists = []
songs = []
song_ids = []

def check_song(result):
    if result.title is not None and len(result.artists) > 0 \
    and len(result.genres) > 0 and result.year is not None \
    and len(result.tracklist) > 0:
        return True

def search_tracks(artist):
    if artist is not None:
        search_results = discogs.search(per_page = 50, type='release', artist=artist)
        savingfile = 'artist_tracks.ttl'
    else:
        search_results = discogs.search(per_page = 50, type='release')
        savingfile = 'all_tracks.ttl'
    for page_nr in range(1, search_results.pages+1):
        results_per_page = search_results.page(page_nr)
        for result in results_per_page:
            if check_song(result):
                for track in result.tracklist:
                    song_id = re.sub('[^0-9a-zA-Z]+', '', track.title) + '-' + re.sub('[^0-9a-zA-Z]+', '', result.artists[0].name)
                    if song_id not in song_ids:
                        songs.append(track)
                        song_ids.append(song_id)
                        song_graph = Graph()
                        track_uri = mo['#track-' + song_id]
                        song_graph.add((track_uri, RDF.type, mo.Release))
                        song_graph.add((track_uri, dc['title'], Literal(track.title)))
                        song_graph.add((track_uri, dc['year'], Literal(result.year)))
                        song_graph.add((track_uri, mo['genre'], Literal(result.genres)))
                        song_graph.add((track_uri, mo['album'], Literal(result.title)))
                        
                        for artist in result.artists:
                            song_graph.add((track_uri, foaf['artist'], Literal(artist.name)))
                        
                        ttl_data = song_graph.serialize(format='turtle')
                        with open(savingfile, 'a', encoding='utf-8') as ttl_file:
                            ttl_file.write(ttl_data)      
    

def get_tracks():
    search_tracks(None)

vinyls = []
artist_from_vinyl = []
artist_from_current_vinyl = []
tracks_from_vinyl = []

def check_vinyl(result):
    if result.title != '' and result.title is not None \
    and result.genres is not None and result.artists is not None \
    and result.tracklist is not None:
        return True
 
def get_vinyls():
    search_results = discogs.search(format='Vinyl', per_page = 50)
    for page_nr in range(1, search_results.pages+1):
        try:
            results_per_page = search_results.page(page_nr)
            for result in results_per_page:
                vinyl_graph, artist_graph, song_graph = Graph(), Graph(), Graph()
                artist_from_current_vinyl = []
                vinyl_has_all_details = False
                try:
                    if check_vinyl(result): 
                        if (result.title, result.year, result.artists, result.genres) not in vinyls:
                            vinyls.append((result.title, result.year, result.artists, result.genres))
                            
                            vinyl_has_all_details = True
                            vinyl_uri = mo['#vinyl-' + str(result.id)]
                            vinyl_graph.add((vinyl_uri, RDF.type, mo.Vinyl))
                            vinyl_graph.add((vinyl_uri, dc['title'], Literal(result.title)))
                            if result.year != 0:
                                vinyl_graph.add((vinyl_uri, dc['year'], Literal(result.year)))
                            if result.images:
                                vinyl_graph.add((vinyl_uri, mo['image'], Literal(result.images[0]['uri'])))     
                            
                        try:
                            if len(result.artists) > 0 and result.artists is not None:
                                for artist in result.artists:
                                    if artist.name not in artist_from_vinyl and artist.name != '':
                                        artist_from_current_vinyl.append(artist.name)
                                        artist_from_vinyl.append(artist.name)
                                        
                                        artist_uri = mo['#artist-' + str(artist.id)]
                                        artist_graph.add((artist_uri, RDF.type, mo.Artist))
                                        artist_graph.add((artist_uri, foaf['name'], Literal(artist.name)))
                                        try:
                                            if artist.images is not None and len(artist.images) > 0:
                                                if artist.images[0]['uri'] is not None:
                                                    artist_graph.add((artist_uri, mo['artistImage'], Literal(artist.images[0]['uri'])))
                                        except:
                                            print("artist image not found")        
                                    
                                        ttl_data = artist_graph.serialize(format='turtle')
                                        with open('artists_from_vinyl.ttl', 'a', encoding='utf-8') as ttl_file:
                                            ttl_file.write(ttl_data)
                                        
                                    if vinyl_has_all_details:
                                        vinyl_graph.add((vinyl_uri, foaf['name'], Literal(artist.name)))
                        except:
                            print("artists not found")
                            
                        try:
                            if len(result.tracklist) > 0 and result.tracklist is not None:
                                for track in result.tracklist:
                                    current_track = re.sub('[^0-9a-zA-Z]+', '', track.title)
                                    if current_track != '' and current_track not in tracks_from_vinyl:
                                        tracks_from_vinyl.append(current_track)
                                        track_uri = mo["#track-" + re.sub('[^0-9a-zA-Z]+', '', current_track)]
                                        
                                        try:
                                            song_graph.add((track_uri, RDF.type, mo.Track))
                                            song_graph.add((track_uri, dc['title'], Literal(track.title)))
                                            
                                            if track.duration != 0 and track.duration is not None and track.duration != '':
                                                song_graph.add((track_uri, mo['duration'], Literal(track.duration)))
                                            if result.genres is not None and len(result.genres) > 0:
                                                song_graph.add((track_uri, mo['genre'], Literal(result.genres[0])))
                                            if result.year != 0:
                                                song_graph.add((track_uri, dc['year'], Literal(result.year)))
                                            if len(artist_from_current_vinyl) > 0 and artist_from_current_vinyl is not None:
                                                for artist in artist_from_current_vinyl:
                                                    song_graph.add((track_uri, mo['artist'], Literal(artist)))
                                                    
                                            if vinyl_has_all_details:
                                                vinyl_graph.add((vinyl_uri, mo['track'], track_uri)) 
                                                    
                                        except:
                                            print("track cannot be added")
                                ttl_data = song_graph.serialize(format='turtle')
                                with open('tracks_from_vinyl.ttl', 'a', encoding='utf-8') as ttl_file:
                                    ttl_file.write(ttl_data)
                        except:
                            print("tracklist not found")
                            
                        try:
                            if result.genres is not None:
                                genre_list = []
                                for genre in result.genres:
                                    if genre not in genre_list:
                                        genre_list.append(genre)
                                    if vinyl_has_all_details:
                                        vinyl_graph.add((vinyl_uri, mo['genre'], Literal(genre)))
                        except:
                            print("genres not found")
                        
                        if vinyl_has_all_details and check_vinyl(result):
                            ttl_data = vinyl_graph.serialize(format='turtle')
                            with open('all_vinyls.ttl', 'a', encoding='utf-8') as ttl_file:
                                ttl_file.write(ttl_data)     
                except:
                    print("instance of vinyl not found")
        except discogs_client.exceptions.HTTPError as e:
            print("discogs request error encountered")

# get_tracks() 
get_vinyls() 