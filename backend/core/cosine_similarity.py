import logging
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def calculate_similarity(resume_embeddings: list, keyword_embeddings: list) -> list:
    """Calculate cosine similarity between resume embeddings and keyword embeddings."""
    logger.info("Calculating similarity between resume chunks and keywords.")
    try:
        if not resume_embeddings or not keyword_embeddings:
            logger.warning("Empty embeddings provided for similarity calculation.")
            return []
            
        # Convert to numpy arrays for sklearn
        res_arr = np.array(resume_embeddings)
        kw_arr = np.array(keyword_embeddings)
        
        # Output shape: [len(resume_embeddings), len(keyword_embeddings)]
        similarity_matrix = cosine_similarity(res_arr, kw_arr)
        
        # We want the max similarity score for each keyword across any of the resume chunks
        # This implies: "Did the resume mention this skill in ANY of its sections?"
        best_match_per_keyword = np.max(similarity_matrix, axis=0)
        
        logger.info("Similarity calculation completed successfully.")
        return best_match_per_keyword.tolist()
        
    except Exception as e:
        logger.error(f"Error calculating similarity matrix: {e}")
        raise

def top_k_scores(scores: list, k: int = 10) -> list:
    """Return top-k highest similarity scores."""
    logger.info(f"Extracting top {k} scores from provided similarities.")
    try:
        if not scores:
            return []
            
        # Sort in descending order
        sorted_scores = sorted(scores, reverse=True)
        return sorted_scores[:k]
    except Exception as e:
        logger.error(f"Error extracting top-k scores: {e}")
        raise

def calculate_ats_score(top_scores: list) -> int:
    """Convert similarity scores to ATS score (0-100)."""
    logger.info("Calculating final ATS score.")
    try:
        if not top_scores:
            logger.warning("No top scores available to calculate ATS score. Returning 0.")
            return 0
            
        # Average of the top key matching scores
        avg_score = sum(top_scores) / len(top_scores)
        
        # The scores are cosine similarities, typically between 0.0 and 1.0. 
        # Map this proportionally to 100
        ats_score = int(avg_score * 100)
        
        # Bound between 0 and 100
        ats_score = max(0, min(ats_score, 100))
        
        logger.info(f"Calculated final ATS Score: {ats_score}/100")
        return ats_score
        
    except Exception as e:
        logger.error(f"Error calculating ATS score: {e}")
        raise