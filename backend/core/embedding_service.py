import os
import logging
import google.generativeai as genai
from dotenv import load_dotenv

# load .env
load_dotenv()

logger = logging.getLogger(__name__)

# get API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# configure gemini
genai.configure(api_key=GEMINI_API_KEY)


def generate_embedding(text: str):
    try:

        response = genai.embed_content(
            model="models/gemini-embedding-001",
            content=text
        )

        return response["embedding"]

    except Exception as e:
        logger.error(f"Embedding generation failed: {str(e)}")
        raise

def chunk_text(text: str, chunk_size: int = 300) -> list:
    """Split resume text into chunks."""
    logger.info(f"Chunking text into sizes of ~{chunk_size} words.")
    try:
        words = text.split()
        chunks = [' '.join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]
        logger.info(f"Generated {len(chunks)} text chunks.")
        for i, chunk in enumerate(chunks):
            logger.info(f"Chunk {i+1}: {chunk}")
        return chunks
    except Exception as e:
        logger.error(f"Error chunking text: {e}")
        raise

def generate_resume_embeddings(chunks: list) -> list:
    """Generate embeddings for each resume chunk."""
    logger.info(f"Generating embeddings for {len(chunks)} resume chunks.")
    embeddings = []
    try:
        for i, chunk in enumerate(chunks):
            # Check if chunk is not purely empty whitespace
            if chunk.strip():
                emb = generate_embedding(chunk)
                logger.info(f"Generated embedding vector for chunk {i+1}: {emb}")
                embeddings.append(emb)
        logger.info("Successfully generated embeddings for all valid resume chunks.")
        return embeddings
    except Exception as e:
        logger.error(f"Error generating resume chunk embeddings: {e}")
        raise

def generate_keyword_embeddings(keywords: list) -> list:
    """Generate embeddings for job keywords."""
    logger.info(f"Generating embeddings for {len(keywords)} keywords.")
    embeddings = []
    try:
        for kw in keywords:
            if kw.strip():
                # We do not use task_type for keyword representations
                response = genai.embed_content(
                    model="models/gemini-embedding-001",
                    content=kw.strip()
                )
                emb_vector = response["embedding"]
                logger.info(f"Generated embedding vector for keyword '{kw}': {emb_vector}")
                embeddings.append(emb_vector)
        logger.info("Successfully generated embeddings for all keywords.")
        return embeddings
    except Exception as e:
        logger.error(f"Error generating keyword embeddings: {e}")
        raise