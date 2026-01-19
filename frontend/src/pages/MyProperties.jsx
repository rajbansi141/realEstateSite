import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FiEdit, FiTrash2, FiPlus, FiHome } from 'react-icons/fi';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties/user/my-properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await api.delete(`/properties/${id}`);
      fetchProperties();
    } catch (error) {
      alert('Error deleting property');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          <Link to="/add-property" className="btn-primary flex items-center space-x-2">
            <FiPlus />
            <span>Add New Property</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <FiHome className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-4">You haven't listed any properties yet</p>
            <Link to="/add-property" className="btn-primary inline-flex items-center space-x-2">
              <FiPlus />
              <span>Add Your First Property</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="card overflow-hidden animate-slide-up">
                <div className="h-48 bg-gray-200 relative">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                      <FiHome className="text-6xl text-blue-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      property.status === 'available' ? 'bg-green-500' :
                      property.status === 'sold' ? 'bg-red-500' : 'bg-yellow-500'
                    } text-white`}>
                      {property.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-600 font-bold">${property.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm">
                      {property.size} {property.sizeUnit}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/property/${property._id}`}
                      className="flex-1 btn-secondary text-center py-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-property/${property._id}`}
                      className="btn-primary flex items-center justify-center space-x-1 py-2 px-4"
                    >
                      <FiEdit />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
