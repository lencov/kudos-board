import { useState, useEffect } from 'react';
import { getCommentsByCardId, createComment, deleteComment } from './kudosBoardService';
import './Comments.css';

const Comments = ({ cardId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [newComment, setNewComment] = useState({ message: '', author: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            if (cardId) {
                setLoading(true);
                try {
                    const commentResults = await getCommentsByCardId(cardId);
                    setComments(commentResults || []);
                } catch (error) {
                    console.error('Failed to fetch comments:', error);
                    setComments([]);
                }
                setLoading(false);
            }
        };

        fetchComments();
    }, [cardId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.message.trim()) return;

        setSubmitting(true);
        try {
            const commentData = {
                message: newComment.message.trim(),
                author: newComment.author.trim() || 'Anonymous',
                cardId: cardId
            };

            const createdComment = await createComment(commentData);
            setComments(prevComments => [createdComment, ...prevComments]);
            setNewComment({ message: '', author: '' });
            setShowCommentForm(false);
        } catch (error) {
            console.error('Failed to create comment:', error);
        }
        setSubmitting(false);
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="comments-section">
            <div className="comments-header">
                <h4>Comments ({comments.length})</h4>
                <button
                    className="add-comment-button"
                    onClick={() => setShowCommentForm(!showCommentForm)}
                >
                    {showCommentForm ? 'Cancel' : 'Add Comment'}
                </button>
            </div>

            {showCommentForm && (
                <form className="comment-form" onSubmit={handleAddComment}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Your name (optional)"
                            value={newComment.author}
                            onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                            className="comment-author-input"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Write your comment..."
                            value={newComment.message}
                            onChange={(e) => setNewComment(prev => ({ ...prev, message: e.target.value }))}
                            className="comment-message-input"
                            rows="3"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={submitting || !newComment.message.trim()}>
                            {submitting ? 'Posting...' : 'Post Comment'}
                        </button>
                        <button type="button" onClick={() => setShowCommentForm(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="comments-list">
                {loading ? (
                    <div className="loading">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="no-comments">
                        <p>No comments yet. Be the first to comment</p>
                    </div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <span className="comment-author">{comment.author || 'Anonymous'}</span>
                                <span className="comment-date">{formatDate(comment.createdAt)}</span>
                                <button
                                    className="delete-comment-button"
                                    onClick={() => handleDeleteComment(comment.id)}
                                    title="Delete comment"
                                >
                                    🗑️
                                </button>
                            </div>
                            <div className="comment-message">
                                {comment.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Comments;
