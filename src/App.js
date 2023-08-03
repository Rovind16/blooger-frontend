import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Navbar from './navbar/navbar';
import SignIn from './signin/signin';
import SignUp from './signup/signup';
import ContactPage from './contactus/contactus';
import About from './about/about';
import Home from './home/home';
import FirstPage from './firstpage/firstpage';
import BlogUpload from './createblog/createblog';
import ProfilePage from './profiledata/profiledata';
import SeperateBlog from './seperateblog/SeperateBlog';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      
      <Route path='/' element={<FirstPage/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/createblog' element={<BlogUpload/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/seperateBlog/:id' element={<SeperateBlog/>}/>
      
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
