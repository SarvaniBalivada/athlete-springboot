import {useEffect,useState, useContext} from 'react'
import { listCompetitions,deleteCompetition } from '../services/CompetitionService';
import {useNavigate}from 'react-router-dom';
import { AuthContext } from "./AuthContextProvider";

const ListCompetitionComponent = () => {
    const navigator = useNavigate();
    const { role } = useContext(AuthContext);

    const [competitions, setCompetitions] = useState([])
    const canEdit = role === "ADMIN" || role === "COACH";

    useEffect(()=>{
        getAllCompetitions();
    }, []);

    function getAllCompetitions(){
        listCompetitions().then((response)=>{
            setCompetitions(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }
    function addNewCompetition(){
        navigator('/add-competition');
    }

    function updateCompetition(id){
        navigator(`/update-competition/${id}`);
    }

    function removeCompetition(id){
        console.log(id);
        deleteCompetition(id).then(()=>{
            getAllCompetitions();
        }).catch(error=>{
            console.log(error);
        });  
    }
return (
    <div className="container">
      {canEdit && (
        <button className="btn btn-primary mb-2" onClick={addNewCompetition}>
          Add Competition
        </button>
      )}
      <h2 className="text-center">List of Competitions</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Competition Id</th>
            <th>Competition Name</th>
            <th>Location</th>
            <th>Date</th>
            {canEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => (
            <tr key={competition.id}>

              <td>{competition.id}</td>
              <td>{competition.competitionName}</td>
              <td>{competition.location}</td>
              <td>{competition.competitionDate}</td>
              {canEdit && (
                <td>
                  <button className="btn btn-info" onClick={() => updateCompetition(competition.id)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => removeCompetition(competition.id)}
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

export default ListCompetitionComponent
