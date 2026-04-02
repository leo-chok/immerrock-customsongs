import { useSongForm } from '../../hooks/useSongForm';
import SongFormFields from './SongFormFields';
import './AddSongForm.css';

/**
 * Modal container for adding a new song to the library
 */
const AddSongForm = ({ externalIsOpen, onToggle }) => {
  const { 
    formData, 
    errors, 
    submitStatus, 
    handleChange, 
    handleSubmit, 
    resetForm 
  } = useSongForm(() => {
    // Optional additional logic on success
  });

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : false;

  const handleClose = () => {
    onToggle(false);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add a Song</h2>
        </div>

        <form onSubmit={handleSubmit} className="song-form">
          <SongFormFields 
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />

          {submitStatus && (
            <div className={`submit-status ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={handleClose}
            >
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
  );
};

export default AddSongForm;
