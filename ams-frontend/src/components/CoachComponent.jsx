import {useState,useEffect} from 'react'
import { createCoach } from '../services/CoachService';
import {useNavigate, useParams}from 'react-router-dom';
import { getCoach } from '../services/CoachService';
import { updateCoach } from '../services/CoachService';

const CoachComponent = () => {
    const navigator = useNavigate();

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')
    const[specialization, setSpecialization] = useState('')
    const {id} = useParams();

    
    const[errors,setErrors]= useState({
        firstName: '',
        lastName: '',
        email: '',
        specialization: ''
    });

    useEffect(()=>{
        if(id){
            getCoach(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setSpecialization(response.data.specialization);
            }).catch(error=>{
                console.log(error);
            });
        }
    },[id])

    function saveOrUpdateCoach(e){   
        e.preventDefault();

        if(validateForm()){
            const coach = {firstName, lastName, email, specialization};
            console.log(coach);
            if(id){
                updateCoach(id, coach).then((response)=>{
                    console.log(response.data);
                    navigator('/coaches');
                }).catch(error=>{
                    console.log(error);
                });
            }
            else{
                
                createCoach(coach).then((response)=>{
                    console.log(response.data);
                    navigator('/coaches');
            
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
        if(!specialization.trim()){
            errorsCopy.specialization = 'Specialization is required';
            valid = false;
        } else {
            errorsCopy.specialization = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Coach</h2>
        }
        else{
            return <h2 className="text-center">Add Coach</h2>
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
                            <input type="text" placeholder="Enter Coach First Name" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input type="text" placeholder="Enter Coach Last Name" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" placeholder="Enter Coach Email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Specialization</label>
                            <input type="text" placeholder="Enter Coach Specialization" className={`form-control ${errors.specialization ? 'is-invalid' : ''}`} value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                            {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                        </div>

                        <button className="btn btn-success mt-2" onClick={saveOrUpdateCoach}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CoachComponent