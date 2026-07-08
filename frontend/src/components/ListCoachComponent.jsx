import {useEffect,useState, useContext} from 'react'
import { listCoaches,deleteCoach } from '../services/CoachService';
import {useNavigate}from 'react-router-dom';
import { AuthContext } from "./AuthContextProvider";

const ListCoachComponent = () => {
    const navigator = useNavigate();
    const { role } = useContext(AuthContext);

    const [coaches, setCoaches] = useState([])
    const canEdit = role === "ADMIN" || role === "COACH";

    useEffect(()=>{
        getAllCoaches();
    }, []);

    function getAllCoaches(){
        listCoaches().then((response)=>{
            setCoaches(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }
    function addNewCoach(){
        navigator('/add-coach');
    }

    function updateCoach(id){
        navigator(`/update-coach/${id}`);
    }

    function removeCoach(id){
        console.log(id);
        deleteCoach(id).then(()=>{
            getAllCoaches();
        }).catch(error=>{
            console.log(error);
        });  
    }
return (
    <div className="container">
      {canEdit && (
        <button className="btn btn-primary mb-2" onClick={addNewCoach}>
          Add Coach
        </button>
      )}
      <h2 className="text-center">List of Coaches</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Coach Id</th>
            <th>Coach First Name</th>
            <th>Coach Last Name</th>
            <th>Coach Email</th>
            <th>Specialization</th>
            {canEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach) => (
            <tr key={coach.id}>

              <td>{coach.id}</td>
              <td>{coach.firstName}</td>
              <td>{coach.lastName}</td>
              <td>{coach.email}</td>
              <td>{coach.specialization}</td>
              {canEdit && (
                <td>
                  <button className="btn btn-info" onClick={() => updateCoach(coach.id)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => removeCoach(coach.id)}
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

export default ListCoachComponent
