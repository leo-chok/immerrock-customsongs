import { useState, useEffect } from "react";
import AdminPasswordModal from "../admin/AdminPasswordModal";
import { setAdminToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useSongs } from "../../hooks/useSongs";
import { useSongsFilter } from "../../hooks/useSongsFilter";
import SongCard from "./SongCard";
import AddSongForm from "./AddSongForm";
import Loading from "../common/Loading";
import SearchBar from "./SearchBar";
import FiltersRow from "./FiltersRow";
import SortHeader from "./SortHeader";
import Pagination from "./Pagination";
import NoResults from "./NoResults";
import "./SongList.css";

const SONGS_PER_PAGE = 20;
const SECRET_PHRASE = "letmerock";

const SongList = () => {
  const navigate = useNavigate();
  const { songs, loading, error } = useSongs();
  
  // Logic centralized in specialized hook
  const {
    searchTerm, setSearchTerm,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
    filterType, setFilterType,
    filterTuning, setFilterTuning,
    filteredSongs
  } = useSongsFilter(songs);

  const [currentPage, setCurrentPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setFadeIn(true), 50);
    } else {
      setFadeIn(false);
    }
  }, [loading]);

  // Pagination
  const totalPages = Math.ceil(filteredSongs.length / SONGS_PER_PAGE);
  const startIndex = (currentPage - 1) * SONGS_PER_PAGE;
  const currentSongs = filteredSongs.slice(startIndex, startIndex + SONGS_PER_PAGE);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    if (value.trim().toLowerCase() === SECRET_PHRASE) {
      setShowAdminModal(true);
      setAdminError("");
    }
  };

  const handleAdminLogin = async (password) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://immerrock-customsongs-backend.onrender.com";
      const response = await fetch(`${API_URL}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!response.ok) throw new Error("Invalid password");
      const data = await response.json();
      if (data.token) {
        setAdminToken(data.token);
        setShowAdminModal(false);
        navigate("/admin");
      }
    } catch (err) {
      setAdminError("Invalid password");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("song-list-anchor")?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="song-list-container">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="song-list-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <h3>Loading Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`song-list-container ${fadeIn ? "fade-in" : ""}`}>
      <AdminPasswordModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSubmit={handleAdminLogin}
        error={adminError}
      />
      
      <AddSongForm
        externalIsOpen={showAddForm}
        onToggle={() => setShowAddForm(!showAddForm)}
      />

      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        totalCount={filteredSongs.length}
        onToggleAddForm={() => setShowAddForm(!showAddForm)}
        isAddFormOpen={showAddForm}
      />

      <div className="unified-controls-section">
        <FiltersRow 
          filterType={filterType}
          onFilterTypeChange={(val) => { setFilterType(val); setCurrentPage(1); }}
          filterTuning={filterTuning}
          onFilterTuningChange={(val) => { setFilterTuning(val); setCurrentPage(1); }}
          tunings={[...new Set(songs.map(s => s.tuning))].sort()}
        />

        <div className="guitar-strings">
          {[...Array(6)].map((_, i) => <div key={i} className="guitar-string"></div>)}
        </div>

        <SortHeader 
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(col, ord) => { setSortBy(col); setSortOrder(ord); setCurrentPage(1); }}
        />
      </div>

      {currentSongs.length > 0 ? (
        <>
          <div className="song-table">
            {currentSongs.map((song) => <SongCard key={song._id} song={song} />)}
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default SongList;
