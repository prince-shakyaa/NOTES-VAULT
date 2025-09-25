import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../../components/Cards/NoteCard';
import moment from 'moment';
import { MdAdd } from 'react-icons/md';
import AddEditNoes from './AddEditNoes';
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNoteImg from '../../assets/images/add-note.svg';
import NoDataImg from '../../assets/images/no-data.svg';

Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add',
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (notesDetails) => {
    setOpenAddEditModal({ isShown: true, data: notesDetails, type: 'edit' });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: '',
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('get-all-notes');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log('An unexpected error occurred. Please try again');
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        showToastMessage('Note Deleted Successfully', 'delete');
        getAllNotes();
      }
    } catch (error) {
      console.log('An unexpected error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
  localStorage.clear();
  navigate('/login');
};

const onSearchNote = async (query) => {
  try {
    const response = await axiosInstance.get(`/search-notes?query=${query}`);
    setIsSearch(true); // ✅ Always set
    setAllNotes(response.data.notes || []);
  } catch (error) {
    console.error("Search error:", error);
  }
};


  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    const newPinnedStatus = !noteData.isPinned;

    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        isPinned: newPinnedStatus,
      });

      if (response.data && response.data.note) {
        const message = newPinnedStatus
          ? 'Note pinned successfully!'
          : 'Note unpinned successfully!';
        showToastMessage(message, 'pin');
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        onLogout={handleLogout}
      />

  

<div className="max-w-7xl mx-auto px-4 py-6">
  {allNotes.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {allNotes.map((item) => (
        <NoteCard
          key={item._id}
          title={item.title}
          date={item.createdOn}
          content={item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onEdit={() => handleEdit(item)}
          onDelete={() => deleteNote(item)}
          onPinNote={() => updateIsPinned(item)}
        />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col text-center">
      <EmptyCard
        imgSrc={isSearch ? NoDataImg : AddNoteImg}
        message={
          isSearch
            ? `Oops! No notes found matching your search.`
            : `Start creating your first note. Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
        }
      />
    </div>
  )}
</div>

<button
  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-950 fixed right-4 bottom-4 sm:right-8 sm:bottom-8 z-50 shadow-lg"
  onClick={() => {
    setOpenAddEditModal({ isShown: true, type: 'add', data: null });
  }}
>
  <MdAdd className="text-xl sm:text-2xl text-white" />
</button>

<Modal
  isOpen={openAddEditModal.isShown}
  onRequestClose={() => {}}
  style={{
    overlay: { backgroundColor: 'rgba(0,0,0,0.2)' },
  }}
  className="w-[90%] max-w-xl bg-white rounded-md mx-auto mt-14 p-4 sm:p-6 overflow-visible"
>
  <AddEditNoes
    type={openAddEditModal.type}
    noteData={openAddEditModal.data}
    onClose={() => {
      setOpenAddEditModal({ isShown: false, type: 'add', data: null });
    }}
    getAllNotes={getAllNotes}
    showToastMessage={showToastMessage}
  />
</Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;


