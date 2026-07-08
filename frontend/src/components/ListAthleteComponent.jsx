import {useEffect,useState, useContext} from 'react'
import { listAthletes,deleteAthlete } from '../services/AthleteService';
import {useNavigate}from 'react-router-dom';
import { AuthContext } from "./AuthContextProvider";

const ListAthleteComponent = () => {
    const navigator = useNavigate();
    const { role } = useContext(AuthContext);

    const [athletes, setAthletes] = useState([])
    const canEdit = role === "ADMIN" || role === "COACH";

    useEffect(()=>{
        getAllAthletes();
    }, []);

    function getAllAthletes(){
        listAthletes().then((response)=>{
            setAthletes(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }
    function addNewAthlete(){
        navigator('/add-athlete');
    }

    function updateAthlete(id){
        navigator(`/update-athlete/${id}`);
    }

    function removeAthlete(id){
        console.log(id);
        deleteAthlete(id).then(()=>{
            getAllAthletes();
        }).catch(error=>{
            console.log(error);
        });  
    }
  return (
    <div className="container">
      {canEdit && (
        <button className="btn btn-primary mb-2" onClick={addNewAthlete}>
          Add Athlete
        </button>
      )}
      <h2 className="text-center">List of Athletes</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Athelete Id</th>
            <th>Athlete First Name</th>
            <th>Athlete Last Name</th>
            <th>Athlete Email</th>
            {canEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>

              <td>{athlete.id}</td>
              <td>{athlete.firstName}</td>
              <td>{athlete.lastName}</td>
              <td>{athlete.email}</td>
              {canEdit && (
                <td>
                  <button className="btn btn-info" onClick={() => updateAthlete(athlete.id)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => removeAthlete(athlete.id)}
                      style={{ marginLeft: "10px" }}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListAthleteComponent
