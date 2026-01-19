import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { FiMapPin, FiDollarSign, FiHome, FiUser, FiPhone, FiMail, FiEdit, FiTrash2 } from 'react-icons/fi';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await api.delete(`/properties/${id}`);
      navigate('/my-properties');
    } catch (error) {
      alert('Error deleting property');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const isOwner = user && property.owner._id === user.id;
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="card overflow-hidden">
              {property.images && property.images.length > 0 ? (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                  <FiHome className="text-9xl text-blue-400" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="card p-6 animate-slide-up">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FiMapPin className="mr-2" />
                    <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.category === 'buy' ? 'bg-green-500' : 'bg-orange-500'
                  } text-white`}>
                    {property.category === 'buy' ? 'Buy' : 'Sell'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.type === 'house' ? 'bg-blue-500' : 'bg-purple-500'
                  } text-white`}>
                    {property.type === 'house' ? 'House' : 'Land'}
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-4 my-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="text-2xl font-bold text-blue-600 flex items-center">
                      <FiDollarSign />
                      {property.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Size</p>
                    <p className="text-xl font-semibold">{property.size} {property.sizeUnit}</p>
                  </div>
                  {property.type === 'house' && (
                    <>
                      <div>
                        <p className="text-gray-500 text-sm">Bedrooms</p>
                        <p className="text-xl font-semibold">{property.bedrooms}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Bathrooms</p>
                        <p className="text-xl font-semibold">{property.bathrooms}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {(isOwner || isAdmin) && (
                <div className="mt-6 flex space-x-4">
                  <Link
                    to={`/edit-property/${id}`}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <FiEdit />
                    <span>Edit Property</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <FiTrash2 />
                    <span>Delete Property</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <div className="card p-6 animate-slide-up">
              <h2 className="text-xl font-bold mb-4">Contact Owner</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiUser className="text-gray-400" />
                  <span className="font-semibold">{property.owner.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMail className="text-gray-400" />
                  <span>{property.owner.email}</span>
                </div>
                {property.owner.phone && (
                  <div className="flex items-center space-x-3">
                    <FiPhone className="text-gray-400" />
                    <span>{property.owner.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Property Info */}
            <div className="card p-6 animate-slide-up">
              <h2 className="text-xl font-bold mb-4">Property Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    property.status === 'available' ? 'text-green-600' :
                    property.status === 'sold' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed:</span>
                  <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
