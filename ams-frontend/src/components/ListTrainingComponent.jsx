import {useEffect,useState, useContext} from 'react'
import { listTrainings,deleteTraining } from '../services/TrainingService';
import {useNavigate}from 'react-router-dom';
import { AuthContext } from "./AuthContextProvider";

const ListTrainingComponent = () => {
    const navigator = useNavigate();
    const { role } = useContext(AuthContext);

    const [trainings, setTrainings] = useState([])
    const canEdit = role === "ADMIN" || role === "COACH";

    useEffect(()=>{
        getAllTrainings();
    }, []);

    function getAllTrainings(){
        listTrainings().then((response)=>{
            setTrainings(response.data);
        }).catch(error=>{
            console.log(error);
        });
    }
    function addNewTraining(){
        navigator('/add-training');
    }

    function updateTraining(id){
        navigator(`/update-training/${id}`);
    }

    function removeTraining(id){
        console.log(id);
        deleteTraining(id).then(()=>{
            getAllTrainings();
        }).catch(error=>{
            console.log(error);
        });  
    }
return (
    <div className="container">
      {canEdit && (
        <button className="btn btn-primary mb-2" onClick={addNewTraining}>
          Add Training
        </button>
      )}
      <h2 className="text-center">List of Trainings</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Training Id</th>
            <th>Type</th>
            <th>Coach</th>
            <th>Duration</th>
            <th>Date</th>
            {canEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>

          {trainings.map((training) => (

            <tr key={training.id}>

              <td>{training.id}</td>

              <td>{training.trainingType}</td>

              <td>{training.coachName}</td>

              <td>{training.duration}</td>

              <td>{training.trainingDate}</td>

              {canEdit && (
                <td>

                  <button
                    className="btn btn-info"
                    onClick={() => updateTraining(training.id)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => removeTraining(training.id)}
                    style={{ marginLeft: "10px" }}
                  >
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

export default ListTrainingComponent
