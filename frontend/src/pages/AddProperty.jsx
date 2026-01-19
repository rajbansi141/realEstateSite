import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FiAlertCircle } from 'react-icons/fi';

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'house',
    category: 'sell',
    price: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    size: '',
    sizeUnit: 'sqft',
    bedrooms: '',
    bathrooms: '',
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.location.address.trim()) newErrors['location.address'] = 'Address is required';
    if (!formData.location.city.trim()) newErrors['location.city'] = 'City is required';
    if (!formData.location.state.trim()) newErrors['location.state'] = 'State is required';
    if (!formData.size || formData.size <= 0) newErrors.size = 'Valid size is required';

    if (formData.type === 'house') {
      if (formData.bedrooms === '' || formData.bedrooms < 0) newErrors.bedrooms = 'Valid number of bedrooms is required';
      if (formData.bathrooms === '' || formData.bathrooms < 0) newErrors.bathrooms = 'Valid number of bathrooms is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        price: Number(formData.price),
        size: Number(formData.size),
        bedrooms: formData.type === 'house' ? Number(formData.bedrooms) : 0,
        bathrooms: formData.type === 'house' ? Number(formData.bathrooms) : 0,
      };
      
      await api.post('/properties', submitData);
      navigate('/my-properties');
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Error creating property' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error
    if (errors[name] || errors[`location.${name.split('.')[1]}`]) {
      setErrors({
        ...errors,
        [name]: '',
        [`location.${name.split('.')[1]}`]: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Property</h1>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6 animate-slide-down">
              <FiAlertCircle />
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="house">House</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="sell">Sell</option>
                  <option value="buy">Buy</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter property title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`input-field ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Enter property description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`input-field ${errors.price ? 'border-red-500' : ''}`}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className={`input-field ${errors.size ? 'border-red-500' : ''}`}
                  placeholder="Enter size"
                />
                {errors.size && (
                  <p className="mt-1 text-sm text-red-600">{errors.size}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size Unit</label>
                <select
                  name="sizeUnit"
                  value={formData.sizeUnit}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="sqft">Square Feet</option>
                  <option value="sqm">Square Meters</option>
                  <option value="acres">Acres</option>
                </select>
              </div>
            </div>

            {formData.type === 'house' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms *</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min="0"
                    className={`input-field ${errors.bedrooms ? 'border-red-500' : ''}`}
                  />
                  {errors.bedrooms && (
                    <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms *</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min="0"
                    className={`input-field ${errors.bathrooms ? 'border-red-500' : ''}`}
                  />
                  {errors.bathrooms && (
                    <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    className={`input-field ${errors['location.address'] ? 'border-red-500' : ''}`}
                    placeholder="Street address"
                  />
                  {errors['location.address'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['location.address']}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="location.city"
                      value={formData.location.city}
                      onChange={handleChange}
                      className={`input-field ${errors['location.city'] ? 'border-red-500' : ''}`}
                      placeholder="City"
                    />
                    {errors['location.city'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['location.city']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <input
                      type="text"
                      name="location.state"
                      value={formData.location.state}
                      onChange={handleChange}
                      className={`input-field ${errors['location.state'] ? 'border-red-500' : ''}`}
                      placeholder="State"
                    />
                    {errors['location.state'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['location.state']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      name="location.zipCode"
                      value={formData.location.zipCode}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Zip code"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Property'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/my-properties')}
                className="btn-secondary py-3 px-6"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
