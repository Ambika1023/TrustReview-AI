import chromadb

from sentence_transformers import (
    SentenceTransformer
)

# Create embedding model
embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# Create Chroma client
client = chromadb.Client()

# Create collection
collection = client.create_collection(
    name="reviews"
)

# Sample review knowledge base
reviews = [

"""
Fake reviews are misleading product reviews
created to manipulate customer opinions and
increase product ratings artificially.
""",

"""
AI detects fake reviews using Natural Language
Processing, sentiment analysis, behavioral
patterns, and spam detection algorithms.
""",

"""
Repeated promotional phrases, excessive
punctuation, unrealistic positivity, and
duplicate wording are strong indicators
of suspicious reviews.
""",

"""
Fraudulent reviews reduce customer trust,
damage ecommerce credibility, and create
unfair competition among sellers.
""",

"""
Machine learning models such as XGBoost,
BERT, and neural networks can classify
reviews as genuine or fake using textual
patterns and metadata analysis.
""",

"""
RAG systems improve chatbot accuracy by
retrieving relevant contextual information
before generating AI responses.
""",

"""
Verified reviews and transparency systems
help ecommerce platforms improve customer
trust and reduce misleading product ratings.
"""
]
# Store embeddings
for i, review in enumerate(reviews):

    embedding = embedding_model.encode(
        review
    ).tolist()

    collection.add(
        ids=[str(i)],
        embeddings=[embedding],
        documents=[review]
    )

def retrieve_context(query):

    query_embedding = embedding_model.encode(
        query
    ).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    return results["documents"][0]