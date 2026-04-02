/**
 * Pure UI component for song form fields
 */
const SongFormFields = ({ formData, errors, onChange }) => {
  return (
    <>
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
            onChange={onChange}
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
            onChange={onChange}
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
          {['lead', 'rhythm', 'bass', 'ukulele', 'other'].map(t => (
            <label key={t} className="checkbox-label">
              <input
                type="checkbox"
                name="type"
                value={t}
                checked={formData.type.includes(t)}
                onChange={onChange}
              />
              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
            </label>
          ))}
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
          onChange={onChange}
        >
          {['E Standard', 'Drop D', 'Drop C', 'Drop C#', 'Drop B', 'D Standard', 'C# Standard', 'C Standard', 'B Standard', 'Custom'].map(tuning => (
            <option key={tuning} value={tuning}>{tuning === 'Custom' ? 'Custom / Other' : tuning}</option>
          ))}
        </select>
        {formData.tuning === 'Custom' && (
          <input
            type="text"
            name="customTuning"
            value={formData.customTuning}
            onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Code available on Discord"
          className={errors.validationCode ? 'error' : ''}
        />
        {errors.validationCode && <span className="error-text">{errors.validationCode}</span>}
        <small className="help-text">
          The validation code is available on the community <a href="https://discord.com/invite/SP4tumnEx6" target="_blank" rel="noopener noreferrer">Discord Server</a>.
        </small>
      </div>
    </>
  );
};

export default SongFormFields;
