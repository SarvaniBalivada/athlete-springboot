import {useState,useEffect} from 'react'
import { createCompetition } from '../services/CompetitionService';
import {useNavigate, useParams}from 'react-router-dom';
import { getCompetition } from '../services/CompetitionService';
import { updateCompetition } from '../services/CompetitionService';

const CompetitionComponent = () => {
    const navigator = useNavigate();

    const[competitionName, setCompetitionName] = useState('')
    const[location, setLocation] = useState('')
    const[competitionDate, setCompetitionDate] = useState('')
    const {id} = useParams();

    const[errors,setErrors]= useState({
        competitionName: '',
        location: '',
        competitionDate: ''
    });

    useEffect(()=>{
        if(id){
            getCompetition(id).then((response)=>{
                setCompetitionName(response.data.competitionName);
                setLocation(response.data.location);
                setCompetitionDate(response.data.competitionDate);
            }).catch(error=>{
                console.log(error);
            });
        }
    },[id])

    function saveOrUpdateCompetition(e){   
        e.preventDefault();

        if(validateForm()){
            const competition = { competitionName, location, competitionDate };
            console.log(competition);
            if(id){
                updateCompetition(id, competition).then((response)=>{
                    console.log(response.data);
                    navigator('/competitions');
                }).catch(error=>{
                    console.log(error);
                });
            }
            else{
                createCompetition(competition).then((response)=>{
                    console.log(response.data);
                    navigator('/competitions');
                }).catch(error=>{
                    console.log(error);
                })
            }
        }
    }


    function validateForm(){
        let valid = true;
        const errorsCopy={...errors};
        if(!competitionName.trim()){
            errorsCopy.competitionName = 'Name is required';
            valid = false;
        } else {
            errorsCopy.competitionName = '';
        }
        if(!location.trim()){
            errorsCopy.location = 'Location is required';
            valid = false;
        } else {
            errorsCopy.location = '';
        }      
        if(!competitionDate.trim()){
            errorsCopy.competitionDate = 'Date is required';
            valid = false;
        }  else {
            errorsCopy.competitionDate = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Competition</h2>
        }
        else{
            return <h2 className="text-center">Add Competition</h2>
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
                            <label className="form-label">Name</label>
                            <input type="text" placeholder="Enter Competition Name" className={`form-control ${errors.competitionName ? 'is-invalid' : ''}`} value={competitionName} onChange={(e) => setCompetitionName(e.target.value)} />
                            {errors.competitionName && <div className="invalid-feedback">{errors.competitionName}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <input type="text" placeholder="Enter Competition Location" className={`form-control ${errors.location ? 'is-invalid' : ''}`} value={location} onChange={(e) => setLocation(e.target.value)} />
                            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Date</label>
                            <input type="date" placeholder="Enter Competition Date" className={`form-control ${errors.competitionDate ? 'is-invalid' : ''}`} value={competitionDate} onChange={(e) => setCompetitionDate(e.target.value)} />
                            {errors.competitionDate && <div className="invalid-feedback">{errors.competitionDate}</div>}
                        </div>

                        <button className="btn btn-success mt-2" onClick={saveOrUpdateCompetition}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompetitionComponent