from SPARQLWrapper import SPARQLWrapper, POST, JSON
from stardog import Connection

connection_details = {
    'endpoint': 'https://sd-fafb9c0b.stardog.cloud:5820',
    'username': 'liviu.istrate1@gmail.com',
    'password': 'vireadmin1234'
}

conn = Connection('vire', **connection_details)

prefixes = '''
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX ns1: <http://purl.org/ontology/mo/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
'''

select_query = '''
    SELECT ?track ?title ?artist ?album ?genre ?year
    WHERE {
        ?track a ns1:Release ;
        dc:title ?title ;
        foaf:artist ?artist ;
        ns1:album ?album ;
        ns1:genre ?genre ;
        dc:year ?year .
        }
'''

def filter_artist(artist_name):
    query = prefixes + select_query + "FILTER (CONTAINS(UCASE(?artist), UCASE('{artist_name}'))) } " + "LIMIT 30"
    return query

def filter_genre(genre_name):
    query = prefixes + select_query + "FILTER (CONTAINS(UCASE(?genre), UCASE('{genre_name}'))) } " + "LIMIT 30"
    return query

def filter_year(year):
    query = prefixes + select_query + "FILTER (?year = {year}) } " + "LIMIT 30"
    return query
