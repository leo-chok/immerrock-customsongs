import { useState, useCallback } from 'react';
import { useSongs } from './useSongs';

const INITIAL_STATE = {
  artist: '',
  title: '',
  type: [],
  tuning: 'E Standard',
  customTuning: '',
  link: '',
  author: '',
  validationCode: '',
};

/**
 * Hook to manage song creation form state and validation
 */
export const useSongForm = (onSuccess) => {
  const { addSong } = useSongs();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setSubmitStatus(null);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => {
        const currentTypes = prev.type || [];
        const newTypes = checked
          ? [...currentTypes, value]
          : currentTypes.filter(t => t !== value);
        return { ...prev, type: newTypes };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.artist.trim()) newErrors.artist = 'Artist is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.type || formData.type.length === 0) newErrors.type = 'Select at least one type';
    
    if (formData.tuning === 'Custom' && !formData.customTuning.trim()) {
      newErrors.customTuning = 'Custom tuning is required';
    }

    if (!formData.link.trim()) {
      newErrors.link = 'Link is required';
    } else if (!formData.link.startsWith('http')) {
      newErrors.link = 'Link must start with http:// or https://';
    }

    if (!formData.author.trim()) newErrors.author = 'Your name is required';
    if (!formData.validationCode.trim()) newErrors.validationCode = 'Upload password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validate()) {
      setSubmitStatus({ type: 'error', message: 'Please correct the errors' });
      return;
    }

    setSubmitStatus({ type: 'loading', message: 'Submitting...' });

    const { validationCode, customTuning, ...songData } = formData;
    
    // Process tuning
    if (songData.tuning === 'Custom') {
      songData.tuning = customTuning;
    }
    
    // Prepare for API
    const preparedData = {
      ...songData,
      type: songData.type.join(', '),
      password: validationCode
    };
    
    const result = await addSong(preparedData);

    if (result.success) {
      setSubmitStatus({ type: 'success', message: 'Song added successfully!' });
      resetForm();
      if (onSuccess) onSuccess();
    } else {
      setSubmitStatus({ type: 'error', message: result.error || 'Error adding song' });
    }
  };

  return {
    formData,
    errors,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm,
    setSubmitStatus
  };
};

export default useSongForm;
