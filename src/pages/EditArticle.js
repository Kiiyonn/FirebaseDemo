import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
// styles
import './create.css';

export default function EditArticle() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      const ref = doc(db, 'articles', id);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setAuthor(data.author);
        setDescription(data.description);
      } else {
        console.log('No such document!');
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'articles', id);
    await updateDoc(ref, {
      title,
      author,
      description,
    });
    navigate('/');
  };

  return (
    <div className="create">
      <h2 className="page-title">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        
        <label>
          <span>Author:</span>
          <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">Update</button>
      </form>
    </div>
  );
}
