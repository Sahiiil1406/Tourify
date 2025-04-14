import React, { useState, useEffect } from 'react';
import { Star, StarHalf, X, Filter, Plus } from 'lucide-react';

const Reviews = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter state
  const [filter, setFilter] = useState('');
  
  // Initial reviews array
  const [reviews, setReviews] = useState([
    { id: 1, place: 'Main Library', rating: 4.5, comment: 'Quiet environment, great study spot.' },
    { id: 2, place: 'Student Activity Center (SAC)', rating: 5, comment: 'Lots of fun activities! Highly recommended.' },
    { id: 3, place: 'Health Care Centre (HCC)', rating: 3.5, comment: 'Good service but sometimes crowded.' },
    { id: 4, place: 'Swimming Pool', rating: 4, comment: 'Clean facilities, could use longer opening hours.' },
    { id: 5, place: 'NITK Beach', rating: 4.5, comment: 'Beautiful sunset views, perfect for evening walks.' }
  ]);
  
  // Filtered reviews
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  // Form state
  const [newReview, setNewReview] = useState({
    place: '',
    rating: 5,
    comment: ''
  });

  // Error handling
  const [error, setError] = useState('');

  // Update filtered reviews when filter or reviews change
  useEffect(() => {
    if (filter === '') {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter(review => review.place === filter));
    }
  }, [filter, reviews]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? parseFloat(value) : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newReview.place.trim() || !newReview.comment.trim()) {
      setError('Please fill out all fields');
      return;
    }
    
    const reviewToAdd = {
      id: reviews.length + 1,
      ...newReview
    };
    
    setReviews([...reviews, reviewToAdd]);
    setNewReview({ place: '', rating: 5, comment: '' });
    setError('');
    setIsModalOpen(false);
  };

  // Delete a review
  const handleDelete = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  // Get unique locations for filter
  const locations = ['', ...new Set(reviews.map(review => review.place))];

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="inline text-yellow-400" size={16} fill="currentColor" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="inline text-yellow-400" size={16} fill="currentColor" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="inline text-gray-400" size={16} />);
    }
    
    return stars;
  };

  return (
    <div className="bg-black text-white h-full flex flex-col">
      {/* Header with Add Review Button and Filter */}
      <div className="flex-none p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Location Reviews</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 text-white py-1 pl-8 pr-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {locations.filter(loc => loc !== '').map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <Filter size={16} className="absolute left-2 top-2 text-gray-400" />
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded flex items-center text-sm"
          >
            <Plus size={16} className="mr-1" /> Add Review
          </button>
        </div>
      </div>
      
      {/* Reviews List - Scrollable */}
      <div className="flex-grow overflow-hidden bg-black m-4 rounded-lg flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          {filteredReviews.length === 0 ? (
            <p className="text-gray-400">
              {filter ? `No reviews found for ${filter}` : 'No reviews yet. Be the first to add one!'}
            </p>
          ) : (
            <div className="space-y-3 bg-black">
              {filteredReviews.map(review => (
                <div key={review.id} className="bg-[#303030] p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base">{review.place}</h3>
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center mt-1 mb-1">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-gray-400 text-xs">{review.rating}/5</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold mb-4">Add New Review</h2>
            
            {error && (
              <div className="bg-red-900 text-white p-2 mb-4 rounded text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-sm">Place</label>
                <select 
                  name="place" 
                  value={newReview.place} 
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                >
                  <option value="">Select a location</option>
                  <option value="Health Care Centre (HCC)">Health Care Centre (HCC)</option>
                  <option value="Swimming Pool">Swimming Pool</option>
                  <option value="Main Library">Main Library</option>
                  <option value="E-Library">E-Library</option>
                  <option value="Sports Complex">Sports Complex</option>
                  <option value="Student Activity Center (SAC)">Student Activity Center (SAC)</option>
                  <option value="NITK Beach">NITK Beach</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">Rating</label>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    name="rating" 
                    min="1" 
                    max="5" 
                    step="0.5" 
                    value={newReview.rating} 
                    onChange={handleInputChange}
                    className="w-full mr-2"
                  />
                  <span className="min-w-8 text-center text-sm">{newReview.rating}</span>
                </div>
                <div className="mt-1">
                  {renderStars(newReview.rating)}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm">Comment</label>
                <textarea 
                  name="comment" 
                  value={newReview.comment} 
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition text-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;