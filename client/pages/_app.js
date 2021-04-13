import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import UsersApi from "../services/UsersApi";

const App = ({ Component, pageProps, currentUser }) => {
  return <Component currentUser={currentUser} {...pageProps} />
}

App.getInitialProps = async (context) => {
  const response = await UsersApi.currentuser();
  
  if (!response) {
    return {};
  }
  
  return {...response.data};
}

export default App
