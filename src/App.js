import React,{useState,useEffect} from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCWt3ezJmHl3WVyASNkrfAjWQVp-hX9Bz0",
  authDomain: "auth-ade57.firebaseapp.com",
  projectId: "auth-ade57",
  storageBucket: "auth-ade57.appspot.com",
  messagingSenderId: "165338113708",
  appId: "1:165338113708:web:827ff3764a06bed1c16109"
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const App = () => {
  const [user, setUser] = useState(null);
  const [userName,setUsername]=useState(null)
  useEffect(() => {
    console.log("came in.. use effect.")
    auth.onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
    });
  }, [])
  const submitHandler=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log("came in...")
      GoogleAuthProvider.credentialFromResult(result);
      setUsername(result.user.displayName)
    }).catch((error) => {
     console.log(error.message)
    });

  }
  return (
    <div>
      <center>
        {user?
        <div>
          <h2>welcome {userName}</h2>
          <button onClick={()=>signOut(auth)}>sigh out</button>
        </div>:
        <button onClick={submitHandler}>sign in with google</button>
        }
        
           
      </center>
    </div>
  )
}

export default App
