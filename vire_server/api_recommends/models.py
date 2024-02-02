from rdflib import Graph, Literal, BNode, Namespace, RDF, URIRef
from SPARQLWrapper import SPARQLWrapper, POST, JSON

from django.db import models

# Create your models here.

schema = Namespace("https://schema.org/MusicRecording")