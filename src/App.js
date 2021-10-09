import { useState } from 'react';
import './App.css';
import Login from './container/Login/Login';
import Register from './container/Register/Register';
import Reset from './container/Reset/Reset';

function App() {
  const [toggle, setToggle] = useState(false);
  const handleChecked = type => {
    type ? setToggle(true) : setToggle(false);
  }
  const [reset, setReset] = useState(false);

  return (
    <>
      <div className="container">
        <div className="row bg-info">
          <div className="col-8">
            <div className="col-10 p-5 mx-auto">
              {
                reset ? <Reset></Reset> :
                  toggle ?
                    <Login></Login>
                    :
                    <Register></Register>
              }
            </div>
            <div className="col-10 mb-3 px-3 mx-auto">
              {
                reset ? '' :
                  toggle ?
                    <>
                      <div class="form-check">
                        <input key={Math.random()} onChange={() => setToggle(!toggle)} class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          Want To Create New Account?
                        </label>
                      </div>
                    </>
                    :
                    <>
                      <div class="form-check">
                        <input key={Math.random()} onChange={() => setToggle(!toggle)} class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label class="form-check-label" for="flexCheckChecked">
                          Have Account Already?
                        </label>
                      </div>
                    </>
              }
              <div class="form-check">
                <input onChange={() => setReset(!reset)} class="form-check-input" type="checkbox" value="" id="flexCheckReset" />
                <label class="form-check-label" for="flexCheckReset">
                  Reset?
                </label>
              </div>
            </div>
          </div>
          <div className="col-4">
            <img className="img-fluid  pt-5" src="https://i.ibb.co/wB5md78/undraw-Mobile-login-re-9ntv.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
