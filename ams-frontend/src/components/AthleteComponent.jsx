import {useState,useEffect} from 'react'
import { createAthlete ,getAthlete,updateAthlete} from '../services/AthleteService';
import {useNavigate, useParams}from 'react-router-dom';


const AthleteComponent = () => {
    const navigator = useNavigate();

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')
    const {id} = useParams();

    
    const[errors,setErrors]= useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(()=>{
        if(id){
            getAthlete(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error=>{
                console.log(error);
            });
        }
    },[id])

    function saveOrUpdateAthlete(e){   
        e.preventDefault();

        if(validateForm()){
            const athlete = {firstName, lastName, email};
            console.log(athlete);
            if(id){
                updateAthlete(id, athlete).then((response)=>{
                    console.log(response.data);
                    navigator('/athletes');
                }).catch(error=>{
                    console.log(error);
                });
            }
            else{
                
                createAthlete(athlete).then((response)=>{
                    console.log(response.data);
                    navigator('/athletes');
            
                }).catch(error=>{
                    console.log(error);
                })
            }
        }
    }


    function validateForm(){
        let valid = true;
        const errorsCopy={...errors};
        if(!firstName.trim()){
            errorsCopy.firstName = 'First name is required';
            valid = false;
        } else {
            errorsCopy.firstName = '';
        }
        if(!lastName.trim()){
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        } else {
            errorsCopy.lastName = '';
        }     
        if(!email.trim()){
            errorsCopy.email = 'Email is required';
            valid = false;
        }  else {
            errorsCopy.email = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Athlete</h2>
        }
        else{
            return <h2 className="text-center">Add Athlete</h2>
        }
    }

  return (
    <div className="container">
        <br></br>
        <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input type="text" placeholder="Enter Athlete First Name" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input type="text" placeholder="Enter Athlete Last Name" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" placeholder="Enter Athlete Email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <button className="btn btn-success mt-2" onClick={saveOrUpdateAthlete}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AthleteComponent
