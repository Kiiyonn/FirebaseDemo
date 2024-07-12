import { Link, useNavigate} from 'react-router-dom'
import {getDocs, collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase/config'
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg'

// styles
import './Home.css'

export default function Home() {

  const [articles, setArticles] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const ref = collection(db, 'articles');

    onSnapshot(ref, (snapshot)=>{
        console.log(snapshot);
        let results = []
         snapshot.docs.forEach(doc => {
           results.push({id: doc.id, ...doc.data()});
         });
        setArticles(results);
      })

    getDocs(ref)
      .then((snapshot)=>{
        let results = []
        console.log(snapshot)
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()});
        });
        setArticles(results);
      })    
  },[])

  
  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id)
      //loading = true
    deleteDoc(ref).then(
        //loading false;
    );
  }

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div className="home">
      <h2>Articles</h2>      
      <button onClick={handleSignOut}>Sign Out</button> 
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          <div className="editbtn">
          <Link to={`/edit-article/${article.id}`}>
            <button>Edit Article</button>
          </Link>        
          </div>
            <img 
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon} alt="delete icon" 
          />
        </div>
      ))}
    </div>
  )
}
