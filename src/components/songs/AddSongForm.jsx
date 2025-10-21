import { useState } from 'react';
import { useSongs } from '../../hooks/useSongs';
import './AddSongForm.css';

const AddSongForm = () => {
  const { addSong } = useSongs();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    artist: '',
    title: '',
    type: [],
    tuning: 'E Standard',
    customTuning: '',
    link: '',
    author: '',
    validationCode: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle checkbox for type selection
      setFormData(prev => {
        const currentTypes = prev.type || [];
        const newTypes = checked
          ? [...currentTypes, value]
          : currentTypes.filter(t => t !== value);
        return {
          ...prev,
          type: newTypes,
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist is required';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.type || formData.type.length === 0) {
      newErrors.type = 'Select at least one type';
    }

    if (formData.tuning === 'Custom' && !formData.customTuning.trim()) {
      newErrors.customTuning = 'Custom tuning is required';
    }

    if (!formData.link.trim()) {
      newErrors.link = 'Link is required';
    } else if (!formData.link.startsWith('http')) {
      newErrors.link = 'Link must start with http:// or https://';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Your name is required';
    }

    // Validation code - Replace with the real validation code
    // For now, using an example code
    if (!formData.validationCode.trim()) {
      newErrors.validationCode = 'Validation code is required';
    } else if (formData.validationCode !== 'IMMERROCK2025') {
      newErrors.validationCode = 'Incorrect validation code (available on Discord)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please correct the errors' });
      return;
    }

    setSubmitStatus({ type: 'loading', message: 'Submitting...' });

    const { validationCode, customTuning, ...songData } = formData;
    // Use custom tuning if selected
    if (songData.tuning === 'Custom') {
      songData.tuning = customTuning;
    }
    // Convert type array to string
    songData.type = songData.type.join(', ');
    
    const result = await addSong(songData);

    if (result.success) {
      setSubmitStatus({ type: 'success', message: 'Song added successfully!' });
      setFormData({
        artist: '',
        title: '',
        type: [],
        tuning: 'E Standard',
        customTuning: '',
        link: '',
        author: '',
        validationCode: '',
      });
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus(null);
      }, 2000);
    } else {
      setSubmitStatus({ type: 'error', message: result.error || 'Error adding song' });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitStatus(null);
    setErrors({});
  };

  return (
    <>
      <button className="open-form-btn" onClick={() => setIsOpen(true)}>
        <span className="btn-text">Add a Song</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add a Song</h2>
              <button className="close-btn" onClick={handleClose}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="song-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="artist">
                    Artist <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    placeholder="Metallica, Iron Maiden..."
                    className={errors.artist ? 'error' : ''}
                  />
                  {errors.artist && <span className="error-text">{errors.artist}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="title">
                    Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter Sandman, The Trooper..."
                    className={errors.title ? 'error' : ''}
                  />
                  {errors.title && <span className="error-text">{errors.title}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Type <span className="required">*</span>
                </label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="type"
                      value="lead"
                      checked={formData.type.includes('lead')}
                      onChange={handleChange}
                    />
                    <span>Lead</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="type"
                      value="rhythm"
                      checked={formData.type.includes('rhythm')}
                      onChange={handleChange}
                    />
                    <span>Rhythm</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="type"
                      value="bass"
                      checked={formData.type.includes('bass')}
                      onChange={handleChange}
                    />
                    <span>Bass</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="type"
                      value="ukulele"
                      checked={formData.type.includes('ukulele')}
                      onChange={handleChange}
                    />
                    <span>Ukulele</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="type"
                      value="other"
                      checked={formData.type.includes('other')}
                      onChange={handleChange}
                    />
                    <span>Other</span>
                  </label>
                </div>
                {errors.type && <span className="error-text">{errors.type}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="tuning">
                  Tuning <span className="required">*</span>
                </label>
                <select
                  id="tuning"
                  name="tuning"
                  value={formData.tuning}
                  onChange={handleChange}
                >
                  <option value="E Standard">E Standard</option>
                  <option value="Drop D">Drop D</option>
                  <option value="Drop C">Drop C</option>
                  <option value="Drop C#">Drop C#</option>
                  <option value="Drop B">Drop B</option>
                  <option value="D Standard">D Standard</option>
                  <option value="C# Standard">C# Standard</option>
                  <option value="C Standard">C Standard</option>
                  <option value="B Standard">B Standard</option>
                  <option value="Custom">Custom / Other</option>
                </select>
                {formData.tuning === 'Custom' && (
                  <input
                    type="text"
                    name="customTuning"
                    value={formData.customTuning}
                    onChange={handleChange}
                    placeholder="Enter custom tuning..."
                    className={errors.customTuning ? 'error' : ''}
                    style={{ marginTop: '0.5rem' }}
                  />
                )}
                {errors.customTuning && <span className="error-text">{errors.customTuning}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="link">
                  Download Link <span className="required">*</span>
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  className={errors.link ? 'error' : ''}
                />
                {errors.link && <span className="error-text">{errors.link}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="author">
                  Your Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Your nickname"
                  className={errors.author ? 'error' : ''}
                />
                {errors.author && <span className="error-text">{errors.author}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="validationCode">
                  Validation Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="validationCode"
                  name="validationCode"
                  value={formData.validationCode}
                  onChange={handleChange}
                  placeholder="Code available on Discord"
                  className={errors.validationCode ? 'error' : ''}
                />
                {errors.validationCode && <span className="error-text">{errors.validationCode}</span>}
                <small className="help-text">
                  The validation code is available on the community Discord server
                </small>
              </div>

              {submitStatus && (
                <div className={`submit-status ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitStatus?.type === 'loading'}
                >
                  {submitStatus?.type === 'loading' ? 'Submitting...' : 'Add Song'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSongForm;
